import { db } from "@/lib/db";

export const getRating = async () => {
  try {
    const rating = await db.rating.findMany({
      select: {
        id: true,
        rating: true,
      },
    });
    return rating;
  } catch {}
};
