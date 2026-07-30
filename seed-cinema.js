// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({ path: ".env.local" });

const CINEBOOK_BASE = "http://localhost:8080/api";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DEVICE_ID = "seed-script";

const MOCK_CINEMAS = {
  hcm: [
    {
      name: "Cinebook Landmark 81",
      address: "720A Điện Biên Phủ, P. 22, Q. Bình Thạnh",
      latitude: 10.7956,
      longitude: 106.721,
    },
    {
      name: "Cinebook Vivo City",
      address: "1058 Nguyễn Văn Linh, P. Tân Phong, Quận 7",
      latitude: 10.73,
      longitude: 106.702,
    },
    {
      name: "Cinebook Aeon Tân Phú",
      address: "30 Bờ Bao Tân Thắng, P. Sơn Kỳ, Q. Tân Phú",
      latitude: 10.802,
      longitude: 106.617,
    },
    {
      name: "Cinebook Vạn Hạnh Mall",
      address: "11 Sư Vạn Hạnh, P. 12, Quận 10",
      latitude: 10.775,
      longitude: 106.668,
    },
    {
      name: "Cinebook Giga Mall",
      address: "240 Phạm Văn Đồng, P. Hiệp Bình Chánh, Thủ Đức",
      latitude: 10.828,
      longitude: 106.722,
    },
  ],
  hn: [
    {
      name: "Cinebook Royal City",
      address: "72A Nguyễn Trãi, P. Thượng Đình, Q. Thanh Xuân",
      latitude: 21.002,
      longitude: 105.815,
    },
    {
      name: "Cinebook Times City",
      address: "458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng",
      latitude: 20.995,
      longitude: 105.867,
    },
    {
      name: "Cinebook Lotte Center",
      address: "54 Liễu Giai, P. Cống Vị, Q. Ba Đình",
      latitude: 21.031,
      longitude: 105.812,
    },
    {
      name: "Cinebook Aeon Long Biên",
      address: "27 Cổ Linh, P. Long Biên, Q. Long Biên",
      latitude: 21.027,
      longitude: 105.9,
    },
    {
      name: "Cinebook Vincom Bà Triệu",
      address: "191 Bà Triệu, P. Lê Đại Hành, Q. Hai Bà Trưng",
      latitude: 21.011,
      longitude: 105.849,
    },
  ],
  dn: [
    {
      name: "Cinebook Vincom Đà Nẵng",
      address: "910A Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà",
      latitude: 16.071,
      longitude: 108.232,
    },
    {
      name: "Cinebook Lotte Mart Đà Nẵng",
      address: "6 Nại Nam, P. Hòa Cường Bắc, Q. Hải Châu",
      latitude: 16.035,
      longitude: 108.225,
    },
    {
      name: "Cinebook Indochina Riverside",
      address: "74 Bạch Đằng, P. Hải Châu 1, Q. Hải Châu",
      latitude: 16.068,
      longitude: 108.223,
    },
    {
      name: "Cinebook GO! Đà Nẵng",
      address: "255 Hùng Vương, P. Vĩnh Trung, Q. Thanh Khê",
      latitude: 16.069,
      longitude: 108.214,
    },
    {
      name: "Cinebook Hòa Khánh",
      address: "342 Âu Cơ, P. Hòa Khánh Bắc, Q. Liên Chiểu",
      latitude: 16.078,
      longitude: 108.156,
    },
  ],
};

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
  if (!res.ok)
    throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const body = await res.json();
  return body.data.accessToken;
}

async function fetchCities(accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cities`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Error when get list City: ${res.status}`);
  const body = await res.json();
  return body.data?.content || body.data || body;
}

async function createCinema(payload, accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/cinemas`, {
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

function getCityKey(cityName) {
  const lowerName = cityName.toLowerCase();
  if (
    lowerName.includes("hcm") ||
    lowerName.includes("hồ chí minh") ||
    lowerName.includes("ho chi minh")
  )
    return "hcm";
  if (
    lowerName.includes("hn") ||
    lowerName.includes("hà nội") ||
    lowerName.includes("ha noi")
  )
    return "hn";
  if (
    lowerName.includes("dn") ||
    lowerName.includes("đà nẵng") ||
    lowerName.includes("da nang")
  )
    return "dn";
  return null;
}

async function main() {
  console.log("Logging in as admin...");
  const accessToken = await loginAsAdmin();

  const cities = await fetchCities();

  for (const city of cities) {
    const cityKey = getCityKey(city.cityName);

    if (!cityKey || !MOCK_CINEMAS[cityKey]) {
      console.warn(
        `⚠️ Pass city "${city.cityName}" - No data mock for this city.`,
      );
      continue;
    }

    console.log(`\n🌆 Creating cinemas for city: ${city.name}`);
    const cinemasToCreate = MOCK_CINEMAS[cityKey];

    for (const cinemaData of cinemasToCreate) {
      const payload = {
        cityId: city.id,
        name: cinemaData.name,
        address: cinemaData.address,
        latitude: cinemaData.latitude,
        longitude: cinemaData.longitude,
      };

      console.log(`Creating "${payload.name}"...`);
      const created = await createCinema(payload, accessToken);
      if (created) {
        const newId = created.data?.id || "?";
        console.log(`  ✅ OK -> id = ${newId}`);
      }

      await new Promise((r) => setTimeout(r, 300));
    }
  }

  console.log("\n🎉 Finish seeding Cinemas!");
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
