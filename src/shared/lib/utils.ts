import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatSlug = (val: string): string => {
  return val
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
