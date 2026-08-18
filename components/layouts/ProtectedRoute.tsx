"use client";

import { tokenStorage } from "@/lib";
import { useAuthStore } from "@/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const setStatus = useAuthStore((s) => s.setStatus);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "idle") {
      const token = tokenStorage.getAccessToken();
      if (token) {
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
      return;
    }

    if (status === "unauthenticated") {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [status, pathname, router, setStatus]);

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
