import { BookingSummaryResponse } from "@/features";
import { Calendar, ChevronRight, Eye, MapPin, Ticket } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface BookingHistoryListProps {
  filteredBookings: BookingSummaryResponse[];
  isLoading: boolean;
  activeTab: "all" | "upcoming" | "past";
  setActiveTab: (tab: "all" | "upcoming" | "past") => void;
}

function BookingHistoryList({
  filteredBookings,
  isLoading,
  activeTab,
  setActiveTab,
}: BookingHistoryListProps) {
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex bg-brand-dark border border-white/5 p-1 rounded-xl max-w-sm">
        {(["all", "upcoming", "past"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest cursor-pointer ${
              activeTab === tab
                ? "bg-brand-red text-white shadow-lg"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-brand-dark border border-white/5 rounded-2xl"
            />
          ))}
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const showtime = new Date(booking.showtimeStart);
            const isUpcoming = showtime > new Date();

            const dateStr = showtime.toLocaleDateString("vi-VN");
            const timeStr = showtime.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={booking.bookingId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-dark border border-white/5 hover:border-white/10 p-5 rounded-2xl flex flex-col md:flex-row gap-5 items-stretch transition-all relative overflow-hidden"
              >
                {/* Status Indicator Band */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    booking.status === "CANCELLED"
                      ? "bg-zinc-700"
                      : isUpcoming
                        ? "bg-brand-red"
                        : "bg-emerald-600"
                  }`}
                />

                {/* Poster Thumbnail */}
                <img
                  src={booking.posterUrl}
                  alt={booking.movieName}
                  className="w-20 md:w-24 aspect-[2/3] object-cover rounded-xl border border-white/5 shrink-0 self-center md:self-auto"
                />

                {/* Content columns */}
                <div className="flex-grow flex flex-col justify-between py-1 gap-4 md:gap-0 pl-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-white text-xs md:text-sm tracking-widest uppercase line-clamp-1">
                        {booking.movieName}
                      </h3>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                          booking.status === "CANCELLED"
                            ? "bg-zinc-800 border-zinc-700 text-zinc-500"
                            : isUpcoming
                              ? "bg-brand-red/10 border-brand-red text-brand-red"
                              : "bg-emerald-950/45 border-emerald-800 text-emerald-400"
                        }`}
                      >
                        {booking.status === "CANCELLED"
                          ? "Cancelled"
                          : isUpcoming
                            ? "Upcoming"
                            : "Watched"}
                      </span>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[10px] uppercase font-black tracking-widest text-zinc-400">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span className="truncate">
                          {booking.cinemaName || "Cinebook"} •{" "}
                          {booking.roomName || "Standard"}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>
                          {dateStr} ({timeStr})
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Booking metadata info */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-3 text-[10px] uppercase font-black tracking-widest">
                    <div className="flex gap-4 text-zinc-500">
                      <div>
                        <span>Seats:</span>{" "}
                        <span className="text-zinc-300 font-black">
                          {/* Backend trả về List<String> nên chỉ cần join() */}
                          {booking.seats.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span>Paid:</span>{" "}
                        <span className="font-mono text-zinc-300 font-black">
                          {booking.totalPrice.toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/bookings/success?bookingId=${booking.bookingId}`} // Dùng href cho Next.js thay vì to
                      className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-red hover:text-red-400 transition-all group"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Ticket</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-brand-dark border border-white/5 rounded-3xl shadow-xl">
          <Ticket className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <h3 className="text-zinc-400 font-black text-xs uppercase tracking-widest mb-1">
            No Bookings Found
          </h3>
          <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
            {activeTab === "all"
              ? "You haven't purchased any film credentials yet."
              : `You do not have any ${activeTab} theater schedules.`}
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingHistoryList;
