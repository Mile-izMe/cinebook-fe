"use client";

import { SeatMapSeat } from "@/features/booking";
import { Accessibility } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface SeatComponentProps {
  seat: SeatMapSeat;
  isSelected: boolean;
  isLocked: boolean;
  onSelect: (seat: SeatMapSeat) => void;
}

function SeatComponent({
  seat,
  isSelected,
  isLocked,
  onSelect,
}: SeatComponentProps) {
  const t = useTranslations("screen.booking.seat");
  const isSold = seat.status === "SOLD";
  const isReserved = seat.status === "RESERVED";

  const isDisabled = isSold || isReserved || isLocked;

  const getSeatColor = () => {
    if (isSold)
      return "bg-zinc-800 text-zinc-600 border-zinc-900 cursor-not-allowed";

    if (isReserved || isLocked)
      return "bg-amber-700/30 text-amber-500 border-amber-900/50 cursor-not-allowed";

    if (isSelected)
      return "bg-red-600 text-white border-red-500 shadow-md shadow-red-900/40";

    if (seat.type === "VIP") {
      return "bg-purple-950/40 text-purple-400 border-purple-800/80 hover:bg-purple-900/55 hover:text-purple-300";
    }
    if (seat.type === "WHEELCHAIR") {
      return "bg-sky-950/40 text-sky-400 border-sky-800/80 hover:bg-sky-900/55 hover:text-sky-300";
    }

    return "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-850 hover:text-white";
  };

  const handleClick = () => {
    if (!isDisabled) onSelect(seat);
  };

  const getTooltipText = () => {
    if (isSold) return `${seat.label} - ${t("unavai")}`;
    if (isLocked) return `${seat.label} - ${t("tempo_hold")}`;
    if (isReserved) return `${seat.label} - ${t("reserved")}`;
    return `${seat.label} - ${seat.type} (${seat.price.toLocaleString("vi-VN")}đ)`;
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.15 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      onClick={handleClick}
      disabled={isDisabled}
      className={`relative flex items-center justify-center aspect-square w-8 sm:w-9 md:w-10 rounded-lg border text-[9px] sm:text-xs font-bold transition-all duration-150 focus:outline-none ${getSeatColor()}`}
      title={getTooltipText()}
    >
      {seat.type === "WHEELCHAIR" && !isSelected && !isDisabled ? (
        <Accessibility className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-80" />
      ) : (
        <span>{seat.label}</span>
      )}

      {(isSold || isLocked) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-45">
          <div className="w-full h-[1.5px] bg-zinc-600 rotate-45" />
        </div>
      )}
    </motion.button>
  );
}

export default SeatComponent;
