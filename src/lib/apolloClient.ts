import { isServer } from "@/utils";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";

let _apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return { headers };
  });

  return new ApolloClient({
    ssrMode: isServer(),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState: NormalizedCacheObject = {}) => {
  const _apolloClientLocal = _apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClientLocal.extract();
    _apolloClientLocal.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (isServer()) {
    return _apolloClientLocal;
  }

  // Create the Apollo Client once in the client
  if (!_apolloClient) {
    _apolloClient = _apolloClientLocal;
  }

  return _apolloClient;
};

export const useApollo = (
  initialState: NormalizedCacheObject,
) => {
  const store = React.useMemo(
    () => initializeApollo(initialState),
    [initialState]
  );
  return store;
};
