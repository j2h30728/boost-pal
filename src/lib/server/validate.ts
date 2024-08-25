"use server";

import { getUserByEmail, getUserByUsername } from "@/service/userService";

export const isUsernameExists = async (username: string) => {
  const user = await getUserByUsername(username);
  return Boolean(user);
};

export const isEmailExists = async (email: string) => {
  const user = await getUserByEmail(email);

  return Boolean(user);
};
