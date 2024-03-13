import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const GRAPHQL_ENDPOINT: string | undefined = process.env.VUE_APP_GRAPHQL_ENDPOINT;
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
