// This is a public backend origin; never put credentials in NEXT_PUBLIC_ variables.
export const serverUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080"
).replace(/\/+$/, "");
