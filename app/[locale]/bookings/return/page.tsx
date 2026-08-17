import { ReturnCheckBookingStatus } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Payment | CINEBOOK",
  description: "Return to Website after Payment.",
};

function ReturnPage() {
  return <ReturnCheckBookingStatus />;
}

export default ReturnPage;
