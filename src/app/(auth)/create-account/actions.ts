"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import db from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { accountSchema } from "@/lib/schema";
import { isEmailExists, isUsernameExists } from "@/lib/server/validate";
import { USER_INFO_ERROR_MESSAGE } from "@/constants/messages";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { ServerResponse } from "@/lib/types";
import { ValidationError } from "@/lib/error/customError";
import { formatZodErrorMessage } from "@/lib/utils";

export async function handleCreateAccount(formData: FormData): Promise<ServerResponse<unknown>> {
  const accountData = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  try {
    const result = accountSchema.safeParse(accountData);

    if (!result.success) {
      console.log(result);
      throw new ValidationError(formatZodErrorMessage(result.error));
    }
    const checkUsername = await isUsernameExists(result.data?.username.trim());
    const checkEmail = await isEmailExists(result.data?.email.trim());
    if (checkUsername || checkEmail) {
      throw new ValidationError(USER_INFO_ERROR_MESSAGE);
    }
    await createAccount(result.data);
  } catch (error) {
    return generateErrorResponse(error);
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
