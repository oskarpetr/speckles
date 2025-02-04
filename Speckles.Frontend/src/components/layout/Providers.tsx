"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Toast from "../shared/Toast";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: ReactNode;
  session?: any;
}

export default function Providers({ children, session }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}

        <Toast />

        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
}
