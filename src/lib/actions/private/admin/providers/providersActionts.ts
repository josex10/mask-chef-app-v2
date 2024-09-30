"use server";
import { IProvidersForSelect } from "@/utils/interfaces/private/admin/providersInterfaces";
import { getXataClient } from "@/xata";

export const getAllProvidersForSelect = async (
  restSelected: string | undefined
): Promise<string | null> => {
  try {
    const xata = getXataClient();
    let result: IProvidersForSelect[] = [];

    if (!restSelected) return JSON.stringify(result);

    const records = await xata.db.providers
      .select(["id", "name", "comercialName"])
      .filter({
        restaurant: restSelected,
      })
      .getAll();

    if (records && records.length) {
      records.map((record) => {
        result.push({
          id: record.id,
          name: record.name ? record.name : "",
          comercialName: record.comercialName ? record.comercialName : "",
        });
      });
    }

    return JSON.stringify(result);
  } catch (error) {
    return null;
  }
};
