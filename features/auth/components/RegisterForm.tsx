"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Film,
  Loader2,
  Lock,
  Mail,
  Phone,
  UserIcon,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks";
import { createRegisterSchema, RegisterInput } from "../validation";

function RegisterForm() {
  const authForm = useTranslations("auth");
  const authSchema = createRegisterSchema(authForm);
  const { mutate: registerUser } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(authSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleRegister = async (data: RegisterInput) => {
    try {
      await registerUser(data);
    } catch {}
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-brand-black px-4 py-20 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200')",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-brand-dark border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-red font-black text-2xl tracking-widest select-none"
          >
            <Film className="w-8 h-8 fill-brand-red animate-pulse" />
            <span>STARLIGHT</span>
          </Link>
          <h2 className="text-xs font-black text-white uppercase tracking-widest">
            Create an Account
          </h2>
          <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
            Unlock exclusive features and premium discounts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("userName", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-semibold uppercase tracking-wide"
              />
            </div>
            {errors.userName && (
              <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-semibold uppercase tracking-wide"
              />
            </div>
            {errors.email && (
              <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
              <input
                type="password"
                placeholder="0987654321"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 numbers",
                  },
                })}
                className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-semibold"
              />
            </div>
            {errors.phone && (
              <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-11 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4.5 h-4.5" />
                ) : (
                  <Eye className="w-4.5 h-4.5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-red hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl transition-all shadow-lg active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 tracking-widest"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </>
            )}
          </button>

          {/* Secondary CTA */}
          <div className="text-center pt-4 border-t border-white/5 text-[10px] uppercase font-black tracking-widest text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-red hover:text-red-400 font-black uppercase tracking-widest hover:underline"
            >
              Sign In Instead
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default RegisterForm;
