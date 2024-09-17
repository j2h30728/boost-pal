"use server";

import { getSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

export const logOut = async (_: FormData) => {
  const session = await getSession();
  session.destroy();
  redirect("/intro");
};
