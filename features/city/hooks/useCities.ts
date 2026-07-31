import { useQuery } from "@tanstack/react-query";
import { cityApi } from "../api";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => cityApi.getCities(),
    staleTime: 60 * 60 * 1000,
  });
};
