import { FailResponse, SuccessResponse } from "../types";

export const createSuccessResponse = <T>({ data, message = "" }: Partial<SuccessResponse<T>>): SuccessResponse<T> => ({
  data: data as T,
  isSuccess: true,
  message,
  error: null,
});

export const createFailResponse = ({ error = new Error(), message = "" }: Partial<FailResponse>): FailResponse => ({
  data: null,
  isSuccess: false,
  message,
  error,
});
