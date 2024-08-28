"use server";

import IAuthProfile from "@/utils/interfaces/private/admin/profile";
import { CookieSchemaSchema } from "@/utils/schemas/shared/cookieSchema";
import { cookies } from 'next/headers'
export const validateCookie = (cookie: any) => {
  if (!cookie) return false;
  const validation = CookieSchemaSchema.safeParse(JSON.parse(cookie));
  if (validation.error) {
    return false;
  }
  return true;
};

export const getCookie = async()=>{
  const cookieStore = cookies();
  const cookieName = process.env.MASK_CHEF_APP_COOKIE_NAME;
  if(!cookieName){
    return null;
  }

  const cookie = cookieStore.get(cookieName);
  if(!cookie) return null;

  return JSON.parse(cookie.value) as IAuthProfile;
}

