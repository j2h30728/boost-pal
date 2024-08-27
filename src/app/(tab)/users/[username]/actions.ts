"use server";

import { getSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export const logOut = async (formData: FormData) => {
  const session = await getSession();
  session.destroy();
  redirect("/intro");
};
