import ICountry from "./country";
import IRestaurant from "./restaurant";
import { IUser } from "./user";

export default interface IAuthProfile{
    user: IUser;
    restaurants: IRestaurant[];
    countrySettings: ICountry;
    restaurantSelected: IRestaurant;
}