import CustomToast from "@/components/layouts/CustomToast";
import Navbar from "@/components/layouts/NavBar";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Providers } from "../providers";
import "./globals.css";
import Footer from "@/components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Ticket Booking System",
  description:
    "A modern, highly polished dark-themed Movie Ticket Booking System with seat selection, countdown timers, checkout, and booking management.",
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar />
            {children}
            <CustomToast />
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
