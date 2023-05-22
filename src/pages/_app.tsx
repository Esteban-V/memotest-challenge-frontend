import { useApollo } from "@/lib/apolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin-ext"] });

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}