import { Category } from "@prisma/client";

import { CATEGORIES } from "@/constants/cateogries";

export const isCategory = (category: string): category is Category => {
  return Object.keys(CATEGORIES).includes(category);
};
