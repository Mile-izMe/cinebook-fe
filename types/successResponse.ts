import { CursorPaginationMeta } from "./cursorResponse";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
  meta?: CursorPaginationMeta;
}
