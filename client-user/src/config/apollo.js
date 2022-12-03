import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://791a-2001-448a-2061-8d66-9d39-4fa2-8a0a-3c5e.ap.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
