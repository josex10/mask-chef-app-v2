"use server";
import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { getXataClient } from "@/xata";
import { IProduct } from "../../interfaces";

export const ActionSelectProductById = async (
  productId: string
): Promise<IServerActionResponse> => {
  try {
    const xata = getXataClient();
    const resutaurantSelected = await getSelectedRestaurantFromCookie();
    if (!productId) throw new Error("No se ha seleccionado un producto");

    if (!resutaurantSelected?.id)
      throw new Error("No se ha seleccionado un restaurante");

    const product = await xata.db.products
      .select(["*"])
      .filter({
        restaurant: resutaurantSelected.id,
        id: productId,
      })
      .getFirst();

    const inventory = await xata.db.products_inventory
      .filter({
        product: productId,
      })
      .getFirst();

    const response = product
      ? ({
          category: product.category?.id,
          createdBy: product.createdBy?.id,
          handleInventory: product.handleInventory,
          id: product.id,
          isAvailable: product.isAvailable,
          labels: product.labels,
          name: product.name,
          price: product.price,
          providerBy: product.providerBy?.id,
          restaurant: product.restaurant?.id,
          unitOfMeasure: product.unitOfMeasure?.id,
          minStockLevel: inventory?.minStockLevel || 0,
          maxStockLevel: inventory?.maxStockLevel || 0,
          reOrderStockLevel: inventory?.reOrderStockLevel || 0,
        } as IProduct)
      : null;

    return {
      error: false,
      message: `Se ha generando la solicitud correctamente.`,
      data: response,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.message
        ? error.message
        : "Ha ocurrido un error al procesar la solicitud.",
      data: null,
    };
  }
};
