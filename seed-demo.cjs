/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node.js seed script. */
const { spawnSync } = require("node:child_process");
const { config } = require("./seed-config.cjs");
const scripts = ["movie", "cinema", "room", "seat", "showtime"];
if (process.argv.includes("--with-reviews")) scripts.push("review");
console.log("Target:", config.apiUrl);
console.log("Limits:", config.movieCount, "movies;", config.cinemaCount, "cinemas;",
  config.roomsPerCinema, "rooms/cinema;", config.days, "days;", config.reviewCount, "reviews");
if (process.argv.includes("--dry-run")) {
  console.log("Dry run only; no network requests. Sequence:", scripts.join(" -> "));
} else {
  for (const script of scripts) {
    const result = spawnSync(process.execPath, ["seed-" + script + ".js"], { cwd: __dirname, stdio: "inherit" });
    if (result.error || result.status !== 0) { process.exitCode = result.status || 1; break; }
  }
}
