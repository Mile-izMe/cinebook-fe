/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node.js seed script. */
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env.local"), quiet: true });
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

const full = process.env.SEED_PROFILE === "full";
function count(name, fallback, maximum) {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value < 1 || value > maximum) {
    throw new Error(name + " must be an integer between 1 and " + maximum);
  }
  return value;
}
const apiUrl = (process.env.SEED_API_URL || "http://localhost:8080/api").replace(/\/+$/, "");
const parsed = new URL(apiUrl);
if (!["http:", "https:"].includes(parsed.protocol) || !parsed.pathname.endsWith("/api")) {
  throw new Error("SEED_API_URL must be an HTTP(S) URL ending in /api");
}
const config = {
  full, apiUrl,
  movieCount: count("SEED_MOVIE_COUNT", full ? 30 : 12, 50),
  cinemaCount: count("SEED_CINEMA_COUNT", full ? 15 : 3, 15),
  roomsPerCinema: count("SEED_ROOMS_PER_CINEMA", full ? 4 : 2, 4),
  days: count("SEED_DAYS", 7, 14),
  userCount: count("SEED_USER_COUNT", full ? 30 : 6, 30),
  reviewCount: count("SEED_REVIEW_COUNT", full ? 300 : 36, 300),
  demoPassword: process.env.SEED_USER_PASSWORD || "Password123!",
};
if (!["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname)
    && !process.env.SEED_USER_PASSWORD) {
  config.demoPassword = null;
}
async function request(endpoint, options = {}) {
  const response = await fetch(config.apiUrl + endpoint, {
    ...options, signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(endpoint + " failed with HTTP " + response.status);
  return response.json();
}
function items(body) { return body.data?.content || body.data || body; }
async function list(endpoint, token) {
  const all = [];
  let cursor;
  for (let page = 0; page < 100; page++) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const query = cursor ? separator + "cursor=" + encodeURIComponent(cursor) : "";
    const body = await request(endpoint + query, { headers: token ? { Authorization: "Bearer " + token } : {} });
    const data = items(body);
    if (!Array.isArray(data)) throw new Error("Expected a list from " + endpoint);
    all.push(...data);
    if (!body.meta?.hasMore || !body.meta.nextCursor) return all;
    if (cursor === body.meta.nextCursor) throw new Error("Repeated pagination cursor");
    cursor = body.meta.nextCursor;
  }
  throw new Error("Too many pages from " + endpoint);
}
function pause(ms = 250) { return new Promise(resolve => setTimeout(resolve, ms)); }
module.exports = { config, list, request, items, pause };
