"use server";

import db from "@/lib/server/db";
import { profileSchema } from "@/lib/schema";
import { getSession } from "@/lib/server/session";
import { checkEmailAvailability, checkUsernameAvailability, checkUserPassword } from "@/lib/server/validate";
import { getUserAuthInfo, getUserInfoBySession } from "@/service/userService";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { PASSWORD_ERROR_MESSAGE, USER_INFO_ERROR_MESSAGE } from "@/constants/messages";
import { revalidateTag } from "next/cache";

export async function editProfile(formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
    photo: formData.get("photo"),
    bio: formData.get("bio"),
  };
  const result = profileSchema.safeParse(data);
  if (!result.success) return result.error.flatten();
  try {
    const isValidPassword = await checkUserPassword(result.data.password);
    if (!isValidPassword) {
      throw new Error(PASSWORD_ERROR_MESSAGE);
    }
    const checkEmail = await checkEmailAvailability(result.data?.email!);
    const checkUsername = await checkUsernameAvailability(result.data?.username!);
    if (checkUsername || checkEmail) {
      throw new Error(USER_INFO_ERROR_MESSAGE);
    }

    const session = await getSession();

    if (result.data && result.data.newPassword) {
      const hashedNewPassword = await bcrypt.hash(result.data?.newPassword, 12);
      await db.user.update({
        where: {
          id: session.id,
        },
        data: {
          email: result.data?.email,
          username: result.data?.username,
          password: hashedNewPassword,
          bio: result.data?.bio,
          avatar: result.data.photo ?? "",
        },
      });
    }
    const loggedInUser = await getUserAuthInfo();
    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        email: result.data?.email,
        username: result.data?.username,
        password: loggedInUser?.password,
        bio: result.data?.bio,
        avatar: result.data.photo ?? "",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
  revalidateTag("user-profile");
  const user = await getUserInfoBySession();
  redirect(`/users/${user.username}`);
}
