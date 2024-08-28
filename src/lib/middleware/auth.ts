import IRestaurant from "@/utils/interfaces/private/admin/restaurant";
import { getXataClient } from "@/xata";

type TIsRegisteredUserResponse = {
  redirectToDashboardAndSetCookie: boolean;
  cookie: string | null;
  redirectToError: boolean;
  redirectToRegister: boolean;
  redirectoToInvites: boolean;
};

export const isRegisteredUser = async (
  userId: string | null
): Promise<TIsRegisteredUserResponse> => {
  let response: TIsRegisteredUserResponse = {
    redirectToDashboardAndSetCookie: false,
    cookie: null,
    redirectToError: false,
    redirectToRegister: false,
    redirectoToInvites: false,
  };

  const xata = getXataClient();

  if (!userId) {
    response.redirectToError = true;
    return response;
  }

  try {
    const xataUser = await xata.db.users
      .filter({ id_clerk: userId })
      .getFirst();
    if (!xataUser) {
      response.redirectToRegister = true;
      return response;
    }

    const xataRestaurants = await xata.db.users_x_restaurants
      .select(["id_restaurant.*", "favorite"])
      .filter({ id_user: xataUser.id })
      .getAll();

    //TODO: IMPLEMENT INVITES
    if (xataRestaurants.length === 0) {
      // response.redirectoToInvites = true;
      response.redirectToRegister = true;
      return response;
    }

    let selectedRestaurant: IRestaurant | null = null;
    const groupOfRestaurants: IRestaurant[] = [];
    xataRestaurants.map((restaurant, index) => {
      const tmpRestaurant: IRestaurant = {
        id: restaurant.id_restaurant?.id ? restaurant.id_restaurant.id : "",
        email: restaurant.id_restaurant?.email
          ? restaurant.id_restaurant.email
          : "",
        name: restaurant.id_restaurant?.name
          ? restaurant.id_restaurant.name
          : "",
        country: restaurant.id_restaurant?.country?.id
          ? restaurant.id_restaurant.country.id
          : "",
        address: restaurant.id_restaurant?.address
          ? restaurant.id_restaurant.address
          : "",
        phone: restaurant.id_restaurant?.phone
          ? restaurant.id_restaurant.phone
          : "",
        legalNumber: restaurant.id_restaurant?.legalNumber
          ? restaurant.id_restaurant.legalNumber
          : 0,
      };

      if (
        (restaurant.favorite && !selectedRestaurant) ||
        index === xataRestaurants.length - 1
      ) {
        selectedRestaurant = tmpRestaurant;
        return;
      }
      groupOfRestaurants.push(tmpRestaurant);
    });

    if (!selectedRestaurant) {
      response.redirectToError = true;
      return response;
    }

    const countryId = (selectedRestaurant as IRestaurant).country;

    if (!countryId) {
      response.redirectToError = true;
      return response;
    }

    const xataCountry = await xata.db.countries
      .filter({ id: countryId })
      .getFirst();

    response.redirectToDashboardAndSetCookie = true;

    response.cookie = JSON.stringify({
      restaurants: groupOfRestaurants,
      restaurantSelected: selectedRestaurant,
      user: xataUser,
      countrySettings: xataCountry,
    });

    return response;
  } catch (error) {
    response.redirectToError = true;
    return response;
  }
};
