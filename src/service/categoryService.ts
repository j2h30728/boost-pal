import { Category } from "@prisma/client";

import { generateErrorResponse } from "@/lib/error/generateErrorResponse";
import db from "@/lib/server/db";
import { ServerResponse } from "@/lib/types";
import { NOT_EXISTS_CATEGORY_MESSAGE } from "@/constants/messages";

export const getMostPopularCategory = async (): Promise<ServerResponse<Category>> => {
  try {
    const categoryGroup = await db.post.groupBy({
      by: ["category"],
      orderBy: {
        _count: {
          category: "desc",
        },
      },
      take: 1,
    });

    const [topCategory] = categoryGroup;
    if (!topCategory) {
      throw new Error(NOT_EXISTS_CATEGORY_MESSAGE);
    }

    return { data: topCategory.category, isSuccess: true, message: "", error: null };
  } catch (error) {
    return generateErrorResponse(error);
  }
};
