import { Film } from "lucide-react";

interface FormatSelectionProps {
  selectedFormat: string | undefined;
  setSelectedFormat: (format: string) => void;
}

export default function FormatSelection({
  selectedFormat,
  setSelectedFormat,
}: FormatSelectionProps) {
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
            onClick={() => setSelectedFormat(format)}
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
