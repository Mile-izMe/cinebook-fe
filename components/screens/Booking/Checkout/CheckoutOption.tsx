import { UserType } from "@/features/auth";
import { CreditCard } from "lucide-react";
import TicketReceiver from "./TicketReceiver";

interface CheckoutOptionProps {
  isAuthenticated: boolean;
  user: UserType | null;
  checkoutMode: "guest" | "login";
  setCheckoutMode: (mode: "guest" | "login") => void;
  paymentMethod: "bank" | "momo" | "atm";
  setPaymentMethod: (method: "bank" | "momo" | "atm") => void;
}

export default function CheckoutOption({
  isAuthenticated,
  user,
  checkoutMode,
  setCheckoutMode,
  paymentMethod,
  setPaymentMethod,
}: CheckoutOptionProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* BOX 1: TICKET RECEIVER INFOR */}
      <TicketReceiver
        isAuthenticated={isAuthenticated}
        user={user}
        checkoutMode={checkoutMode}
        setCheckoutMode={setCheckoutMode}
      />

      {/* BOX 2: PAYMENT METHOD */}
      <div className="bg-brand-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl text-zinc-300">
        <div className="bg-black p-5 border-b border-white/5">
          <h3 className="font-black text-xs text-white tracking-widest uppercase flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-red" />
            <span>Payment Method</span>
          </h3>
        </div>

        <div className="p-6 space-y-3">
          {/* Option 1: Transfer (Mostly) */}
          <label
            className={`block cursor-pointer border rounded-xl p-4 transition-all ${paymentMethod === "bank" ? "bg-brand-red/10 border-brand-red" : "bg-black border-white/5 hover:border-white/20"}`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bank" ? "border-brand-red" : "border-zinc-600"}`}
              >
                {paymentMethod === "bank" && (
                  <div className="w-2.5 h-2.5 bg-brand-red rounded-full" />
                )}
              </div>
              <div>
                <p className="text-white font-black text-sm flex items-center gap-2">
                  Bank Transfer / VietQR
                  <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded uppercase tracking-widest">
                    Recommended
                  </span>
                </p>
                <p className="text-zinc-500 text-xs mt-1">
                  Automatic ticket generation within 30s
                </p>
              </div>
            </div>
          </label>

          {/* Option 2: MoMo */}
          <label
            className={`block cursor-pointer border rounded-xl p-4 transition-all ${paymentMethod === "momo" ? "bg-brand-red/10 border-brand-red" : "bg-black border-white/5 hover:border-white/20"}`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "momo"}
                onChange={() => setPaymentMethod("momo")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "momo" ? "border-brand-red" : "border-zinc-600"}`}
              >
                {paymentMethod === "momo" && (
                  <div className="w-2.5 h-2.5 bg-brand-red rounded-full" />
                )}
              </div>
              <div>
                <p className="text-white font-black text-sm">MoMo E-Wallet</p>
                <p className="text-zinc-500 text-xs mt-1">
                  Pay quickly via MoMo app
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
