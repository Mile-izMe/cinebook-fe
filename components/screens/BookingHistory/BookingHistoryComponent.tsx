"use client";

import { useMemberBooking } from "@/features";
import BookingHistoryBanner from "./BookingHistoryBanner";
import { useMemo, useState } from "react";
import BookingHistoryList from "./BookingHistoryList";
import { Loader2 } from "lucide-react";

function BookingHistoryComponent() {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">(
    "all",
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMemberBooking();

  const filteredBookings = useMemo(() => {
    const allBookings = data?.pages.flatMap((page) => page.data) ?? [];

    if (allBookings.length === 0) return [];

    const now = new Date();

    return allBookings.filter((booking) => {
      // Turn ISO into Date object to compare
      const showtime = new Date(booking.showtimeStart);
      const isUpcoming = showtime > now;

      if (activeTab === "upcoming") return isUpcoming;
      if (activeTab === "past") return !isUpcoming;
      return true; // tab 'all'
    });
  }, [data, activeTab]);

  return (
    <div className="grow bg-brand-black pb-20">
      <BookingHistoryBanner />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6">
        <BookingHistoryList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoading={isLoading}
          filteredBookings={filteredBookings}
        />

        {hasNextPage && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="flex items-center gap-2 px-8 py-3.5 bg-brand-dark hover:bg-zinc-800 border border-white/5 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
                  Loading more...
                </>
              ) : (
                "View more"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistoryComponent;
