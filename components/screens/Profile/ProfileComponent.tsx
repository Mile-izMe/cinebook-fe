"use client";

import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileStaticColumn from "./ProfileStaticColumn";
import { FormProvider, useForm } from "react-hook-form";
import ProfileCard from "./ProfileCard";
import { useAuthStore } from "@/store";

function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAuthStore((a) => a.user);

  // const form = useForm<CreateBookingInput>({
  //   resolver: zodResolver(checkoutSchema),
  //   defaultValues: {
  //     showtimeId: showtimeId,
  //     seatTokens: seatTokens || {},
  //     guestEmail: user?.email || "",
  //     guestPhone: user?.phone || "",
  //   },
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = form;

  return (
    // <FormProvider {...form}>
    <form className="grow bg-brand-black pb-20">
      <ProfileHeader />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ProfileStaticColumn user={user} />
        <ProfileCard
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isLoading={false}
        />
      </div>
    </form>
    // </FormProvider>
  );
}

export default ProfileComponent;
