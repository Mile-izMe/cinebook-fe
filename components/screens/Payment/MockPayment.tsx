"use client";

import { useMockPaymentFailed } from "@/features/payment/hooks/useMockPaymentFailed";
import { useMockPaymentSuccess } from "@/features/payment/hooks/useMockPaymentSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function MockPayment() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentId = searchParams.get("paymentId");
  const bookingId = searchParams.get("bookingId");
  const amountStr = searchParams.get("amount") || "0";
  const amount = parseInt(amountStr, 10);

  const { mutateAsync: triggerMockSuccess } = useMockPaymentSuccess();
  const { mutateAsync: triggerMockFailed } = useMockPaymentFailed();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "IDLE" | "SUCCESS" | "FAILED"
  >("IDLE");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);
  };

  const handlePayment = async (isSuccess: boolean) => {
    if (!paymentId || !bookingId) {
      toast.error("Missing transaction information!");
      return;
    }

    setIsLoading(true);

    try {
      if (isSuccess) {
        await triggerMockSuccess(paymentId);
      } else {
        await triggerMockFailed(paymentId);
      }

      setTimeout(() => {
        setIsLoading(false);
        setPaymentStatus(isSuccess ? "SUCCESS" : "FAILED");

        setTimeout(() => {
          toast.info("Routing back to website");
          router.push(`/bookings/return?bookingId=${bookingId}`);
        }, 1500);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gọi API giả lập!");
      setIsLoading(false);
    }
  };

  if (!paymentId || !bookingId) {
    return (
      <div className="grow min-h-screen bg-brand-black p-10 text-center text-brand-red font-bold">
        Error: Payment ID not found in URL
      </div>
    );
  }

  return (
    <div className="grow min-h-screen bg-brand-black text-zinc-300 flex items-center justify-center px-4 py-12">
      <div className="bg-brand-dark border border-white/5 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header Cổng Thanh Toán */}
        <div className="bg-black border-b border-white/5 p-6 text-center">
          <h1 className="text-white text-2xl font-black uppercase tracking-widest">Cinebook Pay</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Môi trường thử nghiệm (Sandbox)
          </p>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="p-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <span className="text-zinc-400">Mã giao dịch (Payment ID)</span>
            <span
              className="font-mono text-white text-sm font-semibold truncate w-32"
              title={paymentId}
            >
              {paymentId.substring(0, 8)}...
            </span>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-zinc-300 font-medium text-lg">
              Tổng thanh toán:
            </span>
            <span className="text-2xl font-black text-brand-red">
              {formatCurrency(amount)}
            </span>
          </div>

          {/* Các nút chức năng (Chỉ hiện khi chưa thanh toán xong) */}
          {paymentStatus === "IDLE" && !isLoading && (
            <div className="space-y-4">
              <button
                onClick={() => handlePayment(true)}
                className="w-full bg-brand-red hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Giả lập Thanh toán THÀNH CÔNG
              </button>

              <button
                onClick={() => handlePayment(false)}
                className="w-full bg-black border border-white/10 hover:bg-zinc-800 hover:border-white/20 text-zinc-300 hover:text-white font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Giả lập Thanh toán THẤT BẠI
              </button>

              <p className="text-xs text-center text-zinc-500 mt-4 italic">
                Lưu ý: Các nút này chỉ có trên môi trường DEV để thay thế cho
                luồng Webhook của MoMo/VNPay.
              </p>
            </div>
          )}

          {/* Trạng thái Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/10 border-t-brand-red"></div>
              <p className="mt-4 text-zinc-300 font-medium animate-pulse">
                Đang xử lý giao dịch...
              </p>
            </div>
          )}

          {/* Kết quả trả về */}
          {paymentStatus === "SUCCESS" && (
            <div className="text-center py-6 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/20 mb-4">
                <svg
                  className="h-6 w-6 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-white">
                Thanh toán thành công!
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Đang chuyển hướng về rạp phim...
              </p>
            </div>
          )}

          {paymentStatus === "FAILED" && (
            <div className="text-center py-6 bg-brand-red/10 rounded-xl border border-brand-red/20">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-red/20 mb-4">
                <svg
                  className="h-6 w-6 text-brand-red"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-white">
                Giao dịch bị từ chối
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Đang chuyển hướng để thử lại...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MockPayment;
