import { BookingSuccess } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Success | CINEBOOK",
  description: "Booking success after payment webhook.",
};

function BookingSuccessPage() {
  return <BookingSuccess />;
}

export default BookingSuccessPage;
