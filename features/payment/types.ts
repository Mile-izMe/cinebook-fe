export interface PaymentResponse {
  paymentId: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  paymentUrl: string;
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}
