"use client";

import { useSeatHold } from "@/features";
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
import { ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import BookingBreadcrumb from "../BookingBreadcrumb";
import BookingSummary from "../BookingSummary";
import CheckoutOption from "./CheckoutOption";

interface CheckoutSelectionProps {
  showtimeId: string;
}

function CheckoutSelection({ showtimeId }: CheckoutSelectionProps) {
  const router = useRouter();
  const checkoutForm = useTranslations("checkout");
  const checkoutSchema = bookingSchema(checkoutForm);

  const selectedSeats = useBookingStore((s) => s.selectedSeats);
  const seatTokens = useBookingStore((s) => s.seatTokens);
  const clearSeats = useBookingStore((s) => s.clearSeats);

  const user = useAuthStore((u) => u.user);
  const status = useAuthStore((u) => u.status);

  const { data } = useSeatMap(showtimeId);
  const { mutateAsync: createBooking } = useCreateBooking();

  const isAuthenticated = status === "authenticated";
  const seatMap = data?.data;

  const [checkoutMode, setCheckoutMode] = useState<"guest" | "login">("guest");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "momo" | "atm">(
    "bank",
  );

  const { formattedTime, isExpired, releaseSeats } = useSeatHold({
    showtimeId,
    seatTokens,
  });

  const handleBackToSeats = async () => {
    await releaseSeats();
    clearSeats();
    router.push(`/seat/${showtimeId}`);
  };

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

  const watchedEmail = useWatch({
    control: form.control,
    name: "guestEmail",
  });

  const watchedPhone = useWatch({
    control: form.control,
    name: "guestPhone",
  });

  const isGuestInfoValid = isAuthenticated
    ? true
    : Boolean(watchedEmail?.trim() && watchedPhone?.trim());

  const isDisableNext = isSubmitting || isExpired || !isGuestInfoValid;

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
      clearSeats();
      router.push(`/bookings/successs`);
    } catch {}
  };

  if (isExpired) {
    return (
      <div className="grow flex flex-col items-center justify-center bg-brand-black text-center py-20 px-4">
        <ShieldAlert className="w-12 h-12 text-brand-red mb-3 animate-bounce" />
        <h2 className="text-sm font-black text-white mb-2 uppercase tracking-widest">
          Checkout Session Expired
        </h2>
        <p className="text-zinc-500 text-xs max-w-sm mb-6 leading-relaxed">
          You do not have any active seat reservations selected. Please return
          home to book your tickets.
        </p>
        <Link
          href="/"
          className="bg-brand-red hover:bg-red-700 text-white font-black py-4 px-8 rounded-xl text-xs uppercase tracking-widest transition-all"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(handleCreateBooking)}
        className="grow bg-brand-black pb-20"
      >
        <div className="bg-brand-red text-white text-center text-xs font-black uppercase tracking-widest py-2 sticky top-0 z-50">
          Finish payment in: {formattedTime}
        </div>

        <BookingBreadcrumb
          showtimeId={showtimeId}
          currentStep={3}
          onBackClick={handleBackToSeats}
        />
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
              nextText="PAY NOW"
              isNextLoading={isSubmitting}
              disableNext={isDisableNext}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default CheckoutSelection;
