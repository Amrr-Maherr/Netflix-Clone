"use client";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/Store/Store";

type GlobalProviderProps = {
  children: ReactNode;
};

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
}
