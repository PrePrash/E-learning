"use client";

import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// // 1. HTTP link for queries/mutations
// const httpLink = new HttpLink({
//   uri: "http://localhost:5000/graphql", // your backend
// });

// // 2. WebSocket link for subscriptions
// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://localhost:5000/graphql", // must match backend
//   })
// );

// // 3. Split based on operation type
// const splitLink = split(
//   ({ query }) => {
//     const def = getMainDefinition(query);
//     return (
//       def.kind === "OperationDefinition" && def.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// // 4. Apollo client
// export const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });
const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    authorization: typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
  },
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:5000/graphql",
          connectionParams: {
            authorization: localStorage.getItem("token") || "",
          },
        })
      )
    : null;

const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});