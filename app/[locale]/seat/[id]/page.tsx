import { SeatSelection } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seats | CINEBOOK",
  description: "Booking seats.",
};

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;

  return (
    <main>
      <SeatSelection showtimeId={id} />
    </main>
  );
}
