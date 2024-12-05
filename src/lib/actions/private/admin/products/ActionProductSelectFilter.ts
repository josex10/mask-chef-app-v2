import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { getXataClient } from "@/xata";
import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import { IProductsTable } from "@/utils/interfaces/products/IProductsTable";
import { CTableLimitSize } from "@/utils/constants/CTableLimitSize";

type TActionProductSelectFilter = {
  name: string | string[] | undefined;
  categories: string | string[] | undefined;
  providers: string | string[] | undefined;
  unitOfMeasures: string | string[] | undefined;
  page?: number | undefined;
};

const xata = getXataClient();
const pageSize = CTableLimitSize;
export const actionProductSelectFilter = async (
  filter: TActionProductSelectFilter
): Promise<IServerActionResponse> => {
  try {
    let result: IProductsTable[] = [];

    const { restaurantId } = await validateDataFromCookies(filter);
    const { totalCount } = await dbGetProductsTotalCounts(filter, restaurantId);

    if (totalCount) {
      const { records, meta } = await dbGetProducts(filter, restaurantId);

      if (records && records.length) {
        records.map((record) => {
          result.push({
            id: record.id,
            name: record.name,
            price: record.price,
            createdBy: record.createdBy?.email ? record.createdBy.email : "",
            providerBy: record.providerBy?.name ? record.providerBy.name : "",
            category: record.category?.name ? record.category.name : "",
            unitOfMeasure: record.unitOfMeasure?.shortName
              ? record.unitOfMeasure.shortName
              : "",
            handleInventory: record.handleInventory,
            isAvailable: record.isAvailable,
          });
        });
      }
    }

    return {
      error: false,
      message: `Se ha generando la solicitud correctamente.`,
      data: {
        records: result,
        totalCount,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.message
        ? error.message
        : "Ha ocurrido un error al procesar la solicitud.",
      data: null,
    };
  }
};

const dbFilters = (
  filter: TActionProductSelectFilter,
  restaurantId: string
) => {
  const filters = [];
  filters.push({ restaurant: restaurantId });

  filter.name && filters.push({ id: filter.name });
  filter.categories && filters.push({ category: filter.categories });
  filter.providers && filters.push({ providerBy: filter.providers });
  filter.unitOfMeasures &&
    filters.push({ unitOfMeasure: filter.unitOfMeasures });

  return filters;
};

const validateDataFromCookies = async (data: any) => {
  const resutaurantSelected = await getSelectedRestaurantFromCookie();
  if (!resutaurantSelected?.id)
    throw new Error("No se ha seleccionado un restaurante");

  return { restaurantId: resutaurantSelected.id };
};

const dbGetProducts = async (
  filter: TActionProductSelectFilter,
  restaurantId: string
) => {
  const pageNumber = filter.page || 1;

  return await xata.db.products
    .select([
      "id",
      "name",
      "price",
      "createdBy.email",
      "providerBy.name",
      "category.name",
      "unitOfMeasure.shortName",
      "handleInventory",
      "isAvailable",
    ])
    .filter({
      $all: dbFilters(filter, restaurantId),
    })
    .sort("name", "asc")
    .getPaginated({
      pagination: {
        size: pageSize,
        offset: pageSize * (pageNumber - 1),
      },
    });
};

const dbGetProductsTotalCounts = async (
  filter: TActionProductSelectFilter,
  restaurantId: string
) => {
  const { aggs } = await xata.db.products.aggregate({
    totalCount: {
      count: {
        filter: {
          $all: dbFilters(filter, restaurantId),
        },
      },
    },
  });
  return aggs;
};
