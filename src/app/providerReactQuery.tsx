'use client'

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import {
  ReactQueryDevtools
} from "@tanstack/react-query-devtools";
import React from "react";

const queryClient = new QueryClient();

export function ReactQueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
