import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | CINEBOOK",
  description: "Đăng nhập để đặt vé xem phim và nhận nhiều ưu đãi hấp dẫn.",
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
