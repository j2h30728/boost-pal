"use server";

import { getUserAuthInfo, getUserIdByEmail, getUserByUsername, getSessionId } from "@/service/userService";
import bcrypt from "bcrypt";

export const isUsernameExists = async (username: string) => {
  const user = await getUserByUsername(username);
  return Boolean(user);
};

export const isEmailExists = async (email: string) => {
  const user = await getUserIdByEmail(email);

  return Boolean(user);
};

export const checkEmailAvailability = async (email: string) => {
  const sessionId = await getSessionId();
  const { data: user } = await getUserIdByEmail(email);

  if (sessionId === user?.id) return !Boolean(user);

  return Boolean(user);
};

export const checkUsernameAvailability = async (username: string) => {
  const sessionId = await getSessionId();
  const { data: user } = await getUserByUsername(username);

  if (sessionId === user?.id) return !Boolean(user);

  return Boolean(user);
};

export const checkUserPassword = async (password: string) => {
  const { data: user } = await getUserAuthInfo();
  const isValidPassword = await bcrypt.compare(password, user?.password ?? "소셜로그인");

  return isValidPassword;
};
