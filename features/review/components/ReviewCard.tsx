import { Star, User } from "lucide-react";
import { ReviewResponse } from "../types";

interface ReviewCardProps {
  review: ReviewResponse;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      key={review.id}
      className="bg-brand-dark p-6 rounded-2xl border border-white/5 space-y-3"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {review.userAvatarUrl ? (
            <img
              src={review.userAvatarUrl}
              alt={review.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-5 h-5 text-zinc-500" />
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-white">{review.userName}</h4>
            <p className="text-[10px] text-zinc-500 font-mono">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg border border-white/5">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span className="text-xs font-black text-white font-mono">
            {review.rating}
          </span>
        </div>
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed pl-13">
        {review.comment}
      </p>
    </div>
  );
}

export default ReviewCard;
