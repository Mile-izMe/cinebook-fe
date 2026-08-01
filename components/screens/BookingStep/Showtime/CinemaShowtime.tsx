import { CinemaGroup } from "@/lib";
import { AlertCircle, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface CinemaShowtimeProps {
  date?: string;
  cinemaGroups: CinemaGroup[];
}

function CinemaShowtime({ date, cinemaGroups }: CinemaShowtimeProps) {
  return (
    <div className="space-y-6">
      {cinemaGroups.length > 0 ? (
        cinemaGroups.map((group, index) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            key={index}
            className="bg-brand-dark border border-white/5 rounded-2xl p-6 space-y-5 shadow-2xl"
          >
            {/* Cinema Info Header */}
            <div className="border-b border-white/5 pb-4">
              <h3 className="font-black text-white text-sm tracking-widest uppercase">
                {group.cinemaName}
              </h3>
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-wider mt-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-red" />
                <span>{group.cinemaAddress}</span>
              </p>
            </div>

            {/* Times Grid */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {group.showtimes.map((st) => (
                  <button
                    key={st.id}
                    // onClick={() => handleSelectShowtime(group, st)}
                    className="group/btn bg-black border border-white/5 hover:border-brand-red/80 rounded-xl px-5 py-4 text-center transition-all cursor-pointer select-none active:scale-95"
                  >
                    <div className="text-sm font-black text-white group-hover/btn:text-brand-red transition-colors font-mono">
                      {/* Cut to take time from ISO 2026-07-31T18:00:00 -> 18:00 */}
                      {st.startTime.split("T")[1].substring(0, 5)}
                    </div>
                    <div className="flex justify-center items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-zinc-500 mt-1">
                      <span className="bg-brand-dark border border-white/5 px-1.5 py-0.5 rounded group-hover/btn:text-zinc-300">
                        {st.format}
                      </span>
                      <span className="text-zinc-500 group-hover/btn:text-brand-red font-mono">
                        {st.basePrice.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-20 bg-brand-dark border border-white/5 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <h3 className="text-zinc-400 font-black text-xs uppercase tracking-widest mb-1.5">
            No Showtimes Available
          </h3>
          <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
            There are no scheduled showtimes for this movie in this city. on{" "}
            {date}. Try selecting another city or date.
          </p>
        </div>
      )}
    </div>
  );
}

export default CinemaShowtime;
