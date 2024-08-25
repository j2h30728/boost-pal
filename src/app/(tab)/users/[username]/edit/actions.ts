"use server";

import db from "@/lib/server/db";
import { profileSchema } from "@/lib/schema";
import { getSession } from "@/lib/server/session";
import { checkUserPassword } from "@/lib/server/validate";
import { getUserAuthInfo } from "@/service/userService";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function editProfile(formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
    photo: formData.get("photo"),
    bio: formData.get("bio"),
  };
  const result = await profileSchema.safeParseAsync(data);
  if (!result.success) return result.error.flatten();

  const isValidPassword = await checkUserPassword(result.data.password);
  if (!isValidPassword) {
    return { fieldErrors: { password: ["비밀번호를 확인해주세요."] } };
  }
  const session = await getSession();

  if (result.data && result.data.newPassword) {
    const hashedNewPassword = await bcrypt.hash(result.data?.newPassword, 12);
    const user = await db.user.update({
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
    return redirect(`/users/${user.username}`);
  }
  const loggedInUser = await getUserAuthInfo();
  const user = await db.user.update({
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
  return redirect(`/users/${user.username}`);
}
