import { EMessages } from "@/utils/enums/messages";
import { z } from "zod";

export const SchemaProductData = z
  .object({
    name: z.string({ message: EMessages.inputErrorTypeString }),
    price: z.coerce
      .number({ message: EMessages.inputErrorTypeNumber })
      .optional(),
    providers: z.string({ message: EMessages.inputErrorTypeString }),
    categories: z.string({ message: EMessages.inputErrorTypeDate }),
    unitOfMeasures: z.string({ message: EMessages.inputErrorTypeString }),
    minStockLevel: z.coerce
      .number({ message: EMessages.inputErrorTypeNumber })
      .optional(),
    maxStockLevel: z.coerce
      .number({ message: EMessages.inputErrorTypeNumber })
      .optional(),
    reOrderStockLevel: z.coerce
      .number({ message: EMessages.inputErrorTypeNumber })
      .optional(),
    isAvailable: z.boolean({ message: EMessages.inputErrorTypeBoolean }),
    inventoryRequired: z.boolean({ message: EMessages.inputErrorTypeBoolean }),
  })
  .superRefine((data, ctx) => {
    if (!data.inventoryRequired && !data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: EMessages.inputErrorRequired,
        path: ["price"],
      });
    }

    if (data.inventoryRequired) {
      if (!data.minStockLevel) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: EMessages.inputErrorRequired,
          path: ["minStockLevel"],
        });
      }

      if (!data.maxStockLevel) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: EMessages.inputErrorRequired,
          path: ["maxStockLevel"],
        });
      }

      if (!data.reOrderStockLevel) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: EMessages.inputErrorRequired,
          path: ["reOrderStockLevel"],
        });
      }

      if (
        data.maxStockLevel &&
        data.minStockLevel &&
        data.minStockLevel > data.maxStockLevel
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El stock mínimo debe ser menor al stock máximo",
          path: ["minStockLevel"],
        });
      }

      if (
        data.maxStockLevel &&
        data.minStockLevel &&
        data.maxStockLevel < data.minStockLevel
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El stock máximo debe ser mayor al stock mínimo",
          path: ["maxStockLevel"],
        });
      }

      if (
        data.maxStockLevel &&
        data.minStockLevel &&
        data.reOrderStockLevel &&
        data.reOrderStockLevel > data.maxStockLevel
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El stock de reorden debe ser menor al stock máximo",
          path: ["reOrderStockLevel"],
        });
      }
      if (
        data.maxStockLevel &&
        data.minStockLevel &&
        data.reOrderStockLevel &&
        data.reOrderStockLevel < data.minStockLevel
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El stock de reorden debe ser mayor al stock mínimo",
          path: ["reOrderStockLevel"],
        });
      }
    }
  });
