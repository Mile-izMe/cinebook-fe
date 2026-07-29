const API_URL = "http://localhost:8080/api";

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
  console.log("🚀 Seeding Reviews...");

  const userTokens = [];
  console.log("⏳ Logging in 30 users...");
  for (let i = 1; i <= 30; i++) {
    const email = `cinefan${i}@cinebook.com`;
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-ID": `seed-script-device-${i}`,
      },
      body: JSON.stringify({ email: email, password: "Password123!" }),
    });

    if (res.ok) {
      const data = await res.json();
      userTokens.push({ email, token: data.data.accessToken });
    }
  }
  console.log(`✅ Get success ${userTokens.length} token.`);

  // Get list movies
  console.log("⏳ Get list phim...");
  const moviesRes = await fetch(`${API_URL}/movies?limit=50`);
  const moviesData = await moviesRes.json();
  const movies = moviesData.data;
  console.log(`✅ Found ${movies.length} movies.`);

  // Create random reviews
  let successCount = 0;
  let attempts = 0;
  const usedCombinations = new Set(); // Prevent 1 user rate 2 times

  while (successCount < 300 && attempts < 2000) {
    // Random user & random movie
    const randomUser =
      userTokens[Math.floor(Math.random() * userTokens.length)];
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    const comboKey = `${randomUser.email}-${randomMovie.id}`;

    if (usedCombinations.has(comboKey)) continue;

    const rating = Math.floor(Math.random() * 5) + 1;
    const possibleComments = COMMENTS_BY_RATING[rating];
    const comment =
      possibleComments[Math.floor(Math.random() * possibleComments.length)];

    try {
      const res = await fetch(`${API_URL}/movies/${randomMovie.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${randomUser.token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (res.ok) {
        usedCombinations.add(comboKey);
        successCount++;
        console.log(
          `⭐ Review #${successCount}: ${randomUser.email} rate ${rating} star for movie with ID ${randomMovie.id.substring(0, 8)}...`,
        );
      }
    } catch (error) {
      console.error("Error when creating review:", error.message);
    }
  }

  console.log(`🎉 Finish seeding ${successCount} Reviews!`);
}

seedReviews();
