export interface Showtime {
  id: string;
  movieId: string;
  movieTitle: string;
  movieDuration: number;
  roomId: string;
  roomName: string;
  cinemaId: string;
  cinemaName: string;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
  format: string;
  basePrice: number;
  genreNames: string[];
}
