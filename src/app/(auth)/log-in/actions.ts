"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import db from "@/lib/server/db";
import { logInSchema } from "@/lib/schema";
import { getSession } from "@/lib/server/session";
import { LOGIN_ERROR_MESSAGE } from "@/constants/messages";

export async function handleLogIn(formData: FormData) {
  const loginData = {
    password: formData.get("password"),
    email: formData.get("email"),
  };
  try {
    const result = logInSchema.safeParse(loginData);

    if (!result.success) {
      return result.error.flatten();
    }

    await logIn(result.data);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  redirect("/");
}

const logIn = async ({ email, password }: { email: string; password: string }) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (!user) {
    throw new Error(LOGIN_ERROR_MESSAGE);
  }

  const isValidPassword = await bcrypt.compare(password, user.password!);
  if (!isValidPassword) {
    throw new Error(LOGIN_ERROR_MESSAGE);
  }
  const session = await getSession();
  session.id = user.id;
  await session.save();
};
