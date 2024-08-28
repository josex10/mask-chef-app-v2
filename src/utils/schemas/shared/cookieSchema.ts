import { z } from "zod";
import { RestaurantSchema, RestaurantSchemaForCookie } from "../private/RestaurantSchema";
import { UserSchema } from "../private/UserSchema";
import { CountrySchema } from "../private/CountrySchema";

export const CookieSchemaSchema = z.object({
    restaurants: z.array(RestaurantSchemaForCookie),
    restaurantSelected: RestaurantSchemaForCookie,
    user: UserSchema,
    countrySettings: CountrySchema,
  });