import { useMutation } from "@tanstack/react-query";
import { storageApi } from "../api";
import { PresignUrlInput } from "../validations";

export const usePresignUrl = () => {
  return useMutation({
    mutationFn: (data: PresignUrlInput) => storageApi.getPresignUrl(data),
  });
};
