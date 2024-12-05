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

export const saveProduct = async (
  data: any
): Promise<IServerActionResponse> => {
  try {
    const { restaurantId, userId } = await validateDataFromCookies(data);
    const { formData } = await validateFormData(data);

    const { newProduct } = await dbCreateNewProduct(
      formData,
      userId,
      restaurantId
    );

    return {
      error: false,
      message: "Producto creado correctamente",
      data: newProduct.id,
    };
  } catch (error: any) {
    console.log({error})
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

const dbCreateNewProduct = async (
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
  userSelectedId: string,
  resutaurantSelectedId: string
) => {
  const foundProduct = await dbValidateIfProductNameExists(
    formData.data.name,
    resutaurantSelectedId
  );
  const newProduct = await xata.db.products.create({
    name: formData.data.name,
    labels: [],
    price: formData.data.price ? formData.data.price : 0,
    createdBy: userSelectedId,
    providerBy: formData.data.providers,
    category: formData.data.categories,
    unitOfMeasure: formData.data.unitOfMeasures,
    restaurant: resutaurantSelectedId,
    handleInventory: formData.data.inventoryRequired,
    isAvailable: formData.data.isAvailable,
  });

  if (!newProduct) throw new Error("No se ha podido crear el producto");

  return { newProduct };
};

const dbValidateIfProductNameExists = async (
  name: string,
  restautantId: string
) => {
  const product = await xata.db.products
    .filter({
      $all: [{ restaurant: restautantId }, { name }],
    })
    .getFirst();
  if (product) throw new Error("Ya existe un producto con ese nombre");
};
