import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Provider } from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "./providerReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mask Chef V2",
  description: "This is an app for restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body
        className={cn("bg-background antialiased", inter.className)}
        suppressHydrationWarning={true}
      >
        <ClerkProvider afterSignOutUrl={"/sign-out"}>
          <Provider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              {children}
              <Toaster richColors />
            </ReactQueryProvider>
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
