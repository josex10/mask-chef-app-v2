"use client";

/**
 * @description The useCutExpenseClave function is a utility function designed to process and truncate a given string (clave). If the string exceeds a specified length, it truncates the string and appends an ellipsis (...) to indicate that the string has been shortened. If the string is empty or undefined, it returns a default value of "N/A".
 *
 * @param {string} (clave): The input string that needs to be processed and potentially truncated.
 * @returns {string} string: The processed string. If the input string is empty or undefined, it returns "N/A". If the input string exceeds 30 characters, it truncates the string and appends an ellipsis (...). Otherwise, it returns the original string.
 * @example
 * import { useCutExpenseClave } from './path/to/expenses';
 * const clave = "1234567890123456789012345678901234567890";
 * const shortClave = useCutExpenseClave(clave);
 * //=>"...12345678901234567890"
 */
export const useCutExpenseClave = (clave: string): string => {
  if (!clave) return "N/A";
  if (clave.length > 30) {
    return `...${clave.slice(30)}`;
  }
  return clave;
};
