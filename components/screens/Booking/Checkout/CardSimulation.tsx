import { formatCardNumber } from "@/lib";
import { CreditCard, Landmark, Lock, ShieldCheck } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface CardSimulationProps {
  watchedCardNumber: string;
  watchedCardHolder: string;
  watchedExpiry: string;
  finalPrice: number;
}

function CardSimulation({
  watchedCardNumber,
  watchedCardHolder,
  watchedExpiry,
  finalPrice,
}: CardSimulationProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { onChange: onExpiryChange, ...expiryRegister } =
    register("expiryDate");

  const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    e.target.value = value;

    onExpiryChange(e);
  };

  return (
    <div className="pt-6 mt-4 border-t border-white/5 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Credit Card Graphic Simulator */}
      <div className="bg-gradient-to-br from-brand-red to-black border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl aspect-[1.58/1] max-w-sm mx-auto flex flex-col justify-between text-white tracking-widest select-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red rounded-full blur-[100px] opacity-25" />

        <div className="flex justify-between items-start">
          <Landmark className="w-8 h-8 opacity-75" />
          <span className="text-[9px] font-black italic tracking-widest uppercase opacity-75">
            CINEBOOK SECURE
          </span>
        </div>

        {/* Card Chip Simulation */}
        <div className="w-12 h-9 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-md shadow-inner border border-amber-500" />

        {/* Number */}
        <div className="text-lg sm:text-xl font-black font-mono py-2 select-all tracking-wider">
          {watchedCardNumber
            ? formatCardNumber(watchedCardNumber)
            : "•••• •••• •••• ••••"}
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-black text-zinc-400">
              Cardholder
            </span>
            <div className="text-sm font-black uppercase truncate max-w-[200px]">
              {watchedCardHolder ? watchedCardHolder.toUpperCase() : "JOHN DOE"}
            </div>
          </div>
          <div className="space-y-1 text-right shrink-0">
            <span className="text-[9px] uppercase font-black text-zinc-400">
              Expires
            </span>
            <div className="text-sm font-black font-mono">
              {watchedExpiry ? watchedExpiry : "MM/YY"}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Input Fields (Bỏ thẻ <form> đi, thay bằng <div>) */}
      <div className="bg-black/50 border border-white/5 p-6 sm:p-8 rounded-2xl space-y-6 shadow-inner">
        <div className="flex items-center gap-2 pb-4 border-b border-white/5">
          <Lock className="w-5 h-5 text-brand-red" />
          <div>
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              Payment Details
            </h3>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-1">
              All card transactions are processed securely using 256-bit
              encryption.
            </p>
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="e.g. JOHN DOE"
            {...register("cardHolder")}
            className={`w-full bg-black border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all text-white font-black tracking-wide placeholder-zinc-600 uppercase ${
              errors.cardHolder
                ? "border-brand-red"
                : "border-white/5 focus:border-brand-red"
            }`}
          />
          {errors.cardHolder && (
            <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
              {errors.cardHolder.message as string}
            </p>
          )}
        </div>

        {/* Card Number */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-600" />
            <input
              type="text"
              maxLength={16}
              placeholder="1234567812345678"
              {...register("cardNumber")}
              className={`w-full bg-black border rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all text-white font-mono placeholder-zinc-600 ${
                errors.cardNumber
                  ? "border-brand-red"
                  : "border-white/5 focus:border-brand-red"
              }`}
            />
          </div>
          {errors.cardNumber && (
            <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
              {errors.cardNumber.message as string}
            </p>
          )}
        </div>

        {/* Grid with Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Expiry Date
            </label>
            <input
              type="text"
              maxLength={5}
              placeholder="MM/YY"
              {...expiryRegister}
              onChange={handleExpiryInput}
              className={`w-full bg-black border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all text-white font-mono text-center placeholder-zinc-600 ${
                errors.expiryDate
                  ? "border-brand-red"
                  : "border-white/5 focus:border-brand-red"
              }`}
            />
            {errors.expiryDate && (
              <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                {errors.expiryDate.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              CVV Code
            </label>
            <input
              type="password"
              maxLength={3}
              placeholder="•••"
              {...register("cvv")}
              className={`w-full bg-black border rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red transition-all text-white font-mono text-center tracking-[0.3em] placeholder-zinc-600 ${
                errors.cvv
                  ? "border-brand-red"
                  : "border-white/5 focus:border-brand-red"
              }`}
            />
            {errors.cvv && (
              <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                {errors.cvv.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex gap-3 bg-black p-4 rounded-xl border border-white/5 text-[10px] uppercase font-black tracking-wider text-zinc-400 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <p>
            By clicking &quot;Confirm Booking&quot;, you authorize Starlight
            Cinema Group to charge your card{" "}
            <span className="text-white font-bold">
              {finalPrice.toLocaleString("vi-VN")}đ
            </span>{" "}
            for movie entry credentials. Tickets are strictly non-refundable
            once locked.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardSimulation;
