export interface FieldErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  errorCode: string;
  message: string;
  details?: FieldErrorDetail[];
  path: string;
  traceId: string;
}
