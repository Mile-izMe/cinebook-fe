import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: () => userApi.getStats(),
    staleTime: 60 * 60 * 1000,
  });
};
