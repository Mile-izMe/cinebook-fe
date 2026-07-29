"use client";

import { useAuthStore } from "@/features/auth";
import { Loader2 } from "lucide-react";
import { useReviews } from "../hooks";
import CreateReviewForm from "./CreateReviewForm";
import ReviewCard from "./ReviewCard";

interface MovieReviewSectionProps {
  movieId: string;
}

export default function MovieReviewSection({
  movieId,
}: MovieReviewSectionProps) {
  const { status } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useReviews(movieId);
  const reviews = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest">
          Audience Reviews
        </h2>
      </div>

      {/* Write Review Form */}
      <CreateReviewForm status={status} movieId={movieId} />

      {/* Review List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-10 text-zinc-500 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : reviews.length > 0 ? (
          <>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {/* Load More Button */}
            {hasNextPage && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  {isFetchingNextPage ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                    </span>
                  ) : (
                    "Load More Reviews"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-brand-dark border border-white/5 rounded-2xl">
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
