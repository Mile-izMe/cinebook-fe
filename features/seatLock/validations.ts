import { z } from "zod";

type MessageGetter = (key: string) => string;

export const SeatLockSchema = (t: MessageGetter) =>
  z.object({
    showtimeId: z.string().trim().min(1, t("showtimeId_required")),
    seatIds: z.string().array().nonempty(t("seatIds_required")),
  });

export const SeatUnlockSchema = (t: MessageGetter) =>
  z.object({
    showtimeId: z.string().trim().min(1, t("showtimeId_required")),
    seatTokens: z
      .record(z.string(), z.string())
      .refine((val) => Object.keys(val).length > 0, {
        message: t("seatTokens_required"),
      }),
  });

export type SeatLockingInput = z.infer<ReturnType<typeof SeatLockSchema>>;
export type SeatUnlockingInput = z.infer<ReturnType<typeof SeatUnlockSchema>>;
export type SeatExtendInput = z.infer<ReturnType<typeof SeatUnlockSchema>>;
