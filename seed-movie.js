/**
 * One-off seed script: fetch ~30 popular movies from TMDB and POST them into
 * the Cinebook backend. Run once, throw away after.
 *
 *   npm install node-fetch@2
 *   node seed-movies.js
 *
 * Requires Node >= 18 (has native fetch) - if you're on an older Node,
 * `npm install node-fetch@2` and uncomment the require line below.
 */

// const fetch = require("node-fetch"); // uncomment if Node < 18

const TMDB_API_KEY = "97665f53064855e695d41b0b198f0598";
const TMDB_BASE = "https://api.themoviedb.org/3";

const CINEBOOK_BASE = "http://localhost:8080/api";
const ADMIN_EMAIL = "leducminhdhqt@gmail.com";
const ADMIN_PASSWORD = "123456789";
const DEVICE_ID = "seed-script";

const MOVIE_COUNT = 3;

// TMDB genre name -> lowercase, must roughly match your seeded `genre.name` values
// (Action, Drama, Comedy, Sci-Fi, Horror, Romance, Animation - see V4 migration)
const TMDB_TO_LOCAL_GENRE = {
  "Science Fiction": "Sci-Fi",
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

async function fetchGenreMap(accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/genres`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const body = await res.json();
  const genres = body.data ?? body; // handle both ApiSuccessResponse-wrapped and raw array
  const map = {};
  for (const g of genres) map[g.name.toLowerCase()] = g.id;
  return map;
}

async function fetchPopularMovieIds(count) {
  const ids = [];
  let page = 1;
  while (ids.length < count) {
    const res = await fetch(
      `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&page=${page}`,
    );
    const body = await res.json();
    ids.push(...body.results.map((m) => m.id));
    page++;
    if (page > 5) break; // safety valve
  }
  return ids.slice(0, count);
}

async function fetchMovieDetail(tmdbId) {
  const res = await fetch(
    `${TMDB_BASE}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,release_dates`,
  );
  return res.json();
}

function mapToCreateRequest(detail, genreMap) {
  const director =
    detail.credits?.crew?.find((c) => c.job === "Director")?.name ?? "Unknown";
  const cast = (detail.credits?.cast ?? []).slice(0, 8).map((c) => c.name);

  const trailer = (detail.videos?.results ?? []).find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const trailerUrl = trailer
    ? `https://www.youtube.com/watch?v=${trailer.key}`
    : null;

  const usRelease = detail.release_dates?.results?.find(
    (r) => r.iso_3166_1 === "US",
  );
  const ageRating = usRelease?.release_dates?.[0]?.certification || "PG-13";

  const genreIds = (detail.genres ?? [])
    .map((g) => {
      const localName = TMDB_TO_LOCAL_GENRE[g.name] ?? g.name;
      return genreMap[localName.toLowerCase()];
    })
    .filter(Boolean);

  return {
    title: detail.title,
    description: detail.overview || "No description available.",
    duration: detail.runtime || 100,
    ageRating: ageRating || "PG-13",
    releaseDate: detail.release_date || "2020-01-01",
    director,
    cast: cast.length ? cast : ["Unknown"],
    trailerUrl,
    posterUrl: detail.poster_path
      ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
      : null,
    backdropUrl: detail.backdrop_path
      ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
      : null,
    genreIds,
  };
}

async function createMovie(payload, accessToken) {
  const res = await fetch(`${CINEBOOK_BASE}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error(`  FAILED (${res.status}):`, await res.text());
    return null;
  }
  return res.json();
}

async function main() {
  console.log("Logging in as admin...");
  const accessToken = await loginAsAdmin();

  console.log("Fetching local genre map...");
  const genreMap = await fetchGenreMap(accessToken);
  console.log("Local genres:", genreMap);

  console.log(`Fetching ${MOVIE_COUNT} popular movie IDs from TMDB...`);
  const tmdbIds = await fetchPopularMovieIds(MOVIE_COUNT);

  for (const tmdbId of tmdbIds) {
    const detail = await fetchMovieDetail(tmdbId);
    const payload = mapToCreateRequest(detail, genreMap);

    if (payload.genreIds.length === 0) {
      console.warn(
        `Skipping "${payload.title}" - no matching local genre found`,
      );
      continue;
    }

    console.log(`Creating "${payload.title}"...`);
    const created = await createMovie(payload, accessToken);
    if (created) console.log(`  OK -> id=${created.data?.id ?? "?"}`);

    // gentle throttle so we don't hammer TMDB's rate limit
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
