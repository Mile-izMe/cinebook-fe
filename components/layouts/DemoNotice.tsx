"use client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function DemoNotice() {
  const t = useTranslations("demo");
  const locale = useLocale();
  return (
    <aside aria-label={t("learnMore")} className="border-b border-brand-red/20 bg-brand-red/10 px-4 py-3 text-center text-xs leading-relaxed text-zinc-200">
      <span>{t("banner")}</span>{" "}
      <Link href={`/${locale}/about`} className="font-semibold text-white underline underline-offset-4 hover:text-brand-red">{t("learnMore")}</Link>
    </aside>
  );
}
