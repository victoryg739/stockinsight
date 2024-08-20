// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "./ReactQueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
}
