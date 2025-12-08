"use client";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/Store/Store";
import { Toaster } from "react-hot-toast";

type GlobalProviderProps = {
  children: ReactNode;
};

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </Provider>
  );
}
