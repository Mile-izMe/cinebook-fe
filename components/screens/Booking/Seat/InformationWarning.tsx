import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

function InformationWarning() {
  const t = useTranslations("screen.booking.seat");
  return (
    <div className="flex gap-3 bg-black border border-white/5 p-4 rounded-xl text-[10px] uppercase font-black tracking-wider text-zinc-500">
      <ShieldCheck className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
      <p className="leading-relaxed">{t("infor_warning")}</p>
    </div>
  );
}

export default InformationWarning;
