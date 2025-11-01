"use client"
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type GlobalProviderProps = {
  children: ReactNode;
};


export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
