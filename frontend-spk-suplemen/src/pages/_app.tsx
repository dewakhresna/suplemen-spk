import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ToasterProvider>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </ToasterProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
