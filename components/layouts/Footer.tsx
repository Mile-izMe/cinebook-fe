"use client";
import { Film, Mail } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaX, FaInstagram, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/5 text-zinc-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo / Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-brand-red font-black text-2xl tracking-tighter select-none"
            >
              <Film className="w-7 h-7 fill-brand-red" />
              <span>CINEBOOK</span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Experience cinema like never before. Cinebook Cinema brings you
              advanced laser projection, deep Dolby Atmos audio, and VIP
              recliners for maximum movie immersion.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2.5 bg-brand-dark hover:bg-brand-red/10 hover:text-brand-red rounded-xl transition-colors border border-white/5"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-brand-dark hover:bg-brand-red/10 hover:text-brand-red rounded-xl transition-colors border border-white/5"
              >
                <FaX className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-brand-dark hover:bg-brand-red/10 hover:text-brand-red rounded-xl transition-colors border border-white/5"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-brand-dark hover:bg-brand-red/10 hover:text-brand-red rounded-xl transition-colors border border-white/5"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-white uppercase mb-4">
              Discover
            </h3>
            <ul className="space-y-2 text-xs font-medium uppercase tracking-wider">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Now Playing
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link
                  href="/bookings-history"
                  className="hover:text-white transition-colors"
                >
                  Booking History
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-white transition-colors"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines / Help */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-white uppercase mb-4">
              Support & Terms
            </h3>
            <ul className="space-y-2 text-xs font-medium uppercase tracking-wider">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ & Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Refund & Cancellation
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-black tracking-widest text-white uppercase mb-4">
              Stay Tuned
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Subscribe to get exclusive discounts, weekly film schedules, and
              invite-only pre-screening alerts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-brand-dark border border-white/5 rounded-xl pl-10 pr-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer bg-brand-red hover:bg-red-700 text-white text-[10px] uppercase tracking-widest px-4 py-2.5 font-black rounded-xl transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* CẬP NHẬT: Thêm TMDB Attribution vào khu vực bản quyền */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 text-xs text-zinc-500 text-center md:text-left">
          <div className="space-y-2">
            <p>
              &copy; {new Date().getFullYear()} Cinebook Cinema Group. All
              rights reserved.
            </p>
            {/* Dòng ghi công bắt buộc của TMDB */}
            <p className="opacity-75">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
