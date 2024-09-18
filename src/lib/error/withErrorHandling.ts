import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { ServerResponse, SuccessResponse } from "@/lib/types";
import { createSuccessResponse } from "../server/createServerResponse";
import { NotFoundError } from "./customError";

export const withErrorHandling =
  <T>(fn: (...args: any[]) => Promise<Partial<ServerResponse<T>>>) =>
  async (...args: any[]): Promise<ServerResponse<T>> => {
    try {
      const { data, message } = await fn(...args);
      if (data === null || data === undefined) {
        throw new NotFoundError();
      }
      return createSuccessResponse({ data: data, message: message });
    } catch (error) {
      return generateErrorResponse(error);
    }
  };

export function isSuccessResponse<T>(response: ServerResponse<T>): response is SuccessResponse<T> {
  return response.isSuccess;
}
