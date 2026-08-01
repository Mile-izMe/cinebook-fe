import ShowtimeSelection from "@/components/screens/BookingStep/Showtime/ShowtimeSelection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showtimes | CINEBOOK",
  description: "All informations about showtimes, cinemas and movies.",
};

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function ShowtimePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main>
      <ShowtimeSelection movieId={id} />
    </main>
  );
}
