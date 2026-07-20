"use client";

import { createLoginSchema, LoginInput, useLogin } from "@/features/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Film, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const [showForgot, setShowForgot] = useState(false);
  //   const [forgotEmail, setForgotEmail] = useState("");
  const authForm = useTranslations("auth");
  const authSchema = createLoginSchema(authForm);
  const { mutate: login } = useLogin();

  const form = useForm<LoginInput>({
    resolver: zodResolver(authSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const handleLogin = async (data: LoginInput) => {
    try {
      await login(data);
      // reset();
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
            Sign In to Your Account
          </h2>
          <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
            Unlock seat holds, virtual wallet ticketing, and premium discounts.
          </p>
        </div>

        {/* Forgot password view overlay */}
        {showForgot ? (
          //   <form onSubmit={handleForgotPassword} className="space-y-4">
          //     <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">
          //       Recover Your Password
          //     </h3>
          //     <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-black tracking-wider">
          //       Enter your email address below. We'll send you a recovery link to
          //       securely reset credentials.
          //     </p>
          //     <div className="space-y-2">
          //       <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
          //         Email Address
          //       </label>
          //       <input
          //         type="email"
          //         value={forgotEmail}
          //         onChange={(e) => setForgotEmail(e.target.value)}
          //         placeholder="name@example.com"
          //         className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-semibold uppercase tracking-wide"
          //       />
          //     </div>
          //     <div className="flex gap-3 pt-2">
          //       <button
          //         type="button"
          //         onClick={() => setShowForgot(false)}
          //         className="flex-1 py-3.5 bg-brand-black border border-white/5 text-zinc-300 hover:bg-zinc-800 font-black text-[10px] uppercase rounded-xl transition-all tracking-widest"
          //       >
          //         Cancel
          //       </button>
          //       <button
          //         type="submit"
          //         className="flex-1 py-3.5 bg-brand-red hover:bg-red-700 text-white font-black text-[10px] uppercase rounded-xl transition-all tracking-widest"
          //       >
          //         Send Link
          //       </button>
          //     </div>
          //   </form>
          <div>Handle after</div>
        ) : (
          /* Normal Login Form */
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email field */}
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
                    required: "Email address is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-semibold tracking-wide"
                />
              </div>
              {errors.email && (
                <p className="text-brand-red text-[9px] uppercase font-black tracking-widest mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-[10px] text-brand-red hover:text-red-450 font-black uppercase tracking-widest hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-700" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-red focus:border-brand-red text-white placeholder-zinc-700 font-semibold"
                />
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
              className="cursor-pointer w-full py-4 bg-brand-red hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl transition-all shadow-lg active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 tracking-widest"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Secondary CTA */}
            <div className="text-center pt-4 border-t border-white/5 text-[10px] uppercase font-black tracking-widest text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-brand-red hover:text-red-400 font-black uppercase tracking-widest hover:underline"
              >
                Create an Account
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default LoginForm;
