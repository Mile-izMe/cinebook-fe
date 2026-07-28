export interface GenreResponse {
  id: string;
  name: string;
}

export interface MovieSummaryResponse {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  duration: number;
  score: number;
  ageRating: string;
  genres: GenreResponse[];
}

export interface ReviewResponse {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO 8601, eg: "2026-07-28T10:30:00Z"
}

export interface MovieDetailResponse {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  duration: number;
  ageRating: string;
  score: number;
  totalReviews: number;
  releaseDate: string; // LocalDate -> "YYYY-MM-DD"
  director: string;
  cast: string[];
  genres: GenreResponse[];
  recentReviews: ReviewResponse[];
}
