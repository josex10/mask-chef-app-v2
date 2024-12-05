"use server";
import { getSelectedRestaurantFromCookie } from "@/lib/middleware/cookies";
import { IServerActionResponse } from "@/utils/interfaces/private/admin/serverActionResponse";
import { IComboboxOption } from "@/utils/interfaces/shared/IComboboxOption";
import { getXataClient } from "@/xata";

export const selectProvidersForComboboxOption =
  async (): Promise<IServerActionResponse> => {
    try {
      const xata = getXataClient();
      let result: IComboboxOption[] = [];

      const resutaurantSelected = await getSelectedRestaurantFromCookie();
      if (!resutaurantSelected?.id)
        throw new Error("No se ha seleccionado un restaurante");

      const records = await xata.db.providers
        .select(["id", "name"])
        .filter({
          restaurant: resutaurantSelected.id,
        })
        .getAll();

      if (records && records.length) {
        records.map((record) => {
          result.push({
            id: record.id,
            label: record.name ? record.name : "",
          });
        });
      }

      return {
        error: false,
        message: `Se ha generando la solicitud correctamente.`,
        data: result,
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
