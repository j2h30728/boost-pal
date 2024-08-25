import db from "@/lib/server/db";

export async function getMostPopularCategory() {
  const result = await db.post.groupBy({
    by: ["category"],
    _count: {
      category: true,
    },
    orderBy: {
      _count: {
        category: "desc",
      },
    },
    take: 1,
  });

  return result[0].category;
}
