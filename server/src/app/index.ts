import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const server = new ApolloServer({
    typeDefs: `
        type Query {
            sayHello:String
        }
    `,
    resolvers: {
      Query: {
        sayHello: () => `hello from server`,
      },
    },
  });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );
  return app;
}
