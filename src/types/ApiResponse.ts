export type ApiErrorType =
  | "server_side_error"
  | "client_side_error"
  | "validation_error"
  | "unauthorized"
  | string;

export interface ApiResponse<T> {
  data: T | null;
  messages: string[];
  success: boolean;
  timestamp: string | null;
  type: ApiErrorType | null;
}
