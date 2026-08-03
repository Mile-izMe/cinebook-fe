import { ShieldCheck } from "lucide-react";

function InformationWarning() {
  return (
    <div className="flex gap-3 bg-black border border-white/5 p-4 rounded-xl text-[10px] uppercase font-black tracking-wider text-zinc-500">
      <ShieldCheck className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
      <p className="leading-relaxed">
        By booking tickets online, you are guaranteed reservation rights for
        selected spots. Lock duration allows safe transaction clearance. Please
        wear face masks inside theatres according to local health guidance laws.
      </p>
    </div>
  );
}

export default InformationWarning;
