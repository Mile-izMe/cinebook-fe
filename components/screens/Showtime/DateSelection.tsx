"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

// Auto generate 7 days from today
const generateDateOptions = (daysCount = 7) => {
  const options = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    // Format YYYY-MM-DD
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    // Date (Fri, Sat, Sun...)
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });

    // Label display (Today, Tomorrow, or "19 Jul")
    let label = "";
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else
      label = d.toLocaleDateString("en-US", { day: "numeric", month: "short" });

    options.push({
      date: dateStr,
      dayName,
      dayNumber: day,
      label,
    });
  }
  return options;
};

export default function DateSelection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Auto calculate 7 days (1 time by using useMemo)
  const dateOptions = useMemo(() => generateDateOptions(7), []);

  // 2. Read ?date=... from URL
  const selectedDate = searchParams.get("date");

  // 3. Update URL when user pick date
  const setDateToUrl = useCallback(
    (dateStr: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("date", dateStr);

      // replace URL
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    },
    [searchParams, pathname],
  );

  // 4. If URL does not have ?date=..., auto set today for default
  useEffect(() => {
    if (!selectedDate && dateOptions.length > 0) {
      setDateToUrl(dateOptions[0].date);
    }
  }, [selectedDate, dateOptions, setDateToUrl]);

  // Current active day (prefer from URL, if not use today)
  const activeDate = selectedDate ?? dateOptions[0]?.date;

  return (
    <div className="flex items-center gap-2 pb-1 overflow-x-auto w-full scrollbar-none border-b border-white/5">
      {dateOptions.map((opt) => {
        const isSelected = activeDate === opt.date;
        return (
          <button
            key={opt.date}
            onClick={() => setDateToUrl(opt.date)}
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
