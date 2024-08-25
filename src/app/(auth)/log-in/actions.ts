"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import db from "@/lib/server/db";
import { logInSchema } from "@/lib/schema";
import { getSession } from "@/lib/server/session";

export async function handleLogIn(formData: FormData) {
  const loginData = {
    password: formData.get("password"),
    email: formData.get("email"),
  };
  try {
    const result = await logInSchema.spa(loginData);

    if (!result.success) {
      return {
        data: null,
        error: result.error?.flatten(),
        success: false,
      };
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
  const isValidPassword = await bcrypt.compare(password, user!.password ?? "소셜로그인");
  if (isValidPassword) {
    const session = await getSession();
    session.id = user!.id;
    await session.save();
  }
  return {
    data: null,
    error: {
      fieldErrors: {
        password: ["비밀번호 확인 부탁드립니다."],
        email: [],
      },
    },
    success: false,
  };
};
