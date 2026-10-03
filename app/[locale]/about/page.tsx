import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineBook educational demo and credits",
  description: "About the CineBook learning project, simulated bookings, third-party movie content and credits.",
};

export default async function AboutPage() {
  const t = await getTranslations("demo");
  const sections = [
    ["scopeTitle", "scope"], ["affiliationTitle", "affiliation"],
    ["ratingTitle", "rating"], ["privacyTitle", "privacy"], ["sourcesTitle", "sources"],
  ] as const;
  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-12 text-zinc-300 sm:px-6">
      <div className="space-y-4"><h1 className="text-3xl font-bold text-white">{t("title")}</h1><p className="leading-relaxed">{t("intro")}</p></div>
      <section className="space-y-4 rounded-2xl border border-white/10 bg-brand-dark p-6">
        <h2 className="text-xl font-semibold text-white">{t("creditsTitle")}</h2>
        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg bg-white p-3">
          {/* Official, unmodified logo from TMDB's approved attribution assets. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.themoviedb.org/assets/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt="The Movie Database (TMDB)" className="h-auto w-40" />
        </a>
        <p className="leading-relaxed">{t("credits")}</p>
        <p className="font-medium text-white">{t("tmdbNotice")}</p>
        <a href="https://developer.themoviedb.org/docs/faq" target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">{t("sourceLink")}</a>
      </section>
      {sections.map(([title, body]) => <section key={title} className="space-y-3"><h2 className="text-xl font-semibold text-white">{t(title)}</h2><p className="leading-relaxed">{t(body)}</p></section>)}
    </main>
  );
}
