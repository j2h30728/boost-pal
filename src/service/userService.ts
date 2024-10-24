import { getSession } from "@/lib/server/session";
import db from "@/lib/server/db";
import { AuthorizationError, NotFoundError } from "@/lib/error/customError";
import { NOT_EXISTS_USER_MESSAGE } from "@/constants/messages";
import { withErrorHandling } from "@/lib/error/withErrorHandling";

export const getSessionId = async () => {
  const session = await getSession();
  if (!session || !session.id) {
    throw new AuthorizationError();
  }
  return session.id;
};

export const getUserInfoBySession = withErrorHandling(async () => {
  const sessionId = await getSessionId();
  const user = await db.user.findUnique({
    where: {
      id: sessionId,
    },
  });
  if (!user) {
    throw new NotFoundError(NOT_EXISTS_USER_MESSAGE);
  }
  return { data: user };
});

export const getUserIdByEmail = withErrorHandling(async (email: string) => {
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
  return { data: user };
});

export const getUserByUsername = withErrorHandling(async (username: string) => {
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
  return { data: user };
});

export const getUserAuthInfo = withErrorHandling(async () => {
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
  return { data: user };
});

export async function createOAuthUser({
  email,
  username,
  avatar = "",
}: {
  email: string;
  username: string;
  avatar?: string;
}) {
  const newUser = await db.user.create({
    data: {
      email,
      username,
      avatar,
    },
    select: {
      id: true,
    },
  });
  return newUser;
}
