// eslint-disable-next-line @typescript-eslint/no-require-imports
const { config: seed, list: seedList } = require("./seed-config.cjs");

const CINEBOOK_BASE = seed.apiUrl;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DEVICE_ID = "seed-script";

const MOCK_ROOMS = seed.full ? [
  { name: "Cinema 01", capacity: 120, roomType: "STANDARD" },
  { name: "Cinema 02", capacity: 100, roomType: "STANDARD" },
  { name: "Cinema 03 - IMAX", capacity: 200, roomType: "IMAX" },
  { name: "Cinema 04 - 4DX", capacity: 80, roomType: "FOUR_DX" },
] : [
  { name: "Cinema 01", capacity: 60, roomType: "STANDARD" },
  { name: "Cinema 02 - IMAX", capacity: 60, roomType: "IMAX" },
];

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

async function fetchCinemas(accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cinemas`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Error getting list Cinema: ${res.status}`);
  const body = await res.json();
  return body.data?.content || body.data || body;
}

async function createRoom(cinemaId, payload, accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cinemas/${cinemaId}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(`❌ Create fail ${payload.name}: ${await res.text()}`);
    return null;
  }
  return await res.json();
}

async function main() {
  console.log("🚀 Logging in as admin...");
  const accessToken = await loginAsAdmin();

  console.log("⏳ Getting list Cinemas...");
  const cinemas = (await fetchCinemas(accessToken)).slice(0, seed.cinemaCount);
  console.log(`📍 Found ${cinemas.length} cinemas.`);

  for (const cinema of cinemas) {
    console.log(`\n🎬 Creating rooms for Cinema: ${cinema.name}`);

    const existing = await seedList(`/cinemas/${cinema.id}/rooms`, accessToken);
    const names = new Set(existing.map(room => room.name));
    let count = existing.length;
    for (const roomData of MOCK_ROOMS.slice(0, seed.roomsPerCinema)) {
      if (count >= seed.roomsPerCinema) break;
      if (names.has(roomData.name)) continue;
      const payload = {
        name: roomData.name,
        capacity: roomData.capacity,
        roomType: roomData.roomType,
      };

      console.log(`  -> Creating "${payload.name}" (${payload.roomType})...`);
      const created = await createRoom(cinema.id, payload, accessToken);

      if (created) {
        count++;
        names.add(roomData.name);
        const newId = created.data?.id || "?";
        console.log(`     ✅ OK -> roomId = ${newId}`);
      }

      await new Promise((r) => setTimeout(r, 100));
    }
  }

  console.log("\n🎉 Finish seeding Rooms!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
