"use client";
import { Film } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function FormatSelection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedFormat = searchParams.get("format") || "All";

  const setFormatToUrl = useCallback(
    (format: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (format === "All") {
        params.delete("format");
      } else {
        params.set("format", format);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return (
    <div className="bg-brand-dark border border-white/5 rounded-2xl p-5 space-y-3">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
        <Film className="w-4 h-4 text-brand-red" />
        <span>Viewing Format</span>
      </h3>
      <div className="grid grid-cols-2 gap-2 pt-1">
        {(["All", "2D", "3D", "IMAX"] as const).map((format) => (
          <button
            key={format}
            onClick={() => setFormatToUrl(format)}
            className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border text-center ${
              selectedFormat === format
                ? "bg-brand-red/10 border-brand-red/50 text-brand-red"
                : "bg-black border-white/5 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}
