import { z } from "zod";

export const SchemaProductsFormFilter = z.object({
    name: z
      .string()
      .optional(),
    categories: z
      .string()
      .optional(),
    providers: z
      .string()
      .optional(),
    unitOfMeasures: z
      .string()
      .optional(),
  
  });