import { useApollo } from "@/lib/apolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Inter, Roboto } from "next/font/google";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
