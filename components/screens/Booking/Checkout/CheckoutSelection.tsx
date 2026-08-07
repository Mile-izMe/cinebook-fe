"use client";

import BookingBreadcrumb from "../BookingBreadcrumb";

interface CheckoutSelectionProps {
  showtimeId: string;
}

function CheckoutSelection({ showtimeId }: CheckoutSelectionProps) {
  console.log(showtimeId);

  return (
    <div className="grow bg-brand-black pb-20">
      <BookingBreadcrumb showtimeId={showtimeId} currentStep={3} />
    </div>
  );
}

export default CheckoutSelection;
