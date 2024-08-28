import ICountry from "@/utils/interfaces/private/admin/country";
import { getXataClient } from "@/xata"

const xata = getXataClient();
export const getAllCountries = async ():Promise<ICountry[]> => {

    const countries = await xata.db.countries.getAll();
    return countries.map(country => {
        return {
            id: country.id,
            name: (country.name)? country.name : "",
            short_name: (country.short_name)? country.short_name : "",
            language: country.language,
            currency_name: country.currency_name,
            currency_short_name: country.currency_short_name,
            currency_symbol: country.currency_symbol,
        }
    })
}