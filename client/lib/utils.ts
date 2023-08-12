import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function secondsToDaysAndHours(seconds: number): string {
  // Constants
  const SECONDS_IN_AN_HOUR = 3600;
  const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR;
  const SECONDS_IN_A_MINUTE = 60;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(seconds / SECONDS_IN_A_DAY);
  const remainingSecondsAfterDays = seconds % SECONDS_IN_A_DAY;
  const hours = Math.floor(remainingSecondsAfterDays / SECONDS_IN_AN_HOUR);
  const remainingSecondsAfterHours = remainingSecondsAfterDays % SECONDS_IN_AN_HOUR;
  const minutes = Math.floor(remainingSecondsAfterHours / SECONDS_IN_A_MINUTE);
  const remainingSecondsFinal = remainingSecondsAfterHours % SECONDS_IN_A_MINUTE;

  // Construct the formatted result
  const formattedResult = [];
  if (days > 0) {
    formattedResult.push(`${days} days`);
  }
  if (hours > 0) {
    formattedResult.push(`${hours} hours`);
  }
  if (minutes > 0) {
    formattedResult.push(`${minutes} minutes`);
  }
  if (remainingSecondsFinal > 0) {
    formattedResult.push(`${remainingSecondsFinal} seconds`);
  }

  // Join the components and return the result
  return formattedResult.join(', ');
}