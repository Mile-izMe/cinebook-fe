/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface PaymentRadioItemProps {
  value: string;
  currentValue: string;
  onChange: (value: any) => void;
  title: string;
  description: string;
  recommended?: boolean;
}

export default function PaymentRadioItem({
  value,
  currentValue,
  onChange,
  title,
  description,
  recommended = false,
}: PaymentRadioItemProps) {
  const isSelected = currentValue === value;

  return (
    <label
      className={`block cursor-pointer border rounded-xl p-4 transition-all ${
        isSelected
          ? "bg-brand-red/10 border-brand-red"
          : "bg-black border-white/5 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="radio"
          name="payment"
          checked={isSelected}
          onChange={() => onChange(value)}
          className="hidden"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-brand-red" : "border-zinc-600"
          }`}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 bg-brand-red rounded-full" />
          )}
        </div>
        <div>
          <p className="text-white font-black text-sm flex items-center gap-2">
            {title}
            {recommended && (
              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded uppercase tracking-widest">
                Recommended
              </span>
            )}
          </p>
          <p className="text-zinc-500 text-xs mt-1">{description}</p>
        </div>
      </div>
    </label>
  );
}
