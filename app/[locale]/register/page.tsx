import RegisterForm from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | CINEBOOK",
  description: "Tài khoản thử nghiệm cho dự án học tập CineBook; đặt vé và thanh toán giả lập.",
};

function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}

export default RegisterPage;
