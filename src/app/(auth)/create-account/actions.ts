"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import db from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { accountSchema } from "@/lib/schema";

export async function handleCreateAccount(formData: FormData) {
  const accountData = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  try {
    const result = await accountSchema.safeParseAsync(accountData);

    if (!result.success) {
      return result.error?.flatten();
    }
    await createAccount(result.data);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
  redirect("/");
}

const createAccount = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await db.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });
  const cookie = await getSession();
  cookie.id = user.id;
  await cookie.save();
};
