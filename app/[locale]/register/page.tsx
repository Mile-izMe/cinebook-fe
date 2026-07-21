import RegisterForm from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | CINEBOOK",
  description: "Đăng ký để đặt vé xem phim và nhận nhiều ưu đãi hấp dẫn.",
};

function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}

export default RegisterPage;
