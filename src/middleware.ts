import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isRegisteredUser } from './lib/middleware/auth';
import { validateCookie } from "./lib/middleware/cookies";

const MASK_CHEF_APP_COOKIE_NAME = process.env.MASK_CHEF_APP_COOKIE_NAME;
const isProtectedRoute = createRouteMatcher(["/private(.*)"]);
const isStagingRoute = createRouteMatcher(["/stage(.*)"]);
const isRegisterRoute = createRouteMatcher(["/register"]);
const isSignOutRoute = createRouteMatcher(["/sign-out"]);


export default clerkMiddleware(async(auth, req) => {
  
  if(!MASK_CHEF_APP_COOKIE_NAME) return auth().redirectToSignIn();

  const appCookie = req.cookies.get(MASK_CHEF_APP_COOKIE_NAME)?.value;

  if (isProtectedRoute(req)) {
    auth().protect();
    if(!validateCookie(appCookie)){
      return NextResponse.redirect(new URL("/sign-out", req.url));
    }
  }

  if (isStagingRoute(req)) {
    auth().protect();

    if(validateCookie(appCookie)){
      console.log("STAGEEEEEEEEEEEE COOKIE OK")
      return NextResponse.redirect(new URL("/private/admin", req.url))
    }

    const isRegisteredUserResponse = await isRegisteredUser(auth().userId);
    if(isRegisteredUserResponse.redirectToDashboardAndSetCookie && isRegisteredUserResponse.cookie){
      const response = NextResponse.redirect(new URL("/private/admin", req.url));
      response.cookies.set({name: MASK_CHEF_APP_COOKIE_NAME, value: isRegisteredUserResponse.cookie, httpOnly: true, path: "/"});
      return response;
    }

    if(isRegisteredUserResponse.redirectToRegister){
      return NextResponse.redirect(new URL("/register", req.url))
    }

    if(isRegisteredUserResponse.redirectoToInvites){
      return NextResponse.redirect(new URL("/invites", req.url))
    }

    return NextResponse.redirect(new URL("/sign-out", req.url));
  }

  if(isRegisterRoute(req)){
    auth().protect();
  }

  if(isSignOutRoute(req)){
    if(appCookie){
      const response = NextResponse.redirect(new URL("/sign-out", req.url));
      response.cookies.delete({name: MASK_CHEF_APP_COOKIE_NAME});
      return response;
    }

    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = { matcher: '/((?!_next/image|_next/static|favicon.ico).*)'};
