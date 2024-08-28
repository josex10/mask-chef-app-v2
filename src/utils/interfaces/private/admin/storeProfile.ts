import ICountry from "./country";
import IAuthProfile from "./profile";
import IRestaurant from "./restaurant";
import { IUser } from "./user";

export interface IStoreProfile {
    user: IUser | null;
    restaurants: IRestaurant[] | null;
    selectedRestaurant:IRestaurant | null;
    countrySettings:ICountry | null;
    login: (newProfile: IAuthProfile) => void;
    logout: () => void;
}