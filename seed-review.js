// eslint-disable-next-line @typescript-eslint/no-require-imports
const { config: seed, list: seedList, pause: seedPause } = require("./seed-config.cjs");
const API_URL = seed.apiUrl;

const COMMENTS_BY_RATING = {
  5: [
    "Absolutely masterpiece! Highly recommended.",
    "Best movie I have seen this year!",
    "Mind-blowing twist at the end! Loved it.",
    "Incredible performance by the lead actor!",
    "A beautiful and emotional journey from start to finish.",
    "Left me speechless. I need a few days to process this.",
    "Brilliant storytelling and fantastic character development.",
  ],
  4: [
    "Great acting from the main cast.",
    "A solid action movie, grab some popcorn and enjoy.",
    "A perfect date night movie. Very funny and lighthearted.",
    "Dark, gritty, and keeping you on the edge of your seat.",
    "The cinematography is out of this world.",
    "I read the book, and this adaptation did it justice.",
    "Such an underrated gem. More people need to see this.",
    "The musical score elevated the whole experience.",
  ],
  3: [
    "It was okay, but the ending was a bit rushed.",
    "Not my type of movie, but the soundtrack was good.",
    "A bit too long for my taste, fell asleep halfway.",
    "Visuals are stunning, but the plot is weak.",
    "The villain was deeply well-written, but the heroes were a bit boring.",
    "A bit confusing at first, but everything ties together perfectly.",
  ],
  2: [
    "The pacing was off, it felt like it dragged on forever.",
    "Overhyped. It's just a generic blockbuster.",
    "I expected more from this director, honestly.",
  ],
  1: [
    "Boring and predictable. Wouldn't watch again.",
    "CGI was terrible, looked like a PS2 game.",
    "Completely ruined the original franchise.",
    "Too many plot holes, it didn't make any sense.",
    "Felt like a waste of time and money.",
  ],
};
async function seedReviews() {
  if (!seed.demoPassword) throw new Error("Set SEED_USER_PASSWORD for non-local sample accounts");
  const users = [];
  for (let i = 1; i <= seed.userCount; i++) {
    const res = await fetch(API_URL + "/auth/login", {
      method: "POST", signal: AbortSignal.timeout(30_000),
      headers: { "Content-Type": "application/json", "X-Device-ID": "seed-review-" + i },
      body: JSON.stringify({ email: "cinefan" + i + "@cinebook.com", password: seed.demoPassword }),
    });
    if (res.ok) {
      const { data } = await res.json();
      users.push({ token: data.accessToken, userId: data.userId });
    } else if (res.status >= 500) throw new Error("Review user login failed: " + res.status);
    await seedPause();
  }
  if (!users.length) throw new Error("Seed reviews requires verified sample users; no reviews created");
  const movies = (await seedList("/movies?limit=50")).slice(0, seed.movieCount);
  if (!movies.length) throw new Error("Seed movies first");
  let created = 0, skipped = 0, processed = 0;
  const perMovie = Math.ceil(seed.reviewCount / movies.length);
  // Round-robin gives every movie ratings, with no random retry loop.
  for (let round = 0; round < Math.min(perMovie, users.length); round++) {
    for (let index = 0; index < movies.length && processed < seed.reviewCount; index++) {
      const movie = movies[index], user = users[(index + round) % users.length];
      const existing = await seedList("/movies/" + movie.id + "/reviews?limit=50", user.token);
      processed++;
      if (existing.some(review => review.userId === user.userId)) { skipped++; continue; }
      const rating = 3 + ((index + round) % 3);
      const res = await fetch(API_URL + "/movies/" + movie.id + "/reviews", {
        method: "POST", signal: AbortSignal.timeout(30_000),
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + user.token },
        body: JSON.stringify({ rating, comment: COMMENTS_BY_RATING[rating][0] }),
      });
      if (res.ok) created++;
      else if (res.status === 409) skipped++;
      else throw new Error("Create review failed: " + res.status);
      await seedPause();
    }
  }
  console.log("Review seed finished: created=" + created + ", skipped=" + skipped);
}
seedReviews().catch(error => { console.error(error.message); process.exitCode = 1; });
