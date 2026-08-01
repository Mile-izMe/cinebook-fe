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
  console.log(id);

  return (
    <div>
      <div>This is booking seat page</div>
    </div>
  );
}
