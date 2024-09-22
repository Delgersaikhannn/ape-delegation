// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const scoreClient = new ApolloClient({
  uri: "https://score.snapshot.org/api/scores", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default scoreClient;
