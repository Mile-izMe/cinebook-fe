import { Accessibility } from "lucide-react";

export default function SeatingMapLegend() {
  return (
    <div className="bg-black border border-white/5 p-5 rounded-xl">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3.5">
        Seating Legend
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-[10px] uppercase font-black tracking-wider text-zinc-400">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-brand-dark border border-white/10" />
          <span>Standard</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-purple-950/20 border border-purple-800 text-purple-400 flex items-center justify-center font-black text-[9px]">
            VIP
          </div>
          <span>VIP Lounge (+20.000 VND)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-sky-950/20 border border-sky-800 text-sky-400 flex items-center justify-center">
            <Accessibility className="w-3.5 h-3.5" />
          </div>
          <span>Wheelchair (-20.000 VND)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-brand-red border border-brand-red shadow-lg" />
          <span>Selected Seat</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-900 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-45">
              <div className="w-full h-[1.5px] bg-zinc-600 rotate-45" />
            </div>
          </div>
          <span>Sold Out</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-amber-700/20 border border-amber-900/50" />
          <span>Reserved hold</span>
        </div>
      </div>
    </div>
  );
}
