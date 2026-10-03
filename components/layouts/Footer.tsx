"use client";
import { Film } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("demo");
  const locale = useLocale();
  return (
    <footer className="mt-auto border-t border-white/5 bg-brand-black text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2 text-2xl font-black tracking-tighter text-brand-red">
              <Film className="h-7 w-7" /><span>CINEBOOK</span>
            </Link>
            <p className="text-sm leading-relaxed">{t("intro")}</p>
          </div>
          <nav aria-label={t("discover")} className="space-y-3 text-sm">
            <h2 className="font-semibold text-white">{t("discover")}</h2>
            <Link href={`/${locale}`} className="block hover:text-white">{t("catalog")}</Link>
            <Link href={`/${locale}/bookings-history`} className="block hover:text-white">{t("bookings")}</Link>
            <Link href={`/${locale}/profile`} className="block hover:text-white">{t("profile")}</Link>
            <Link href={`/${locale}/about`} className="block underline underline-offset-4 hover:text-white">{t("title")}</Link>
          </nav>
          <div className="space-y-3 text-sm leading-relaxed">
            <h2 className="font-semibold text-white">{t("safety")}</h2>
            <p>{t("safetyBody")}</p>
          </div>
        </div>
        <div className="mt-8 space-y-3 border-t border-white/5 pt-6 text-xs leading-relaxed">
          <p>{t("footer")}</p>
          <p>{t("tmdbNotice")}</p>
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">Movie data and images: TMDB</a>
        </div>
      </div>
    </footer>
  );
}
