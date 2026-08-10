import { UserType } from "@/features/auth";
import { LogIn, Mail, Phone, User } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface TicketReceiverProps {
  isAuthenticated: boolean;
  user: UserType | null;
  checkoutMode: "guest" | "login";
  setCheckoutMode: (mode: "guest" | "login") => void;
}

function TicketReceiver({
  isAuthenticated,
  user,
  checkoutMode,
  setCheckoutMode,
}: TicketReceiverProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-brand-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl text-zinc-300">
      <div className="bg-black p-5 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-black text-xs text-white tracking-widest uppercase flex items-center gap-2">
          <User className="w-5 h-5 text-brand-red" />
          <span>Ticket Receiver</span>
        </h3>

        {!isAuthenticated && (
          <div className="flex bg-zinc-900 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setCheckoutMode("guest")}
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md transition-all ${
                checkoutMode === "guest"
                  ? "cursor-pointer bg-zinc-700 text-white"
                  : "cursor-pointer text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Guest
            </button>
            <button
              type="button"
              onClick={() => setCheckoutMode("login")}
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md transition-all ${
                checkoutMode === "login"
                  ? "cursor-pointer bg-brand-red text-white"
                  : "cursor-pointer text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Login
            </button>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {isAuthenticated ? (
          <div className="bg-emerald-950/20 border border-emerald-900/50 p-4 rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-400 font-bold shrink-0">
              {user?.userName?.charAt(0)?.toUpperCase()}
            </div>
            <div className="space-y-1">
              <p className="text-white font-black text-sm">{user?.userName}</p>
              <p className="text-zinc-400 text-xs">
                {user?.phone} • {user?.email}
              </p>
            </div>
          </div>
        ) : checkoutMode === "guest" ? (
          <form className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("guestEmail")}
                  className={`w-full bg-black border rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-colors ${
                    errors.guestEmail
                      ? "border-brand-red focus:border-brand-red"
                      : "border-white/5 focus:border-white/20"
                  }`}
                />
              </div>
              {errors.guestEmail && (
                <p className="text-brand-red text-[10px] mt-1 italic">
                  {errors.guestEmail.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="tel"
                  placeholder="0987 654 321"
                  {...register("guestPhone")}
                  className={`w-full bg-black border rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-colors ${
                    errors.guestPhone
                      ? "border-brand-red focus:border-brand-red"
                      : "border-white/5 focus:border-white/20"
                  }`}
                />
              </div>
              {errors.guestPhone && (
                <p className="text-brand-red text-[10px] mt-1 italic">
                  {errors.guestPhone.message as string}
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <LogIn className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h4 className="text-white font-black mb-2">Have an account?</h4>
            <p className="text-zinc-500 text-xs mb-6 max-w-sm mx-auto">
              Log in to accumulate points, manage your bookings, and checkout
              faster.
            </p>
            <button
              type="button"
              className="bg-brand-red hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-xl transition-all"
            >
              Open Login Modal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketReceiver;
