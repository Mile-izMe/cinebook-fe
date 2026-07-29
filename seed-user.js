const API_URL = "http://localhost:8080/api";

const FIRST_NAMES = [
  "Alex",
  "John",
  "Sarah",
  "Michael",
  "Emma",
  "Chris",
  "Jessica",
  "David",
  "Laura",
  "Kevin",
  "Emily",
  "Daniel",
  "Oliver",
  "Sophia",
  "Liam",
];
const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Nguyen",
  "Tran",
  "Le",
  "Taylor",
  "Anderson",
];

function getRandomName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

function getRandomPhone() {
  const prefixes = ["09", "08", "07", "03", "05"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
  return `${randomPrefix}${randomSuffix}`;
}

async function seedUsers() {
  console.log("🚀 Creating 30 users...");

  for (let i = 1; i <= 30; i++) {
    const randomUserName = getRandomName();
    const randomPhone = getRandomPhone();

    const userPayload = {
      email: `cinefan${i}@cinebook.com`,
      password: "Password123!",
      userName: randomUserName,
      phone: randomPhone,
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      if (response.ok) {
        console.log(`✅ Create success: ${userPayload.email}`);
      } else {
        const err = await response.text();
        console.error(`❌ Create error ${i}:`, err);
      }
    } catch (error) {
      console.error(`Error connection when creating user ${i}:`, error.message);
    }
  }

  console.log("🎉 Finish process creating Users!");
}

seedUsers();
