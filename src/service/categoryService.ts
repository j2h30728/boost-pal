import db from "@/lib/server/db";
import { NOT_EXISTS_CATEGORY_MESSAGE } from "@/constants/messages";
import { withErrorHandling } from "@/lib/error/withErrorHandling";
import { createSuccessResponse } from "@/lib/server/createServerResponse";

export const getMostPopularCategory = withErrorHandling(async () => {
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

  return createSuccessResponse({ data: topCategory.category });
});
