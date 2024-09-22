// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://subgrapher.snapshot.org/delegation/1", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
