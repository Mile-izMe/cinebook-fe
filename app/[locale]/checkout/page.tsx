import { CheckoutSelection } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | CINEBOOK",
  description: "Checkout to receive ticket for the movie.",
};

export default async function CheckoutPage() {
  return (
    <main>
      <CheckoutSelection />
    </main>
  );
}
