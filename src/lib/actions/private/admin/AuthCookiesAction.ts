import { cookies } from "next/headers";

export const setCookies = async () => {
  cookies().set({
    name: "MASKCHEF",
    value: "lee",
    httpOnly: true,
    path: "/",
  });
};

export const getCookies = async () => {
  const cookiesValue = cookies().get("MASKCHEF");

  return cookiesValue ? cookiesValue : null;
};
