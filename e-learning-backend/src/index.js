// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./config/db.js";
// import cors from "cors";

// dotenv.config();

// app.use(cors(
//   {
//     origin: 'http://localhost:3000'
//   }
// ));

// const PORT = process.env.PORT || 5000;

// // Connect DB, then start server
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import  app  from "./app.js";

import { typeDefs } from "./graphql/schema/typeDefs.js";
import { resolvers } from "./graphql/schema/resolvers.js";

// HTTP and WebSocket server imports
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
// GraphQL imports
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { authenticateGraphQL } from "./middleware/auth.js";

dotenv.config();
// ✅ Correct CORS setup
// app.use(
//   cors({
//     origin: "http://localhost:3000", // frontend URL
//     credentials: true,
//   })
// );

// REST routes
// app.use("/", routes);

// Connect DB
await connectDB();
console.log("MongoDB Connected");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);

// ✅ WebSocket server for GraphQL subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

await apolloServer.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(apolloServer, {
       context: async ({ req, res }) => {
      const user = authenticateGraphQL(req);
      return { req, res, user };
    },
  })
);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 REST at http://localhost:${PORT}`);
  console.log(`🚀 GraphQL at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
});


