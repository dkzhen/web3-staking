import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatNumber(value: number): string {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + "T"; // Trillions
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + "B";  // Billions
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + "M";  // Millions
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + "K";  // Thousands
  } else {
    return value.toFixed(2); // For values less than 1000
  }
}