import { CheckoutSelection } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | CINEBOOK",
  description: "Checkout to receive ticket for the movie.",
};

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main>
      <CheckoutSelection showtimeId={id} />
    </main>
  );
}
