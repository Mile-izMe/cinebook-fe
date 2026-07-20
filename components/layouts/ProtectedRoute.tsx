"use client";

import { useAuthStore } from "@/features/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [status, pathname, router]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Đang tải...
      </div>
    );
  }
  if (status === "unauthenticated") {
    return null; 
  }
  return <>{children}</>;
}
