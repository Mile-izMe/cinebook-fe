"use client";

import { CinemaSummary, MovieSummary, SeatMapSeat } from "@/features/booking";
import {
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  Tag,
  Ticket,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

interface BookingSummaryProps {
  movieSummary: MovieSummary;
  cinemaSummary: CinemaSummary;
  selectedSeats: SeatMapSeat[];
  onNext: () => void;
  nextText: string;
  isNextLoading?: boolean;
  disableNext?: boolean;
}

function BookingSummary({
  movieSummary,
  cinemaSummary,
  selectedSeats,
  onNext,
  nextText = "Continue",
  isNextLoading = false,
  disableNext = false,
}: BookingSummaryProps) {
  const t = useTranslations("screen.booking");
  const [promoInput, setPromoInput] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const subtotal = useMemo(
    () => selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
    [selectedSeats],
  );
  const total = subtotal - discountAmount;

  const handleClearDiscount = () => {
    setDiscountCode("");
    setDiscountAmount(0);
    setPromoError("");
    setIsApplyingPromo(false);
  };

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    //   const success = await applyDiscountCode(promoInput.trim());
    const success = await "ABC";
    if (success) {
      toast.success(
        `Promo code "${promoInput.toUpperCase()}" applied successfully!`,
      );
      setPromoInput("");
    } else {
      toast.error("Invalid or inapplicable discount code");
    }
  };

  if (!movieSummary || !selectedSeats) {
    return (
      <div className="bg-brand-dark border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center h-48">
        <Ticket className="w-10 h-10 text-zinc-600 mb-2 animate-bounce" />
        <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">
          {t("select_movie_seat")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-brand-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl text-zinc-300">
        {/* Header stub */}
        <div className="bg-black p-5 border-b border-white/5">
          <h3 className="font-black text-xs text-white tracking-widest uppercase flex items-center gap-2">
            <Ticket className="w-5 h-5 text-brand-red" />
            <span>{t("booking_summary")}</span>
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Movie Info */}
          <div className="flex gap-4">
            <img
              src={movieSummary.posterUrl}
              alt={movieSummary.title}
              className="w-16 aspect-[2/3] object-cover rounded-lg border border-white/5 shrink-0"
            />
            <div className="space-y-1">
              <h4 className="font-black text-white text-xs uppercase tracking-wider line-clamp-1">
                {movieSummary.title}
              </h4>
              <div className="flex gap-2 items-center text-[10px] font-black uppercase">
                <span className="bg-brand-black border border-white/5 text-zinc-300 px-1.5 py-0.5 rounded font-mono">
                  {/* {selectedShowtime.format} */} 4DX
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400 font-mono">
                  {movieSummary.duration} {t("min")}
                </span>
              </div>
              <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                {movieSummary.genreNames.slice(0, 2).join(" / ")}
              </p>
            </div>
          </div>

          <hr className="border-dashed border-white/5" />

          {/* Showtime Details */}
          <div className="space-y-3.5 text-xs font-semibold uppercase tracking-wider">
            <div className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-black text-xs uppercase">
                  {cinemaSummary.name}
                </p>
                <p className="text-zinc-500 text-[10px] uppercase mt-0.5 leading-relaxed">
                  {cinemaSummary.address}
                </p>
              </div>
            </div>

            {/* <div className="flex gap-3 items-center">
            <Calendar className="w-4 h-4 text-brand-red shrink-0" />
            <div className="flex justify-between w-full text-[11px] font-black">
              <span className="text-zinc-300">
                {selectedShowtime.date} ({selectedShowtime.time})
              </span>
              <span className="text-zinc-500 font-mono">
                {selectedShowtime.roomName}
              </span>
            </div>
          </div> */}
          </div>

          <hr className="border-dashed border-white/5" />

          {/* Selected Seats */}
          <div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-2">
              <span className="text-zinc-400">
                {t("selected_seats")} ({selectedSeats.length})
              </span>
              <span className="text-zinc-500 font-mono">{t("rowSeat")}</span>
            </div>

            {selectedSeats.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat.seatId}
                    className={`text-[10px] font-black px-2.5 py-1 rounded border uppercase ${
                      seat.type === "VIP"
                        ? "bg-purple-950/20 border-purple-800/80 text-purple-400"
                        : seat.type === "WHEELCHAIR"
                          ? "bg-sky-950/20 border-sky-800/80 text-sky-400"
                          : "bg-black border-white/5 text-zinc-300"
                    }`}
                  >
                    {seat.label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest italic">
                {t("no_seat")}
              </p>
            )}
          </div>

          <hr className="border-dashed border-white/5" />

          {/* Discount Section */}
          {selectedSeats.length > 0 && (
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                {t("discount_code")}
              </label>
              {discountCode ? (
                <div className="flex justify-between items-center bg-black border border-brand-red/30 p-2.5 rounded-xl text-[11px] uppercase font-black">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-brand-red fill-brand-red/15" />
                    <span className="font-black text-brand-red tracking-widest font-mono">
                      {discountCode}
                    </span>
                    <span className="text-emerald-400 font-mono">
                      (-{discountAmount} VND)
                    </span>
                  </div>
                  <button
                    onClick={() => handleClearDiscount()}
                    className="text-[10px] text-zinc-500 hover:text-white underline uppercase font-black tracking-widest"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="WELCOME5, PROMO10..."
                    className="flex-1 bg-black border border-white/5 rounded-xl px-3 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white font-mono uppercase font-black"
                  />
                  <button
                    type="submit"
                    disabled={isApplyingPromo || !promoInput.trim()}
                    className="bg-brand-red hover:bg-red-700 text-white text-[10px] uppercase tracking-widest px-4 rounded-xl font-black transition-all disabled:opacity-50"
                  >
                    {isApplyingPromo ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-brand-red text-[9px] mt-1 font-black uppercase tracking-widest">
                  {promoError}
                </p>
              )}
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-2 bg-black p-4 rounded-xl border border-white/5 uppercase font-black tracking-widest text-[9px]">
            <div className="flex justify-between text-[10px]">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-mono text-zinc-300">
                {subtotal.toLocaleString("vi-VN")} VND
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[10px] text-emerald-400">
                <span>{t("discount")}</span>
                <span className="font-mono">
                  -{discountAmount.toLocaleString("vi-VN")} VND
                </span>
              </div>
            )}
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>{t("booking_fee")}</span>
              <span className="font-mono">{t("free")}</span>
            </div>
            <div className="border-t border-white/5 my-2 pt-2.5 flex justify-between">
              <span className="text-xs font-black text-white uppercase tracking-widest">
                {t("total")}
              </span>
              <span className="text-base font-black text-brand-red font-mono">
                {total.toLocaleString("vi-VN")} VND
              </span>
            </div>
          </div>

          {/* Action Button */}
          {onNext && (
            <button
              onClick={onNext}
              disabled={
                selectedSeats.length === 0 || isNextLoading || disableNext
              }
              className="cursor-pointer w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white font-black py-4 px-4 rounded-xl transition-all shadow-lg active:scale-98 disabled:opacity-50 disabled:pointer-events-none text-xs tracking-widest uppercase"
            >
              {isNextLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>{nextText}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
