# Compact CineBook seed

Default profile: 12 movies, 3 cinemas (one per city), 2 rooms of 60 seats each,
7 days with 14:00 and 20:00 sessions: at most 84 showtimes, less on the first day.
6 sample review users and 36 reviews. Reviews are distributed across movies.
Requests are sequential and writes are throttled; existing names/seats/slots/reviews are skipped.
Existing data is never deleted or resized. Full profile is opt-in: SEED_PROFILE=full.

PowerShell preview (no HTTP requests):

    $env:SEED_API_URL = 'https://<backend-domain>/api'
    node seed-demo.cjs --dry-run

After backend startup, set ADMIN_EMAIL, ADMIN_PASSWORD, TMDB_API_KEY locally,
then run node seed-demo.cjs. These secrets stay out of frontend NEXT_PUBLIC variables.
For reviews, verify the sample users first and set SEED_USER_PASSWORD,
then run node seed-review.js (or seed-demo.cjs --with-reviews).
seed-user.js uses normal email verification; it does not bypass it in production.

Overrides: SEED_MOVIE_COUNT, SEED_CINEMA_COUNT, SEED_ROOMS_PER_CINEMA,
SEED_DAYS, SEED_USER_COUNT, SEED_REVIEW_COUNT. All counts have upper bounds.
