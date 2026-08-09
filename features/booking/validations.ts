import { z } from "zod";

type MessageGetter = (key: string) => string;

export const bookingSchema = (t: MessageGetter) =>
  z.object({
    showtimeId: z.string().trim().min(1, t("showtimeId_required")),
    seatTokens: z
      .record(z.string(), z.string())
      .refine((val) => Object.keys(val).length > 0, {
        message: t("seatTokens_required"),
      }),
    guestEmail: z.string().optional(),
    guestPhone: z.string().optional(),
  });

export const bookingSchemaForGuest = (t: MessageGetter) =>
  z.object({
    bookingCode: z.string().trim().min(1, t("bookingCode_required")),
    email: z.email().nonempty(t("email_required")),
  });

export type CreateBookingInput = z.infer<ReturnType<typeof bookingSchema>>;
export type BookingInputForGuest = z.infer<
  ReturnType<typeof bookingSchemaForGuest>
>;
