import { CreditCard } from "lucide-react";
import { useFormContext } from "react-hook-form";
import CardSimulation from "./CardSimulation";
import PaymentRadioItem from "./PaymentRadioItem";

interface PaymentMethodSelectorProps {
  paymentMethod: "bank" | "momo" | "atm";
  setPaymentMethod: (method: "bank" | "momo" | "atm") => void;
  finalPrice?: number;
}

function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  finalPrice = 0,
}: PaymentMethodSelectorProps) {
  const { watch } = useFormContext();

  const watchedCardNumber = watch("cardNumber");
  const watchedCardHolder = watch("cardHolder");
  const watchedExpiry = watch("expiryDate");

  return (
    <div className="bg-brand-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl text-zinc-300">
      <div className="bg-black p-5 border-b border-white/5">
        <h3 className="font-black text-xs text-white tracking-widest uppercase flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-brand-red" />
          <span>Payment Method</span>
        </h3>
      </div>

      <div className="p-6 space-y-3">
        <PaymentRadioItem
          value="bank"
          currentValue={paymentMethod}
          onChange={setPaymentMethod}
          title="Bank Transfer / VietQR"
          description="Automatic ticket generation within 30s"
          recommended={true}
        />

        <PaymentRadioItem
          value="momo"
          currentValue={paymentMethod}
          onChange={setPaymentMethod}
          title="MoMo E-Wallet"
          description="Pay quickly via MoMo app"
        />

        <PaymentRadioItem
          value="atm"
          currentValue={paymentMethod}
          onChange={setPaymentMethod}
          title="ATM / Credit Card"
          description="Visa, Mastercard, JCB, Domestic ATM"
        />

        {paymentMethod === "atm" && (
          <CardSimulation
            watchedCardNumber={watchedCardNumber}
            watchedCardHolder={watchedCardHolder}
            watchedExpiry={watchedExpiry}
            finalPrice={finalPrice}
          />
        )}
      </div>
    </div>
  );
}

export default PaymentMethodSelector;
