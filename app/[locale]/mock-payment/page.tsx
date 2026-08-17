import { MockPayment } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mock Payment | CINEBOOK",
  description: "Payment Sandbox for Demo.",
};

function MockPaymentPage() {
  return <MockPayment />;
}

export default MockPaymentPage;
