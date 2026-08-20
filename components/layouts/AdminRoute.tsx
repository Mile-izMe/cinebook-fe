"use client";

import { tokenStorage } from "@/lib";
import { useAuthStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
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
      return;
    }

    if (status === "authenticated" && user?.roleCode !== "ADMIN") {
      router.replace("/");
    }
  }, [status, user, pathname, router, setStatus]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated" || user?.roleCode !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
}
