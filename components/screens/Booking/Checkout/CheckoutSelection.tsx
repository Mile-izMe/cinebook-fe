"use client";

import { useBookingStore } from "@/store";
import React from "react";

function CheckoutSelection() {
  const showtimeId = useBookingStore((state) => state.showtimeId);
  // console.log(showtimeId);

  return (
    <div>
      <div>CheckoutSelection</div>
    </div>
  );
}

export default CheckoutSelection;
