import { z } from "zod";

type MessageGetter = (key: string) => string;

export const paymentSchema = (t: MessageGetter) =>
  z.object({
    paymentMethod: z.string().min(1, t("payment_method_required")),
    guestEmail: z.string().optional(),
    guestPhone: z.string().optional(),
  });

export const callbackSchema = (t: MessageGetter) =>
  z.object({
    providerTransactionId: z
      .string()
      .min(1, t("provider_transaction_id_required")),
    amount: z.number().int().min(1, t("amount_required")),
    status: z.string().min(1, t("status_required")),
    timestamp: z.number().int().positive(),
    signature: z.string().nonempty(t("signature_required")),
  });

export type CreatePaymentInput = z.infer<ReturnType<typeof paymentSchema>>;
export type CallbackPaymentInput = z.infer<ReturnType<typeof callbackSchema>>;
