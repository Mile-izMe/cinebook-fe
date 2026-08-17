"use client";

import { useGetBookingStatus } from "@/features";
import { useBookingStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

function ReturnCheckBookingStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const hasHandled = useRef(false);
  const queryClient = useQueryClient();
  const clearStore = useBookingStore((s) => s.clearStore);

  const { data: statusResponse } = useGetBookingStatus(bookingId!);

  useEffect(() => {
    if (!statusResponse || hasHandled.current) return;

    const status = statusResponse;

    if (status === "PAID") {
      hasHandled.current = true;

      // Delete cache for other pages to get new data
      queryClient.invalidateQueries({ queryKey: ["seat-map"] });
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });

      clearStore();

      toast.success("Payment Success!");
      router.push(`/bookings/success?bookingId=${bookingId}`);
    } else if (status === "FAILED" || status === "CANCELLED") {
      hasHandled.current = true;

      toast.error("Transaction failed or cancelled.");
      router.push(`/bookings/failed?bookingId=${bookingId}`);
    }
  }, [statusResponse, queryClient, router, clearStore, bookingId]);

  if (!bookingId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black text-white px-4 text-center">
        <h2 className="text-xl font-bold text-brand-red mb-2">Lỗi truy cập</h2>
        <p className="text-gray-400">
          Không tìm thấy mã giao dịch. Vui lòng kiểm tra lại đơn hàng của bạn.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black text-white px-4">
      <div className="bg-zinc-900/50 p-10 rounded-2xl border border-zinc-800 flex flex-col items-center text-center max-w-sm w-full shadow-2xl backdrop-blur-sm">
        <Loader2 className="h-12 w-12 text-brand-red animate-spin mb-6" />
        <h1 className="text-xl font-black uppercase tracking-widest text-white mb-2">
          Đang xác nhận
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Chúng tôi đang kiểm tra kết quả giao dịch từ cổng thanh toán. Vui lòng
          giữ nguyên trang này trong giây lát...
        </p>
      </div>
    </div>
  );
}

export default ReturnCheckBookingStatus;
