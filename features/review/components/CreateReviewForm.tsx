"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateReview } from "../hooks";
import { CreateReviewInput, createReviewSchema } from "../validation";

interface MovieReviewSectionProps {
  movieId: string;
  status: string;
}

export default function CreateReviewForm({
  movieId,
  status,
}: MovieReviewSectionProps) {
  const router = useRouter();
  const reviewForm = useTranslations("review");
  const reviewSchema = createReviewSchema(reviewForm);
  const { mutate: createReview } = useCreateReview(movieId);

  const form = useForm<CreateReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const currentRating = watch("rating");
  const currentComment = watch("comment");

  const navigateToLogin = () => {
    router.push("/login");
  };

  const handleCreateReview = async (data: CreateReviewInput) => {
    try {
      await createReview(data, {
        onSuccess: () => {
          reset();
        },
      });
    } catch {}
  };

  return (
    <>
      {status === "authenticated" ? (
        <form
          onSubmit={handleSubmit(handleCreateReview)}
          className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5 space-y-4"
        >
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
            Leave a Review
          </h3>

          {/* Star Selection */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() =>
                  setValue("rating", star, { shouldValidate: true })
                }
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  star <= currentRating
                    ? "fill-amber-500 text-amber-500"
                    : "text-zinc-600"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4 items-start">
            <textarea
              {...register("comment")}
              placeholder="What did you think of the movie?"
              className="w-full bg-brand-black border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red resize-none h-24"
            />
            {errors.comment && (
              <p className="text-brand-red text-xs font-semibold pl-2">
                {errors.comment.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!currentComment?.trim() || isSubmitting}
              className="cursor-pointer flex items-center gap-2 bg-brand-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Post Review
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-brand-dark/30 p-6 rounded-2xl border border-white/5 text-center">
          <p className="text-zinc-400 text-sm">
            You must be logged in to post a review.
          </p>
          <button
            onClick={navigateToLogin}
            className="cursor-pointer mt-3 text-brand-red text-xs font-bold uppercase tracking-widest hover:underline"
          >
            Login Now
          </button>
        </div>
      )}
    </>
  );
}
