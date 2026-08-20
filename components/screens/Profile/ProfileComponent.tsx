"use client";

import {
  UpdateProfileInput,
  updateProfileSchema,
  uploadAvatar,
  useGetStats,
  usePresignUrl,
  useUpdateProfile,
} from "@/features";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import ProfileCard from "./ProfileCard";
import ProfileHeader from "./ProfileHeader";
import ProfileStaticColumn from "./ProfileStaticColumn";

function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const user = useAuthStore((a) => a.user);

  // ================= Stats =================
  const { data } = useGetStats();
  const userStats = data?.data;

  // ================= Storage =================
  const { mutateAsync: getPresignUrl } = usePresignUrl();

  // ================= Profile ===============
  const profileSchema = updateProfileSchema();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: user?.userName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatarUrl: user?.avatarUrl || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, dirtyFields },
  } = form;

  const { mutateAsync: updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (!user) return;

    reset({
      userName: user.userName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      avatarUrl: user.avatarUrl ?? "",
    });
  }, [user, reset]);

  // ================= Submit =================
  const handleUpdateProfile = async (data: UpdateProfileInput) => {
    try {
      let avatarUrl = data.avatarUrl ?? undefined;

      // User selected a new avatar
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile, getPresignUrl);
      }

      // Only send change fields (dirtyFields)
      const payload: Partial<UpdateProfileInput> = {};
      if (dirtyFields.userName) payload.userName = data.userName;
      if (dirtyFields.email) payload.email = data.email;
      if (dirtyFields.phone) payload.phone = data.phone;
      if (avatarFile) payload.avatarUrl = avatarUrl;

      if (Object.keys(payload).length === 0) {
        toast.info("No changes to update!");
        setIsEditing(false);
        return;
      }

      await updateProfile(payload as UpdateProfileInput);

      setAvatarFile(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="grow bg-brand-black pb-20"
      >
        <ProfileHeader />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ProfileStaticColumn
            user={user}
            userStats={userStats}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
          />
          <ProfileCard
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isLoading={isSubmitting}
            avatarFile={avatarFile}
            onAvatarChange={setAvatarFile}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default ProfileComponent;
