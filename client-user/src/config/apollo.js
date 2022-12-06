import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CustomInMemoryCache } from "../cache/cache";

const client = new ApolloClient({
  uri: "https://kitchef-server-production-0b8f.up.railway.app/",
  cache: CustomInMemoryCache,
});

export default client;
