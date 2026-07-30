// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({ path: ".env.local" });

const CINEBOOK_BASE = "http://localhost:8080/api";
const DEVICE_ID = "seed-script";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("❌ ERROR: Not found credentials!");
  process.exit(1);
}

async function loginAsAdmin() {
  const res = await fetch(`${CINEBOOK_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Device-ID": DEVICE_ID },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      deviceId: DEVICE_ID,
    }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const body = await res.json();
  return body.data?.accessToken || body.accessToken;
}

async function fetchMovies(accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/movies?limit=50`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Lỗi lấy danh sách Phim: ${res.status}`);
  const body = await res.json();
  return body.data?.content || body.data || body;
}

async function fetchCinemas(accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cinemas`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await res.json();
  return body.data?.content || body.data || body;
}

async function fetchRoomsByCinema(cinemaId, accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cinemas/${cinemaId}/rooms`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await res.json();
  return body.data?.content || body.data || body;
}

async function createShowtime(payload, accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/showtimes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(`❌ Tạo suất chiếu thất bại: ${await res.text()}`);
    return null;
  }
  return await res.json();
}

function formatLocalDateTime(date) {
  return date.toISOString().split(".")[0];
}

async function main() {
  console.log("🚀 Logging in as admin...");
  const accessToken = await loginAsAdmin();

  console.log("⏳ Loading data for Film và Cinema...");
  const movies = await fetchMovies(accessToken);
  const cinemas = await fetchCinemas(accessToken);

  if (!movies || movies.length === 0) {
    console.error("❌ No movie found in DB! Please seed Movie first.");
    process.exit(1);
  }

  const activeMovies = movies.slice(0, 3);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const showTimesConfig = [
    { hour: 18, minute: 0 },
    { hour: 21, minute: 0 },
  ];

  for (const cinema of cinemas) {
    console.log(`\n🎬 Cinema: ${cinema.name}`);
    const rooms = await fetchRoomsByCinema(cinema.id, accessToken);

    if (!rooms || rooms.length === 0) continue;

    for (const room of rooms) {
      let format = "2D";
      let basePrice = 80000;

      if (room.roomType === "IMAX") {
        format = "IMAX";
        basePrice = 150000;
      } else if (room.roomType === "FOUR_DX") {
        format = "3D";
        basePrice = 120000;
      }

      // Each room show 2 times 1 day
      for (const timeConfig of showTimesConfig) {
        // Random 1 in 3 film
        const randomMovie =
          activeMovies[Math.floor(Math.random() * activeMovies.length)];

        const startTime = new Date(tomorrow);
        startTime.setHours(timeConfig.hour, timeConfig.minute, 0, 0);

        const payload = {
          movieId: randomMovie.id,
          roomId: room.id,
          startTime: formatLocalDateTime(startTime),
          format: format,
          basePrice: basePrice,
        };

        const created = await createShowtime(payload, accessToken);
        if (created) {
          console.log(
            `  ✅ OK -> Room ${room.name} | ${formatLocalDateTime(startTime)} | Phim: ${randomMovie.title.substring(0, 15)}... | Giá: ${basePrice}`,
          );
        }

        await new Promise((r) => setTimeout(r, 100));
      }
    }
  }

  console.log("\n🎉 Finish seeding Showtimes! Booking available!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
