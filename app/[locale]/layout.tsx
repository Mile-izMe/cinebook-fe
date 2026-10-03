import CustomToast from "@/components/layouts/CustomToast";
import DemoNotice from "@/components/layouts/DemoNotice";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/NavBar";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Providers } from "../providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineBook educational demo",
  description:
    "Non-commercial learning project with simulated cinema bookings, seat holds and payments. No real tickets or charges.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "vi" | "en")) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-zinc-200" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <NuqsAdapter>
            <Providers>
              <Navbar />
              <DemoNotice />
              {children}
              <CustomToast />
              <Footer />
            </Providers>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
