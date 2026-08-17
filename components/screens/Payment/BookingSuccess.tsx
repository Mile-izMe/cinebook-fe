"use client";

import { useAuthStore, useGetBookingTicket } from "@/features";
import { formatCurrency, formatIsoToCustom } from "@/lib";
import {
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Printer,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function BookingSuccess() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const authStatus = useAuthStore((state) => state.status);

  const redirectPath =
    authStatus === "authenticated" ? "/bookings-history" : "/bookings/lookup";

  const {
    data: ticketInformation,
    isLoading,
    isFetching,
    isError,
  } = useGetBookingTicket(bookingId!);

  const booking = ticketInformation?.data;

  if (isLoading || isFetching || !bookingId) {
    return (
      <div className="grow flex flex-col items-center justify-center bg-brand-black text-zinc-500 py-24">
        <RefreshCw className="w-8 h-8 animate-spin text-brand-red mb-2" />
        <span className="text-xs font-black uppercase tracking-widest">
          Creating ticket stub...
        </span>
      </div>
    );
  }

  if (isError || !booking) {
    console.log("API Ticket Error or Null data:", { isError, booking });
    return (
      <div className="grow flex flex-col items-center justify-center bg-brand-black text-center py-20 px-4">
        <ShieldCheck className="w-12 h-12 text-brand-red mb-4" />
        <h2 className="text-sm font-black text-white mb-2 uppercase tracking-widest">
          Booking Not Found
        </h2>
        <p className="text-zinc-500 text-xs max-w-sm mb-6 leading-relaxed">
          We could not retrieve details for this purchase transaction. Please
          check your transaction history.
        </p>
      </div>
    );
  }

  return (
    <div className="grow bg-brand-black pb-24 pt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success Alert Banner */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-2xl"
          >
            <Check className="w-10 h-10 stroke-[2.5]" />
          </motion.div>
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
              Booking Confirmed!
            </h1>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mt-1">
              Your tickets have been reserved. See you at the movies!
            </p>
          </div>
        </div>

        {/* Cinematic Ticket Receipt Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          {/* Half Circle ticket notches inside border styling */}
          <div className="absolute left-0 top-[60%] -translate-x-1/2 w-8 h-8 rounded-full bg-brand-black border border-white/5 z-10 hidden sm:block" />
          <div className="absolute right-0 top-[60%] translate-x-1/2 w-8 h-8 rounded-full bg-brand-black border border-white/5 z-10 hidden sm:block" />

          {/* Ticket Header Image */}
          <div className="relative h-44 overflow-hidden border-b border-white/5">
            <img
              src={booking.backdropUrl}
              alt={booking.movieTitle}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
              <div className="space-y-1">
                <span className="bg-brand-red text-white font-black text-[9px] uppercase px-2 py-1 rounded tracking-widest">
                  {booking.format} Active Ticket
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white line-clamp-1 uppercase tracking-tight mt-1.5">
                  {booking.movieTitle}
                </h2>
              </div>
              <div className="text-right font-mono text-zinc-500 text-[10px] font-black uppercase tracking-widest shrink-0">
                REF: #{booking.bookingCode}
              </div>
            </div>
          </div>

          {/* Ticket Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs uppercase tracking-wider font-semibold border-b border-white/5 pb-6">
              {/* Cinema info */}
              <div className="space-y-1.5">
                <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                  Theater Location
                </span>
                <div className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-zinc-200 font-black text-xs uppercase">
                      {booking.cinemaName}
                    </p>
                    <p className="text-zinc-500 text-[10px] mt-0.5 leading-relaxed">
                      {booking.cinemaAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Showtime / Room info */}
              <div className="space-y-1.5">
                <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                  Showtime & Room
                </span>
                <div className="flex gap-2 items-start">
                  <Calendar className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-zinc-200 font-black text-xs">
                      {formatIsoToCustom(booking.showtime)}
                    </p>
                    <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-0.5">
                      {booking.roomName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs uppercase tracking-wider font-semibold border-b border-white/5 pb-6">
              {/* Seats detail */}
              <div className="space-y-1.5">
                <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                  Seats Reserved
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {booking.seats.map((seat) => (
                    <span
                      key={seat}
                      className="bg-black border border-white/10 text-zinc-300 font-black text-xs px-2.5 py-1 rounded"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price details */}
              <div className="space-y-1.5">
                <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                  Billing Breakdown
                </span>
                <div className="flex items-center gap-1.5 text-zinc-350">
                  <span className="text-xs">
                    Paid with {booking.paymentMethod}:
                  </span>
                  <span className="font-mono text-white font-black text-sm">
                    {formatCurrency(booking.totalPrice)}
                  </span>
                  {/* {booking.discountApplied && (
                    <span className="text-emerald-400 text-xs font-black tracking-widest ml-1">
                      (Saved ${booking.discountApplied.toFixed(2)})
                    </span>
                  )} */}
                </div>
              </div>
            </div>

            {/* Custom CSS Barcode rendering */}
            <div className="space-y-3 pt-2 text-center">
              <div className="bg-white p-4 rounded-xl inline-block max-w-70 w-full">
                {/* Simulated barcode layout */}
                <div className="flex h-12 w-full justify-between items-stretch">
                  {Array.from({ length: 42 }).map((_, idx) => {
                    // Stable randomized bar thicknesses
                    const thicknesses = [
                      "w-[1px]",
                      "w-[2px]",
                      "w-[3px]",
                      "w-[1px]",
                      "w-[4px]",
                      "w-[2px]",
                      "w-[1px]",
                      "w-[1px]",
                      "w-[3px]",
                      "w-[2px]",
                      "w-[4px]",
                      "w-[1px]",
                    ];
                    const barWidth = thicknesses[idx % thicknesses.length];
                    const hideBar = idx % 11 === 0 && idx > 0;

                    return (
                      <div
                        key={idx}
                        className={`bg-zinc-950 h-full ${barWidth} ${hideBar ? "bg-transparent" : ""}`}
                      />
                    );
                  })}
                </div>
                {/* Barcode labels */}
                <p className="text-[10px] font-mono tracking-[4px] text-zinc-600 mt-2 font-black uppercase select-all">
                  ST-{booking.bookingCode.toUpperCase()}-
                  {booking.seats.map((s) => s).join("")}
                </p>
              </div>
              <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-relaxed">
                Present QR/Barcode at entry scanner for hall access
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Bottom links */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-brand-dark hover:bg-zinc-800 border border-white/5 text-zinc-300 hover:text-white font-black py-4 px-6 rounded-xl transition-all uppercase tracking-widest text-[10px]"
          >
            <Printer className="w-4.5 h-4.5" />
            <span>Print Receipt</span>
          </button>

          <Link
            href={redirectPath}
            className="flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white font-black py-4 px-8 rounded-xl transition-all shadow-2xl active:scale-95 uppercase text-[10px] tracking-widest"
          >
            <span>My Virtual Tickets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;
