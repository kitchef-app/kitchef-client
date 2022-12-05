import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://kitchef-server-production-0b8f.up.railway.app",
  cache: new InMemoryCache(),
});

export default client;
