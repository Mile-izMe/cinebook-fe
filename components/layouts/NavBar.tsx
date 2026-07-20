"use client";
import { useAuthStore, useLogout } from "@/features/auth";
import { Film, LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, status } = useAuthStore();
  const pathname = usePathname();
  const { mutate: logout, isPending } = useLogout();
  const isAuthenticated = status === "authenticated";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Bookings", path: "/bookings-history" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-brand-red font-black text-2xl tracking-tighter select-none"
          >
            <Film className="w-7 h-7 fill-brand-red animate-pulse" />
            <span>CINEBOOK</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 relative py-1 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth Controls */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:opacity-85 transition-opacity"
                >
                  <img
                    src={
                      user?.avatarUrl ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                    }
                    alt={user?.userName}
                    className="w-8 h-8 rounded-full border-2 border-brand-red object-cover"
                  />
                  <span className="text-zinc-200 text-xs font-bold uppercase tracking-wider max-w-[120px] truncate">
                    {user?.userName}
                  </span>
                </Link>
                <button
                  onClick={() => logout()}
                  disabled={isPending}
                  className="p-2 text-zinc-400 hover:text-brand-red hover:bg-zinc-900 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-brand-red hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-brand-black px-4 pt-2 pb-6 space-y-3"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${
                    isActive
                      ? "bg-brand-red/10 text-brand-red"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/5">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3">
                    <img
                      src={
                        user?.avatarUrl ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                      }
                      alt={user?.userName}
                      className="w-10 h-10 rounded-full border-2 border-brand-red object-cover"
                    />
                    <div>
                      <div className="text-white font-black text-sm uppercase tracking-wide">
                        {user?.userName}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 text-zinc-300 hover:bg-zinc-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-brand-red hover:bg-red-700 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
