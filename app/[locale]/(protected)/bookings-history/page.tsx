import { BookingHistoryComponent } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking History | CINEBOOK",
  description: "Booking history of a user.",
};

function BookingsHistory() {
  return <BookingHistoryComponent />;
}

export default BookingsHistory;
