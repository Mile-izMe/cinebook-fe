"use client";

import { useAuthStore } from "@/features/auth";
import {
  bookingSchema,
  CinemaSummary,
  CreateBookingInput,
  MovieSummary,
  useSeatMap,
} from "@/features/booking";
import { useCreateBooking } from "@/features/booking/hooks/useCreateBooking";
import { useBookingStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BookingBreadcrumb from "../BookingBreadcrumb";
import BookingSummary from "../BookingSummary";
import CheckoutOption from "./CheckoutOption";

interface CheckoutSelectionProps {
  showtimeId: string;
}

function CheckoutSelection({ showtimeId }: CheckoutSelectionProps) {
  const checkoutForm = useTranslations("checkout");
  const checkoutSchema = bookingSchema(checkoutForm);
  const selectedSeats = useBookingStore((s) => s.selectedSeats);

  const { user, status } = useAuthStore();
  const { data } = useSeatMap(showtimeId);
  const { mutate: createBooking } = useCreateBooking();

  const isAuthenticated = status === "authenticated";
  const seatMap = data?.data;
  const [checkoutMode, setCheckoutMode] = useState<"guest" | "login">("guest");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "momo" | "atm">(
    "bank",
  );

  const form = useForm<CreateBookingInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      showtimeId: showtimeId,
      seatTokens: seatTokens || {},
      guestEmail: user?.email || "",
      guestPhone: user?.phone || "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (isAuthenticated && user) {
      form.setValue("guestEmail", user.email || "");
      form.setValue("guestPhone", user.phone || "");
    }
  }, [isAuthenticated, user, form]);

  if (!seatMap) return null;
  const movieData: MovieSummary = seatMap.movie;
  const cinemaData: CinemaSummary = seatMap.cinema;

  const handleCreateBooking = async (data: CreateBookingInput) => {
    try {
      await createBooking(data);
    } catch {}
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(handleCreateBooking)}
        className="grow bg-brand-black pb-20"
      >
        <BookingBreadcrumb showtimeId={showtimeId} currentStep={3} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <CheckoutOption
              user={user}
              isAuthenticated={isAuthenticated}
              checkoutMode={checkoutMode}
              setCheckoutMode={setCheckoutMode}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            <BookingSummary
              movieSummary={movieData}
              cinemaSummary={cinemaData}
              selectedSeats={selectedSeats}
              onNext={handleSubmit(handleCreateBooking)}
              nextText="Go to Checkout"
              disableNext={isSubmitting}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default CheckoutSelection;
