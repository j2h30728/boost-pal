"use server";

import { getUserAuthInfo, getUserIdByEmail, getUserByUsername, getSessionId } from "@/service/userService";
import bcrypt from "bcrypt";
import { NotFoundError } from "../error/customError";

export const isUsernameExists = async (username: string) => {
  try {
    const { data } = await getUserByUsername(username);
    return Boolean(data);
  } catch (error) {
    return false;
  }
};

export const isEmailExists = async (email: string) => {
  try {
    const { data } = await getUserIdByEmail(email);
    return Boolean(data);
  } catch (error) {
    return false;
  }
};

export const checkEmailAvailability = async (email: string) => {
  try {
    const sessionId = await getSessionId();
    const { data: user } = await getUserIdByEmail(email);

    if (sessionId === user?.id) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const sessionId = await getSessionId();
    const { data: user } = await getUserByUsername(username);
    if (sessionId === user?.id) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const checkUserPassword = async (password: string) => {
  const { data: user } = await getUserAuthInfo();
  return bcrypt.compare(password, user?.password ?? "소셜로그인");
};
