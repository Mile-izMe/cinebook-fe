"use client";

import { generateDateOptions } from "@/lib";
import { useMemo } from "react";

interface DateSelectionProps {
  selectedDate?: string | null;
  onChange(date: string): void;
}

export default function DateSelection({
  selectedDate,
  onChange,
}: DateSelectionProps) {
  // Auto calculate 7 days (1 time by using useMemo)
  const dateOptions = useMemo(() => generateDateOptions(7), []);

  // Current active day (prefer from URL, if not use today)
  const activeDate = selectedDate ?? dateOptions[0]?.date;

  return (
    <div className="flex items-center gap-2 pb-1 overflow-x-auto w-full scrollbar-none border-b border-white/5">
      {dateOptions.map((opt) => {
        const isSelected = activeDate === opt.date;
        return (
          <button
            key={opt.date}
            onClick={() => onChange(opt.date)}
            className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl min-w-[100px] transition-all border cursor-pointer select-none ${
              isSelected
                ? "bg-brand-red border-brand-red text-white shadow-lg shadow-red-950/30 scale-102 font-black"
                : "bg-brand-dark border-white/5 text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            <span className="text-[10px] uppercase font-black tracking-widest opacity-80">
              {opt.dayName}
            </span>
            <span className="text-lg font-black mt-1 font-mono">
              {opt.dayNumber}
            </span>
            <span className="text-[9px] uppercase font-black opacity-75 mt-0.5 tracking-wider">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
