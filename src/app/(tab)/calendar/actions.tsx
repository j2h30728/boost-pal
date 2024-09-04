"use server";

import { endOfMonth, startOfMonth } from "date-fns";

import db from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { groupPostsByDate } from "@/lib/utils";

export const getWrittenPostByYearnAndMonth = async (year: number, month: number) => {
  const date = new Date(year, month - 1);
  const startDateOfMonth = startOfMonth(date);
  const endDateOfMonth = endOfMonth(date);

  const session = await getSession();
  const posts = await db.post.findMany({
    where: {
      userId: session.id!,
      created_at: {
        gte: startDateOfMonth,
        lt: endDateOfMonth,
      },
    },
  });
  return groupPostsByDate(posts);
};
