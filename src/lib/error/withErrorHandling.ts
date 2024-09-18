import { ServerResponse, SuccessResponse } from "@/lib/types";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";

export const withErrorHandling =
  <T>(fn: (...args: any[]) => Promise<ServerResponse<T>>) =>
  async (...args: any[]): Promise<ServerResponse<T>> => {
    try {
      const data = await fn(...args);
      return { data, isSuccess: true, message: "", error: null } as SuccessResponse<T>;
    } catch (error) {
      return generateErrorResponse(error);
    }
  };
