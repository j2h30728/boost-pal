import { Prisma, User } from "@prisma/client";

import { getSession } from "@/lib/server/session";
import db from "@/lib/server/db";
import { AuthorizationError, NotFoundError } from "@/lib/error/customError";
import { ServerResponse } from "@/lib/types";
import { NOT_EXISTS_USER_MESSAGE } from "@/constants/messages";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";

export const getSessionId = async () => {
  const session = await getSession();
  if (!session || !session.id) {
    throw new AuthorizationError();
  }
  return session.id;
};

export const getUserInfoBySession = async (): Promise<ServerResponse<User>> => {
  try {
    const sessionId = await getSessionId();
    const user = await db.user.findUnique({
      where: {
        id: sessionId,
      },
    });
    if (!user) {
      throw new NotFoundError(NOT_EXISTS_USER_MESSAGE);
    }
    return { data: user, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export type InitialProfileType = Prisma.PromiseReturnType<typeof getUserInfoBySession>;

export const getUserIdByEmail = async (email: string): Promise<ServerResponse<Pick<User, "id">>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      throw new NotFoundError(NOT_EXISTS_USER_MESSAGE);
    }
    return { data: user, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};
export const getUserByUsername = async (username: string): Promise<ServerResponse<Pick<User, "id">>> => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      throw new NotFoundError(NOT_EXISTS_USER_MESSAGE);
    }
    return { data: user, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};

export const getUserAuthInfo = async (): Promise<ServerResponse<Pick<User, "id" | "password">>> => {
  try {
    const sessionId = await getSessionId();
    const user = await db.user.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      throw new NotFoundError(NOT_EXISTS_USER_MESSAGE);
    }
    return { data: user, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};
