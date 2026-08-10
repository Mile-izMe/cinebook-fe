import { useEffect, useRef, useState } from "react";
import { useSeatExtend } from "./useSeatExtend";
import { useSeatUnlock } from "./useSeatUnlock";
import { useBookingStore } from "@/store";

interface UseSeatHoldProps {
  showtimeId: string;
  seatTokens: Record<string, string>; // Map<UUID, String>
  maxHoldSeconds?: number; // Default 15 mins = 900s
}

export const useSeatHold = ({
  showtimeId,
  seatTokens,
  maxHoldSeconds = 900,
}: UseSeatHoldProps) => {
  const maxExpiresAt = useBookingStore((s) => s.maxExpiresAt);
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!maxExpiresAt) return maxHoldSeconds;
    return Math.max(0, Math.floor((maxExpiresAt - Date.now()) / 1000));
  });
  const isExpired = timeLeft <= 0;
  const tokensRef = useRef(seatTokens);

  const extendMutation = useSeatExtend();
  const unlockMutation = useSeatUnlock();

  useEffect(() => {
    tokensRef.current = seatTokens;
  }, [seatTokens]);

  // ----------------------------------------------------
  // 1. COUNTDOWN TIMER
  // ----------------------------------------------------
  useEffect(() => {
    if (isExpired) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval); // Reach 0 stop
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isExpired]);

  // ----------------------------------------------------
  // 2. HEARTBEAT (Ping Server every 4 mins)
  // ----------------------------------------------------
  useEffect(() => {
    if (isExpired || Object.keys(tokensRef.current).length === 0) return;

    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      console.log(
        `[Heartbeat 💓] ${currentTime} - Sending request extend TTL...`,
      );

      extendMutation.mutate(
        { showtimeId, seatTokens: tokensRef.current },
        {
          onSuccess: () => {
            console.log(
              `[Heartbeat ✅] ${new Date().toLocaleTimeString()} - Gia hạn TTL trong Redis thành công (thêm 2 phút)!`,
            );
          },
          onError: (err) => {
            if (err.message === "Maximum time holding seat reached") {
              console.error(`[Heartbeat ❌] Error extending:`, err.message);
              setTimeLeft(0);
              clearInterval(interval);
            }
          },
        },
      );
    }, 60000);
    return () => clearInterval(interval);
  }, [showtimeId, extendMutation, isExpired]);

  // ----------------------------------------------------
  // 3. CLEANUP
  // ----------------------------------------------------
  const releaseSeats = async () => {
    if (Object.keys(tokensRef.current).length === 0) return;
    try {
      await unlockMutation.mutateAsync({
        showtimeId,
        seatTokens: tokensRef.current,
      });
      tokensRef.current = {};
    } catch (error) {
      console.error("Error releasing chair:", error);
    }
  };

  // ----------------------------------------------------
  // Helper: Format display remaining time (E.g: 14:59)
  // ----------------------------------------------------
  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  return {
    timeLeft,
    formattedTime,
    isExpired,
    releaseSeats,
  };
};
