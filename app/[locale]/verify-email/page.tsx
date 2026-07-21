"use client";

import { authApi } from "@/features/auth";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [errorMessage, setErrorMessage] = useState(
    token ? "" : "Không tìm thấy mã xác thực.",
  );

  const isCalledRef = useRef(false);

  useEffect(() => {
    if (!token) return;

    if (isCalledRef.current) return;
    isCalledRef.current = true;

    const verifyToken = async () => {
      try {
        await authApi.verifyEmail(token);
        setStatus("success");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch {
        setStatus("error");
        setErrorMessage("Mã xác thực không hợp lệ hoặc đã hết hạn.");
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        {/* TRẠNG THÁI LOADING */}
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-16 w-16 animate-spin text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              Đang xác thực...
            </h2>
            <p className="mt-2 text-gray-500">Vui lòng đợi trong giây lát.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              Xác thực thành công!
            </h2>
            <p className="mt-2 text-gray-500">
              Tài khoản của bạn đã được kích hoạt. Bạn sẽ được chuyển hướng đến
              trang đăng nhập trong giây lát...
            </p>
            <Link
              href="/login"
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              Xác thực thất bại
            </h2>
            <p className="mt-2 text-gray-500">{errorMessage}</p>
            <div className="mt-6 flex w-full flex-col gap-3">
              <Link
                href="/login"
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Về trang đăng nhập
              </Link>
              <button
                onClick={() => alert("Chức năng gửi lại email")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Gửi lại email xác thực
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
