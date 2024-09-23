"use server";

import IRestaurant from "@/utils/interfaces/private/admin/restaurant";
import { IUser } from "@/utils/interfaces/private/admin/user";
import { IUserRestaurant } from "@/utils/interfaces/private/admin/userRestaurant";
import { RegisterSchema } from "@/utils/schemas/register/RegisterSchema";
import { getXataClient } from "@/xata";
import { currentUser } from "@clerk/nextjs/server";

const xata = getXataClient();

export const registerAction = async (data: unknown): Promise<string | null> => {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) {
    return "Validation Error";
  }

  const { user, errorMessageU } = await registerUserProcess();

  if (errorMessageU) return errorMessageU;

  const { favorite, restaurantName, ...restaurantRest } = validation.data;
  const tmpRestaurant: IRestaurant = {
    name: restaurantName,
    ...restaurantRest,
  };

  if (!user) return "User not found";
  const { errorMessage } = await registerRestaurantProcess(
    user,
    tmpRestaurant,
    favorite
  );

  if (errorMessage) return errorMessage;

  return null;
};

type TRegisterUser = {
  user: IUser | null;
  errorMessageU: string | null;
};
const registerUserProcess = async (): Promise<TRegisterUser> => {
  let response: TRegisterUser = {
    user: null,
    errorMessageU: null,
  };

  const user = await currentUser();

  if (!user) {
    response.errorMessageU = "User not found";
    return response;
  }

  const tmpUser: IUser = {
    email: user.primaryEmailAddress?.emailAddress
      ? user.primaryEmailAddress?.emailAddress
      : "",
    id_clerk: user.id,
    name: `${user.firstName} ${user.lastName}`,
  };

  try {
    const getUser = await xata.db.users
      .filter({ id_clerk: tmpUser.id_clerk })
      .getFirst();
    if (getUser) {
      response.user = {
        id: getUser.id,
        email: getUser.email ? getUser.email : "",
        id_clerk: getUser.id_clerk,
        name: getUser.name ? getUser.name : "",
      };
      return response;
    }
  } catch (error) {
    response.errorMessageU = "Error getting the user.";
    return response;
  }

  try {
    const newUser = await xata.db.users.create(tmpUser);
    response.user = {
      id: newUser.id,
      email: newUser.email ? newUser.email : "",
      id_clerk: newUser.id_clerk,
      name: newUser.name ? newUser.name : "",
    };
  } catch (error) {
    response.errorMessageU = "Error creating user.";
    return response;
  }

  return response;
};

type TRegisterRestaurant = {
  restaurant: IRestaurant | null;
  errorMessage: string | null;
};
const registerRestaurantProcess = async (
  user: IUser,
  restaurant: IRestaurant,
  favorite: boolean
): Promise<TRegisterRestaurant> => {
  let response: TRegisterRestaurant = {
    restaurant: null,
    errorMessage: null,
  };

  try {
    const uniqueRestaurantByLegalNumber = await xata.db.restaurants
      .filter({ legalNumber: restaurant.legalNumber })
      .getFirst();
    if (uniqueRestaurantByLegalNumber) {
      response.errorMessage =
        "Restaurant already exists with this legal number.";
      return response;
    }
  } catch (error) {
    response.errorMessage = "Error creating the restaurant.";
    return response;
  }

  try {
    const newRestaurant = await xata.db.restaurants.create(restaurant);
    response.restaurant = {
      id: newRestaurant.id,
      email: newRestaurant.email ? newRestaurant.email : "",
      name: newRestaurant.name ? newRestaurant.name : "",
      country: newRestaurant.country ? String(newRestaurant.country) : "",
      address: newRestaurant.address ? newRestaurant.address : "",
      phone: newRestaurant.phone ? newRestaurant.phone : "",
      legalNumber: newRestaurant.legalNumber ? newRestaurant.legalNumber : 0,
    };
  } catch (error) {
    response.errorMessage = "Error creating the restaurant.";
    return response;
  }

  if (favorite) {
    try {
      const groupOfRestaurants = await xata.db.users_x_restaurants
        .filter({ id_user: user.id })
        .getAll();
      if (groupOfRestaurants) {
        groupOfRestaurants.map(async (rest) => {
          await xata.db.users_x_restaurants.update(rest.id, {
            favorite: false,
          });
        });
      }
    } catch (error) {
      response.errorMessage = "Error deleting user restaurant relation.";
      return response;
    }
  }

  try {
    const relation: IUserRestaurant = {
      id_restaurant: response.restaurant.id ? response.restaurant.id : "",
      id_user: user.id ? user.id : "",
      favorite,
    };
    await xata.db.users_x_restaurants.create(relation);
  } catch (error) {
    response.errorMessage = "Error creating user restaurant relation.";
    return response;
  }

  return response;
};
