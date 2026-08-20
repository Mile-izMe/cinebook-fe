import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { PresignUrl } from "../types";
import { PresignUrlInput } from "../validations";

export const storageApi = {
  getPresignUrl: (data: PresignUrlInput): Promise<ApiResponse<PresignUrl>> =>
    api.post("/api/storage/presigned-url", data),
};
