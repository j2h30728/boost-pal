import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

import { AuthorizationError, DatabaseError, NotFoundError } from "@/lib/error/customError";
import { UNKNOWN_ERROR_MESSAGE } from "@/constants/messages";

export const generateErrorResponse = (error: unknown, defaultErrorMessage?: string) => {
  if (error instanceof AuthorizationError) {
    return { data: null, isSuccess: false, message: error.message, error: error };
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return { data: null, isSuccess: false, message: error.message, error: new DatabaseError(error.message) };
  }
  if (error instanceof NotFoundError) {
    notFound();
  }
  const errorMessage = defaultErrorMessage || UNKNOWN_ERROR_MESSAGE;
  return { data: null, isSuccess: false, message: errorMessage, error: new Error(errorMessage) };
};
