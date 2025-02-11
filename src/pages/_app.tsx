import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer toastClassName="custom-toast" />
    </QueryClientProvider>
  );
}