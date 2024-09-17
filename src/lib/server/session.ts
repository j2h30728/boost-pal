"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface Session {
  id?: number;
}

export const getSession = async () => {
  return await getIronSession<Session>(cookies(), {
    cookieName: "dam",
    password: process.env.COOKIE_PASSWORD!,
  });
};
