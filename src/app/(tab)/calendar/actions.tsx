"use server";

import db from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { groupPostsByDate } from "@/lib/utils";

export const getWrittenPostByYearnAndMonth = async (year: number, month: number) => {
  const startDateOfMonth = new Date(year, month - 1, 1);
  const endDateOfMonth = new Date(year, month, 0);
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
