import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | CINEBOOK",
  description: "Tài khoản thử nghiệm cho dự án học tập CineBook; đặt vé và thanh toán giả lập.",
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
