"use client";
export const useCutExpenseClave = (clave: string) => {
  if (!clave) return "N/A";
  if (clave.length > 30) {
    return `...${clave.slice(30)}`;
  }
  return clave;
};