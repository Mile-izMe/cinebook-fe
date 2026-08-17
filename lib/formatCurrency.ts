export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount == null || isNaN(amount)) return "0 đ";

  return amount.toLocaleString("vi-VN") + " VNĐ";
};
