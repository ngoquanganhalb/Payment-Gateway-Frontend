import type { ApiResponse } from "@/types/ApiResponse";

// Best-effort extraction of backend error messages.
export function getApiErrorMessages(error: unknown): string[] {
  const anyErr = error as any;

  // Axios style: error.response.data
  const data = anyErr?.response?.data ?? anyErr?.data;

  if (data && typeof data === "object") {
    const api = data as Partial<ApiResponse<unknown>>;
    if (Array.isArray(api.messages) && api.messages.length > 0) {
      return api.messages.filter((m): m is string => typeof m === "string");
    }

    // Fallback: common fields
    if (typeof (data as any).message === "string")
      return [(data as any).message];
    if (typeof (data as any).error === "string") return [(data as any).error];
  }

  if (typeof anyErr?.message === "string") return [anyErr.message];
  return ["Đã xảy ra lỗi. Vui lòng thử lại."];
}
