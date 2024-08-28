import IAuthProfile from '@/utils/interfaces/private/admin/profile';
import { IStoreProfile } from '@/utils/interfaces/private/admin/storeProfile';
import { create } from 'zustand'
import { IUser } from '../../../utils/interfaces/private/admin/user';
import IRestaurant from '@/utils/interfaces/private/admin/restaurant';
import ICountry from '@/utils/interfaces/private/admin/country';

const useStoreAuth = create<IStoreProfile>((set) => ({
  user: null as IUser | null,
  restaurants: null as IRestaurant[] | null,
  selectedRestaurant: null as IRestaurant | null,
  countrySettings: null as ICountry | null,
  login: (newProfile: IAuthProfile) => set({ 
    user: newProfile.user,
    restaurants: newProfile.restaurants,
    selectedRestaurant: newProfile.restaurantSelected,
    countrySettings: newProfile.countrySettings,
  }),
  logout: () => set({ 
    user: null,
    restaurants: null,
    selectedRestaurant: null,
    countrySettings: null,
   }),
}));

export default useStoreAuth;