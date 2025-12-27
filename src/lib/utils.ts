//===================================== Imports ==============================================
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//===================================== Utility Functions ==============================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
