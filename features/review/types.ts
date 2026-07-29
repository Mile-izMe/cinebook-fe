export interface ReviewResponse {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string | null;
  rating: number;
  comment: string | null;
  createdAt: string;
}
