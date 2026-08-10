import { UserType } from "@/features/auth";
import PaymentMethodSelector from "./PaymentMethodSelector";
import TicketReceiver from "./TicketReceiver";

interface CheckoutOptionProps {
  isAuthenticated: boolean;
  user: UserType | null;
  checkoutMode: "guest" | "login";
  setCheckoutMode: (mode: "guest" | "login") => void;
  paymentMethod: "bank" | "momo" | "atm";
  setPaymentMethod: (method: "bank" | "momo" | "atm") => void;
}

export default function CheckoutOption({
  isAuthenticated,
  user,
  checkoutMode,
  setCheckoutMode,
  paymentMethod,
  setPaymentMethod,
}: CheckoutOptionProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* BOX 1: TICKET RECEIVER INFOR */}
      <TicketReceiver
        isAuthenticated={isAuthenticated}
        user={user}
        checkoutMode={checkoutMode}
        setCheckoutMode={setCheckoutMode}
      />

      {/* BOX 2: PAYMENT METHOD */}
      <PaymentMethodSelector
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </div>
  );
}
