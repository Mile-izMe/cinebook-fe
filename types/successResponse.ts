import { CursorPaginationMeta } from "./cursorResponse";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: Date;
  meta?: CursorPaginationMeta;
}
