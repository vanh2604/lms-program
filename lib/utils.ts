import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const caculateRating = (ratings: { rating: number }[]) => {
  if (!ratings) return 0;
  let sum = 0;
  ratings.forEach((rating) => {
    sum += rating.rating;
  });
  return Math.round(sum / ratings.length);
};
