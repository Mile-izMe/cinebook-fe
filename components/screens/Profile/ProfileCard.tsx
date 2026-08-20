"use client";

import { User } from "@/features";
import { Camera, Loader2, Mail, Phone, Save, UserIcon } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200";

interface ProfileCardProps {
  user: User | null;
  isEditing: boolean;
  setIsEditing: (boolean: boolean) => void;
  isLoading: boolean;
  avatarFile: File | null;
  onAvatarChange: (file: File | null) => void;
}

function ProfileCard({
  user,
  isEditing,
  setIsEditing,
  isLoading,
  avatarFile,
  onAvatarChange,
}: ProfileCardProps) {
  const {
    register,
    reset,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preview - fallback to current avatar if not selected
  const previewUrl = useMemo(() => {
    if (avatarFile) return URL.createObjectURL(avatarFile);
    return user?.avatarUrl || DEFAULT_AVATAR;
  }, [avatarFile, user?.avatarUrl]);

  useEffect(() => {
    return () => {
      if (avatarFile) URL.revokeObjectURL(previewUrl);
    };
  }, [avatarFile, previewUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only accept JPEG, PNG or WEBP");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Maximum file size is 5MB");
      return;
    }

    onAvatarChange(file);
  };

  const handleCancel = () => {
    reset({
      userName: user?.userName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatarUrl: user?.avatarUrl || "",
    });
    onAvatarChange(null);
    setIsEditing(false);
  };

  return (
    <div className="lg:col-span-2">
      {isEditing ? (
        <div className="bg-brand-dark border border-white/5 p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="pb-4 border-b border-white/5">
            <h3 className="font-black text-white text-xs uppercase tracking-widest">
              Edit Personal Profile
            </h3>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-1">
              Keep your email, name, and contact details accurate to prevent
              ticketing issues.
            </p>
          </div>

          {/* Avatar picker */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Avatar preview"
                className="w-20 h-20 rounded-full border-2 border-brand-red object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-brand-red hover:bg-red-700 text-white rounded-full p-1.5 border-2 border-brand-dark transition-colors cursor-pointer"
                title="Doi anh dai dien"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
              JPEG, PNG hoac WEBP. Toi da 5MB.
              {avatarFile && (
                <p className="text-brand-red mt-1 normal-case font-semibold">
                  Da chon: {avatarFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Grid Name/Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
                <input
                  type="text"
                  placeholder="Your user name"
                  {...register("userName")}
                  className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 uppercase font-semibold"
                />
              </div>
              {errors.userName && (
                <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                  {errors.userName.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
                <input
                  type="email"
                  placeholder="Your email address"
                  {...register("email")}
                  className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 uppercase font-semibold"
                />
              </div>
              {errors.email && (
                <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Grid Phone/Avatar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
                <input
                  type="tel"
                  placeholder="Your phone number"
                  {...register("phone")}
                  className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-mono font-semibold"
                />
              </div>
              {errors.phone && (
                <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                  {errors.phone.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-3 text-[10px] font-black uppercase tracking-widest bg-brand-black border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 text-[10px] bg-brand-red hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-brand-dark border border-white/5 p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="pb-4 border-b border-white/5 flex justify-between items-center">
            <div>
              <h3 className="font-black text-white text-xs uppercase tracking-widest">
                Profile Overview
              </h3>
              <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-1">
                Verify your registered credential claims securely.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div className="space-y-1 bg-black p-4 rounded-xl border border-white/5">
                <span className="text-zinc-500 text-[12px] uppercase font-black tracking-widest">
                  Name
                </span>
                <p className="text-white font-black font-mono text-[13px] uppercase tracking-wider">
                  {user?.userName}
                </p>
              </div>
              <div className="space-y-1 bg-black p-4 rounded-xl border border-white/5">
                <span className="text-zinc-500 text-[12px] uppercase font-black tracking-widest">
                  Authorized Email
                </span>
                <p className="text-white font-black text-[13px] uppercase tracking-wider">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div className="space-y-1 bg-black p-4 rounded-xl border border-white/5">
                <span className="text-zinc-500 text-[12px] uppercase font-black tracking-widest">
                  Role
                </span>
                <p className="text-white font-black text-[13px] uppercase tracking-wider">
                  {user?.roleCode}
                </p>
              </div>
              <div className="space-y-1 bg-black p-4 rounded-xl border border-white/5">
                <span className="text-zinc-500 text-[12px] uppercase font-black tracking-widest">
                  Phone Verification
                </span>
                <p className="text-white font-black font-mono text-[13px] uppercase tracking-wider">
                  {user?.phone || "Not Verified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
