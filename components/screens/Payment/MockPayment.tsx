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
      <div className="p-10 text-center text-red-500 font-bold">
        Error: Payment ID not found in URL
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header Cổng Thanh Toán */}
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-white text-2xl font-bold">Cinebook Pay</h1>
          <p className="text-blue-200 text-sm mt-1">
            Môi trường thử nghiệm (Sandbox)
          </p>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="p-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <span className="text-gray-500">Mã giao dịch (Payment ID)</span>
            <span
              className="font-mono text-sm font-semibold truncate w-32"
              title={paymentId}
            >
              {paymentId.substring(0, 8)}...
            </span>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-gray-700 font-medium text-lg">
              Tổng thanh toán:
            </span>
            <span className="text-2xl font-bold text-red-500">
              {formatCurrency(amount)}
            </span>
          </div>

          {/* Các nút chức năng (Chỉ hiện khi chưa thanh toán xong) */}
          {paymentStatus === "IDLE" && !isLoading && (
            <div className="space-y-4">
              <button
                onClick={() => handlePayment(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md"
              >
                <svg
                  className="w-6 h-6"
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
                className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-bold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-6 h-6"
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

              <p className="text-xs text-center text-gray-400 mt-4 italic">
                Lưu ý: Các nút này chỉ có trên môi trường DEV để thay thế cho
                luồng Webhook của MoMo/VNPay.
              </p>
            </div>
          )}

          {/* Trạng thái Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium animate-pulse">
                Đang xử lý giao dịch...
              </p>
            </div>
          )}

          {/* Kết quả trả về */}
          {paymentStatus === "SUCCESS" && (
            <div className="text-center py-6 bg-green-50 rounded-xl border border-green-200">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
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
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Thanh toán thành công!
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Đang chuyển hướng về rạp phim...
              </p>
            </div>
          )}

          {paymentStatus === "FAILED" && (
            <div className="text-center py-6 bg-red-50 rounded-xl border border-red-200">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
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
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Giao dịch bị từ chối
              </h3>
              <p className="text-sm text-gray-500 mt-2">
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
