import { ServerResponse, SuccessResponse } from "@/lib/types";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";

export const withErrorHandling = async <T>(fn: () => Promise<T>): Promise<ServerResponse<T>> => {
  try {
    const data = await fn();
    return { data, isSuccess: true, message: "", error: null } as SuccessResponse<T>;
  } catch (error) {
    return generateErrorResponse(error);
  }
};
