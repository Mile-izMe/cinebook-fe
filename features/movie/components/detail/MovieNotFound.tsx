"use client";
import { Film } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function MovieNotFound() {
  const router = useRouter();
  const t = useTranslations("movie");
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-brand-black text-center py-24 px-4">
      <Film className="w-12 h-12 text-zinc-700 mb-4 animate-bounce" />
      <h2 className="text-sm font-black text-white mb-2 uppercase tracking-widest">
        {t("movie_not_found")}
      </h2>
      <p className="text-zinc-500 text-xs max-w-sm mb-6 leading-relaxed">
        {t("movie_not_found_description")}
      </p>
      <button
        onClick={() => router.push("/")}
        className="cursor-pointer bg-brand-red hover:bg-red-700 text-white font-black py-4.5 px-8 rounded-xl text-xs uppercase tracking-widest transition-all"
      >
        {t("return_to_catalog")}
      </button>
    </div>
  );
}

export default MovieNotFound;
