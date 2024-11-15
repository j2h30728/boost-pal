"use server";

import { revalidateTag } from "next/cache";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import db from "@/lib/server/db";
import { localUserProfileSchema, socialUserProfileSchema } from "@/lib/schema";
import { checkEmailAvailability, checkUsernameAvailability, checkUserPassword } from "@/lib/server/validate";
import { getSessionId, getUserAuthInfo, getUserInfoBySession, isSocialUserSession } from "@/service/userService";
import { PASSWORD_ERROR_MESSAGE, USER_INFO_ERROR_MESSAGE } from "@/constants/messages";
import { cacheTags } from "@/lib/cacheTags";
import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import { ValidationError } from "@/lib/error/customError";

export const editProfile = async (formData: FormData) => {
  try {
    const isSocialLoggedIn = await isSocialUserSession();
    const sessionId = await getSessionId();

    if (isSocialLoggedIn) {
      await editSocialUserProfile(formData, sessionId);
    } else {
      await editLocalUserProfile(formData, sessionId);
    }
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

const editLocalUserProfile = async (formData: FormData, sessionId: number) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
    photo: formData.get("photo"),
    bio: formData.get("bio"),
  };
  const result = localUserProfileSchema.safeParse(data);
  if (!result.success) return result.error.flatten();

  const isValidPassword = await checkUserPassword(result.data.password);
  if (!isValidPassword) {
    throw new ValidationError(PASSWORD_ERROR_MESSAGE);
  }
  const checkEmail = await checkEmailAvailability(result.data?.email!);
  const checkUsername = await checkUsernameAvailability(result.data?.username!);
  if (checkUsername || checkEmail) {
    throw new ValidationError(USER_INFO_ERROR_MESSAGE);
  }

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
};

const editSocialUserProfile = async (formData: FormData, sessionId: number) => {
  const data = {
    username: formData.get("username"),
    photo: formData.get("photo"),
    bio: formData.get("bio"),
  };
  const result = socialUserProfileSchema.safeParse(data);
  if (!result.success) return result.error.flatten();

  const checkUsername = await checkUsernameAvailability(result.data?.username!);
  if (checkUsername) {
    throw new ValidationError(USER_INFO_ERROR_MESSAGE);
  }

  await db.user.update({
    where: {
      id: sessionId,
    },
    data: {
      username: result.data?.username,
      bio: result.data?.bio,
      avatar: result.data.photo,
    },
  });
};
