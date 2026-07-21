"use client";
import { AuthInitializer } from "@/features/auth";
import { ApiErrorResponse } from "@/types";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const tError = useTranslations("errors");
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Handle exception for POST, PUT, DELETE (useMutation)
        mutationCache: new MutationCache({
          onError: (error: unknown) => {
            const apiError = error as ApiErrorResponse;
            const errorCode = apiError?.errorCode || "DEFAULT";
            toast.error(tError(errorCode));
          },
        }),

        // OPTIONAL: for GET (useQuery)
        queryCache: new QueryCache({
          onError: (error: unknown) => {
            const apiError = error as ApiErrorResponse;
            const errorCode = apiError?.errorCode || "DEFAULT";
            toast.error(tError(errorCode));
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      {children}
    </QueryClientProvider>
  );
}
