import { AUTHORIZATION_ERROR_MESSAGE, INVALID_INPUT, NOT_FOUND_MESSAGE } from "@/constants/messages";

export class AuthorizationError extends Error {
  constructor(message: string = AUTHORIZATION_ERROR_MESSAGE) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class ValidationError extends Error {
  constructor(message: string = INVALID_INPUT) {
    super(message);
    this.name = "ValidationError";
  }
}

export class DatabaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = NOT_FOUND_MESSAGE) {
    super(message);
    this.name = "NotFoundError";
  }
}
