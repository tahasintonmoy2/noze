import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length: number) {
  const characters = "anqwhuwasxadSDSEWQDFGSWTYsdaq762123221";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function snakeCase(st: string) {
  return st.toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char)=> char.toUpperCase())
}