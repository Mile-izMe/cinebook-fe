import { Film } from "lucide-react";
import { useTranslations } from "next-intl";

const formats = [
  {
    label: "All",
    value: null,
  },
  {
    label: "2D",
    value: "2D",
  },
  {
    label: "3D",
    value: "3D",
  },
  {
    label: "IMAX",
    value: "IMAX",
  },
];

interface Props {
  value?: string | null;
  onChange(format?: string | null): void;
}

export default function FormatSelection({ value, onChange }: Props) {
  const t = useTranslations("screen.booking.showtime");
  return (
    <div className="bg-brand-dark border border-white/5 rounded-2xl p-5 space-y-3">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
        <Film className="w-4 h-4 text-brand-red" />
        <span>{t("view_format")}</span>
      </h3>
      <div className="grid grid-cols-2 gap-2 pt-1">
        {formats.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border text-center ${
              value === item.value
                ? "bg-brand-red/10 border-brand-red/50 text-brand-red"
                : "bg-black border-white/5 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
