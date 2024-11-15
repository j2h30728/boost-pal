"use server";

import { revalidateTag } from "next/cache";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import db from "@/lib/server/db";
import { profileSchema } from "@/lib/schema";
import { checkEmailAvailability, checkUsernameAvailability, checkUserPassword } from "@/lib/server/validate";
import { getSessionId, getUserAuthInfo, getUserInfoBySession } from "@/service/userService";
import { PASSWORD_ERROR_MESSAGE, USER_INFO_ERROR_MESSAGE } from "@/constants/messages";
import { cacheTags } from "@/lib/cacheTags";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { ValidationError } from "@/lib/error/customError";

export const editProfile = async (formData: FormData) => {
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
      throw new ValidationError(PASSWORD_ERROR_MESSAGE);
    }
    const checkEmail = await checkEmailAvailability(result.data?.email!);
    const checkUsername = await checkUsernameAvailability(result.data?.username!);
    if (checkUsername || checkEmail) {
      throw new ValidationError(USER_INFO_ERROR_MESSAGE);
    }

    const sessionId = await getSessionId();

    if (result.data && result.data.newPassword) {
      const hashedNewPassword = await bcrypt.hash(result.data?.newPassword, 12);
      await db.user.update({
        where: {
          id: sessionId,
        },
        data: {
          email: result.data?.email,
          username: result.data?.username,
          password: hashedNewPassword,
          bio: result.data?.bio,
          avatar: result.data.photo,
        },
      });
    }
    const { data: loggedInUser } = await getUserAuthInfo();
    await db.user.update({
      where: {
        id: sessionId,
      },
      data: {
        email: result.data?.email,
        username: result.data?.username,
        password: loggedInUser?.password,
        bio: result.data?.bio,
        avatar: result.data.photo,
      },
    });
  } catch (error) {
    return generateErrorResponse(error);
  }
  revalidateTag(cacheTags.profile);
  const { data: user, error: userInfoError } = await getUserInfoBySession();
  if (userInfoError) {
    return generateErrorResponse(userInfoError);
  }
  redirect(`/users/${encodeURIComponent(user.username)}`);
};
