import { UserType } from "@/features/auth";
import { LogIn, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

interface CheckoutOptionProps {
  isAuthenticated: boolean;
  user: UserType | null;
}

export default function CheckoutOption({
  isAuthenticated,
  user,
}: CheckoutOptionProps) {
  const [checkoutMode, setCheckoutMode] = useState<"guest" | "login">("guest");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "momo" | "atm">(
    "bank",
  );

  return (
    <div className="lg:col-span-2 space-y-8">
      {/* TICKET RECEIVER INFOR */}
      <div className="bg-brand-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl text-zinc-300">
        {/* Header stub */}
        <div className="bg-black p-5 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-black text-xs text-white tracking-widest uppercase flex items-center gap-2">
            <User className="w-5 h-5 text-brand-red" />
            <span>Ticket Receiver</span>
          </h3>

          {!isAuthenticated && (
            <div className="flex bg-zinc-900 rounded-lg p-1">
              <button
                onClick={() => setCheckoutMode("guest")}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md transition-all ${
                  checkoutMode === "guest"
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Guest
              </button>
              <button
                onClick={() => setCheckoutMode("login")}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md transition-all ${
                  checkoutMode === "login"
                    ? "bg-brand-red text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Login
              </button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          {isAuthenticated ? (
            // UI FOR MEMBER
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-4 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-400 font-bold shrink-0">
                {user?.userName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="space-y-1">
                <p className="text-white font-black text-sm">
                  {user?.userName}
                </p>
                <p className="text-zinc-400 text-xs">
                  {user?.phone} • {user?.email}
                </p>
                {/* <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest pt-1">
                  ✓ Logged in securely
                </p> */}
              </div>
            </div>
          ) : checkoutMode === "guest" ? (
            // UI FOR GUEST
            <form className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-black border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      placeholder="0987 654 321"
                      className="w-full bg-black border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-black border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            // UI FOR AUTHEN
            <div className="text-center py-8">
              <LogIn className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h4 className="text-white font-black mb-2">Have an account?</h4>
              <p className="text-zinc-500 text-xs mb-6 max-w-sm mx-auto">
                Log in to accumulate points, manage your bookings, and checkout
                faster.
              </p>
              {/* Button trigger open Login Modal */}
              <button className="bg-brand-red hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-xl transition-all">
                Open Login Modal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
