import { useApollo } from "@/lib/apolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Provider } from 'react-redux';
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { persistor, store } from "@/lib/redux/store";
import { FLUSH } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';

const roboto = Roboto({ weight: "400", subsets: ["latin-ext"] });

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <main className={roboto.className}>
            <Component {...pageProps} />
          </main>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}