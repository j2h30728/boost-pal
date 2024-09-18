import { FailResponse, SuccessResponse } from "../types";

export const createSuccessResponse = <T>({
  data,
  message = "",
}: {
  data: T;
  message?: string;
}): SuccessResponse<T> => ({
  data: data as T,
  isSuccess: true,
  message,
  error: null,
});

export const createFailResponse = ({ error, message }: { error: Error; message?: string }): FailResponse => ({
  data: null,
  isSuccess: false,
  message: message || error.message,
  error,
});
