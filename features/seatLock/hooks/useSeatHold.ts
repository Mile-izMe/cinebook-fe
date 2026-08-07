import { useCallback, useEffect, useRef, useState } from "react";
import { useSeatExtend } from "./useSeatExtend";
import { useSeatUnlock } from "./useSeatUnlock";
import { ApiErrorResponse } from "@/types";

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
  const [timeLeft, setTimeLeft] = useState<number>(maxHoldSeconds);
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
    const interval = setInterval(() => {
      extendMutation.mutate(
        { showtimeId, seatTokens: tokensRef.current },
        {
          onError: (err) => {
            if (err.message === "Maximum time holding seat reached") {
              setTimeLeft(0);
              clearInterval(interval);
            }
          },
        },
      );
    }, 240000);
    return () => clearInterval(interval);
  }, [showtimeId, extendMutation]);

  // ----------------------------------------------------
  // 3. CLEANUP (Auto Unlock when User close Tab or Back)
  // ----------------------------------------------------
  const releaseSeats = useCallback(async () => {
    if (Object.keys(tokensRef.current).length === 0) return;
    try {
      await unlockMutation.mutateAsync({
        showtimeId,
        seatTokens: tokensRef.current,
      });
      // Clear token
      tokensRef.current = {};
    } catch (error) {
      console.error("Error releasing chair:", error);
    }
  }, [showtimeId, unlockMutation]);

  useEffect(() => {
    // Event user close tab/explorer (Window Unload)
    const handleBeforeUnload = () => {
      releaseSeats();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Event component cancel (User click Back or navigate)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      releaseSeats();
    };
  }, [releaseSeats]);

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
