import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { Provider } from "./provider";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "./providerReactQuery";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mask Chef V2",
  description: "This is an app for restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning={true}
      >
        <ClerkProvider afterSignOutUrl={"/sign-out"}>
          <Provider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <div>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </div> */}
            <ReactQueryProvider>
              <Toaster />
              {children}
            </ReactQueryProvider>
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
