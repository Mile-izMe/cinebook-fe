// eslint-disable-next-line @typescript-eslint/no-require-imports
const { config: seed, list: seedList } = require("./seed-config.cjs");

const CINEBOOK_BASE = seed.apiUrl;
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
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

async function main() {
  console.log("🚀 Logging in as admin...");
  const accessToken = await loginAsAdmin();

  console.log("⏳ Loading data for Film và Cinema...");
  const movies = (await fetchMovies(accessToken)).slice(0, seed.movieCount);
  const cinemas = (await fetchCinemas(accessToken)).slice(0, seed.cinemaCount);

  if (!movies || movies.length === 0) {
    console.error("❌ No movie found in DB! Please seed Movie first.");
    process.exit(1);
  }

  const showTimesConfig = seed.full ? [
    { hour: 9, minute: 0 }, // Suất sáng: 09:00
    { hour: 11, minute: 30 }, // Suất trưa: 11:30
    { hour: 14, minute: 0 }, // Suất đầu chiều: 14:00
    { hour: 16, minute: 30 }, // Suất cuối chiều: 16:30
    { hour: 19, minute: 0 }, // Suất tối: 19:00
    { hour: 21, minute: 30 }, // Suất đêm: 21:30
  ] : [{ hour: 14, minute: 0 }, { hour: 20, minute: 0 }];

  const DAYS_TO_SEED = seed.days;
  const existing = new Set();
  for (const movie of movies) {
    for (const showtime of await seedList(`/movies/${movie.id}/showtimes`, accessToken)) {
      existing.add(`${showtime.roomId}:${showtime.startTime.substring(0, 16)}`);
    }
  }
  let movieIndex = 0;
  let skippedCount = 0;
  let successCount = 0;
  let failedCount = 0;

  for (const cinema of cinemas) {
    console.log(`\n🎬 Cinema: ${cinema.name}`);
    const rooms = await fetchRoomsByCinema(cinema.id, accessToken);

    if (!rooms || rooms.length === 0) continue;

    for (const room of rooms.slice(0, seed.roomsPerCinema)) {
      let format = "2D";
      let basePrice = 80000;

      if (room.roomType === "IMAX") {
        format = "IMAX";
        basePrice = 150000;
      } else if (room.roomType === "FOUR_DX") {
        format = "3D";
        basePrice = 120000;
      }

      for (let dayOffset = 0; dayOffset < DAYS_TO_SEED; dayOffset++) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + dayOffset);

        for (const timeConfig of showTimesConfig) {
          const randomMovie = movies[movieIndex++ % movies.length];

          const startTime = new Date(targetDate);
          startTime.setHours(timeConfig.hour, timeConfig.minute, 0, 0);

          if (startTime <= new Date()) continue;

          const slotKey = `${room.id}:${formatLocalDateTime(startTime).substring(0, 16)}`;
          if (existing.has(slotKey)) { skippedCount++; continue; }

          const payload = {
            movieId: randomMovie.id,
            roomId: room.id,
            startTime: formatLocalDateTime(startTime),
            format: format,
            basePrice: basePrice,
          };

          const created = await createShowtime(payload, accessToken);
          if (created) {
            successCount++;
            existing.add(slotKey);
            console.log(
              `  ✅ OK -> Room ${room.name} | ${formatLocalDateTime(startTime)} | Phim: ${randomMovie.title.substring(0, 15)}... | Giá: ${basePrice}`,
            );
          }

          if (!created) failedCount++;
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }
  }

  console.log(`\nShowtime seed finished: created=${successCount}, skipped=${skippedCount}, failed=${failedCount}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
