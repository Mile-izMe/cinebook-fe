import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { CallbackPaymentInput, CreatePaymentInput } from "../validations";
import { PaymentResponse } from "../types";

export const paymentApi = {
  createPayment: (
    bookingId: string,
    data: CreatePaymentInput,
  ): Promise<ApiResponse<PaymentResponse>> =>
    api.post(`/api/bookings/${bookingId}/payment`, data),

  // ========== CALLBACK (FOR GATEWAY TO CALL) =============
  mockCallback: (data: CallbackPaymentInput): Promise<void> =>
    api.post("/api/payments/callback", data),

  // =============== MOCK SUCCESS / FAILED =================
  mockSuccess: (paymentId: string): Promise<void> =>
    api.post(`/api/payments/${paymentId}/mock-success`),

  mockFailed: (paymentId: string): Promise<void> =>
    api.post(`/api/payments/${paymentId}/mock-failed`),
};
