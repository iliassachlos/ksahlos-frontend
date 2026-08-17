import { getLuminance } from "@mui/material";

/**
 *  Capitalizes the first letter of a string
 *
 * @param str - The string to capitalize
 * @returns The input string with the first letter capitalized
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Whether a CSS color reads as light enough that
 * dark text would contrast better against it than light text.
 */
export const isLightColor = (color: string, threshold = 0.5): boolean =>
  getLuminance(color) > threshold;

export const scrollToView = (elementId: string) => {
   document
      .getElementById(elementId)
      ?.scrollIntoView({ behavior: "smooth" });
}