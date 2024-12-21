"use server";
import {
  getSelectedRestaurantFromCookie,
  getSelectedUserFromCookie,
} from "@/lib/middleware/cookies";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { SchemaProductData } from "@/utils/schemas/products/SchemaProductsData";
import { getXataClient } from "@/xata";
import { SafeParseSuccess } from "zod";

const xata = getXataClient();

export const ActionEditProduct = async (
  data: any,
  productId: any
): Promise<IServerActionResponse> => {
  try {
    await dbValidateIfProductExists(productId);
    const { restaurantId, userId } = await validateDataFromCookies(data);
    const { formData } = await validateFormData(data);

    const { editedProduct } = await dbEditProduct(
      formData,
      restaurantId,
      productId
    );

    return {
      error: false,
      message: "Producto se ha editado correctamente",
      data: editedProduct.id,
    };
  } catch (error: any) {
    console.log({ error });
    return {
      error: true,
      message: error.message
        ? error.message
        : "Ha ocurrido un error al procesar la solicitud.",
      data: null,
    };
  }
};

const validateDataFromCookies = async (data: any) => {
  const resutaurantSelected = await getSelectedRestaurantFromCookie();
  if (!resutaurantSelected?.id)
    throw new Error("No se ha seleccionado un restaurante");

  const userSelected = await getSelectedUserFromCookie();
  if (!userSelected?.id) throw new Error("No se ha seleccionado un usuario");

  return { restaurantId: resutaurantSelected.id, userId: userSelected.id };
};

const validateFormData = async (data: any) => {
  const formData = SchemaProductData.safeParse(data);
  if (formData.error) throw new Error("Error al validar la data para el pago.");

  return { formData };
};

const dbEditProduct = async (
  formData: SafeParseSuccess<{
    providers: string;
    name: string;
    isAvailable: boolean;
    inventoryRequired: boolean;
    categories: string;
    unitOfMeasures: string;
    price?: number | undefined;
    minStockLevel?: number | undefined;
    maxStockLevel?: number | undefined;
    reOrderStockLevel?: number | undefined;
  }>,
  restaurantSelectedId: string,
  productId: string
) => {
  await dbValidateIfProductNameExists(
    formData.data.name,
    restaurantSelectedId,
    productId
  );

  const editedProduct = await xata.db.products.update(productId, {
    name: formData.data.name,
    labels: [],
    price: formData.data.price ? formData.data.price : 0,
    providerBy: formData.data.providers,
    category: formData.data.categories,
    unitOfMeasure: formData.data.unitOfMeasures,
    restaurant: restaurantSelectedId,
    handleInventory: formData.data.inventoryRequired,
    isAvailable: formData.data.isAvailable,
  });
  if (!editedProduct) throw new Error("No se ha podido editar el producto");
  if (formData.data.inventoryRequired) {
    const inventory = await xata.db.products_inventory
      .filter({
        $all: [{ product: editedProduct.id }],
      })
      .getFirst();

    await xata.db.products_inventory.createOrUpdate(inventory?.id, {
      product: editedProduct.id,
      minStockLevel: formData.data.minStockLevel,
      maxStockLevel: formData.data.maxStockLevel,
      reOrderStockLevel: formData.data.reOrderStockLevel,
    });
  }

  return { editedProduct };
};

const dbValidateIfProductNameExists = async (
  name: string,
  restautantId: string,
  productId: string
) => {
  const product = await xata.db.products
    .filter({
      $all: [{ restaurant: restautantId }, { name }],
      $not: {
        id: productId,
      },
    })
    .getFirst();
  if (product) throw new Error("Ya existe un producto con ese nombre");
};

const dbValidateIfProductExists = async (id: any) => {
  if (!id || typeof id !== "string")
    throw new Error("No se ha proporcionado un id para el producto");
  const product = await xata.db.products
    .filter({
      $all: [{ id }],
    })
    .getFirst();
  if (!product)
    throw new Error("El Producto con el id proporcionado no existe");
};
