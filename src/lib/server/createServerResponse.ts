import { FailResponse, SuccessResponse } from "../types";

export const createSuccessResponse = <T>({
  data,
  message = "",
}: {
  data: T;
  message?: string;
}): SuccessResponse<T> => ({
  data,
  isSuccess: true,
  message,
  error: null,
});

export const createFailResponse = ({ error, message }: { error: Error; message?: string }): FailResponse =>
  JSON.parse(
    JSON.stringify({
      data: null,
      isSuccess: false,
      message: message || error.message,
      error,
    })
  );
