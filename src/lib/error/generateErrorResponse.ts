import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

import { AuthorizationError, DatabaseError, NotFoundError } from "@/lib/error/customError";
import { UNKNOWN_ERROR_MESSAGE } from "@/constants/messages";
import { FailResponse } from "../types";
import { createFailResponse } from "../server/createServerResponse";

export const generateErrorResponse = (error: unknown, defaultErrorMessage?: string): FailResponse => {
  if (error instanceof AuthorizationError) {
    return createFailResponse({ message: error.message, error: error });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return createFailResponse({ message: error.message, error: new DatabaseError(error.message) });
  }
  if (error instanceof NotFoundError) {
    notFound();
  }
  const errorMessage = defaultErrorMessage || UNKNOWN_ERROR_MESSAGE;
  return createFailResponse({ message: errorMessage, error: new Error(errorMessage) });
};
