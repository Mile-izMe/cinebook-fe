"use client";
import { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CountdownTimerProps {
  initialMinutes?: number;
  onExpire?: () => void;
}

export default function CountdownTimer({
  initialMinutes = 10,
  onExpire,
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onExpire]);

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = secondsLeft < 120; // less than 2 minutes

  return (
    <AnimatePresence>
      <div
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-md transition-colors ${
          isLowTime
            ? "bg-rose-950/20 border-rose-800 text-rose-400 animate-pulse"
            : "bg-zinc-900/60 border-zinc-800 text-zinc-300"
        }`}
      >
        <Clock
          className={`w-4 h-4 ${isLowTime ? "text-rose-500" : "text-red-500"}`}
        />
        <div className="text-xs font-semibold">
          <span>Seats held for:</span>{" "}
          <span className="font-mono text-sm font-bold tracking-wider">
            {formatTime()}
          </span>
        </div>
        {isLowTime && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden sm:flex items-center gap-1 text-[10px] uppercase font-bold text-rose-500"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Hurry!</span>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
