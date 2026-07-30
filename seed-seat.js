// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({ path: ".env.local" });

const CINEBOOK_BASE = "http://localhost:8080/api";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DEVICE_ID = "seed-script";

async function loginAsAdmin() {
  const payload = {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    deviceId: DEVICE_ID,
  };
  const res = await fetch(`${CINEBOOK_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Device-ID": DEVICE_ID },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Login failed: ${res.status} - Backend: ${errorText}`);
  }
  const body = await res.json();
  return body.data?.accessToken || body.accessToken;
}

async function fetchCinemas(accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cinemas`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Error getting list Cinema: ${res.status}`);
  const body = await res.json();
  return body.data?.content || body.data || body;
}

async function fetchRoomsByCinema(cinemaId, accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cinemas/${cinemaId}/rooms`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Error getting list Room: ${res.status}`);
  const body = await res.json();
  return body.data?.content || body.data || body;
}

async function generateSeats(roomId, payload, accessToken) {
  const endpoint = `${CINEBOOK_BASE}/rooms/${roomId}/seats/generate-seats`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    if (errorText.includes("SEATS_ALREADY_GENERATED")) {
      return { skipped: true };
    }
    console.error(`❌ Tạo ghế thất bại cho room ${roomId}: ${errorText}`);
    return null;
  }
  return await res.json();
}

async function main() {
  console.log("🚀 Logging in as admin...");
  const accessToken = await loginAsAdmin();

  console.log("⏳ Getting list Cinemas...");
  const cinemas = await fetchCinemas(accessToken);
  console.log(`📍 Found ${cinemas.length} cinemas.`);

  for (const cinema of cinemas) {
    console.log(`🎬 Handling cinema: ${cinema.name}`);

    const rooms = await fetchRoomsByCinema(cinema.id, accessToken);
    if (!rooms || rooms.length === 0) {
      console.log(`  -> This cinema does not have any rooms. Skipped.\n`);
      continue;
    }
    for (const room of rooms) {
      const capacity = room.capacity || 100;

      let columns = 10;
      if (capacity >= 200)
        columns = 20; // Room IMAX
      else if (capacity >= 120)
        columns = 15; // Room Standard large
      else if (capacity > 100) columns = 12; // Room 4DX small

      const rows = Math.ceil(capacity / columns);

      const payload = {
        rows: rows,
        columns: columns,
      };

      console.log(
        `\n💺 Generating ${rows * columns} chairs (${rows} rows x ${columns} cols) for room: ${room.name} (ID: ${room.id})`,
      );

      const created = await generateSeats(room.id, payload, accessToken);

      if (created?.skipped) {
        console.log(`  ⏩ Pass -> Chairs have already generated.`);
      } else if (created) {
        const seatsCount = created.data?.length || "?";
        console.log(`  ✅ OK -> Creating success ${seatsCount} chair.`);
      }

      await new Promise((r) => setTimeout(r, 200));
    }
    console.log("");
  }

  console.log("\n🎉 Finish seeding seats for system!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
