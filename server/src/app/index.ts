import { ApolloServer } from "@apollo/server";
import cors from "cors";
import express from "express";
import { User } from "./user/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import cookieParser from "cookie-parser";
import JWTService from "../services/jwt.js";
import { Tweet } from "./tweet/index.js";

export async function initServer() {
  const app = express();

  app.use(cookieParser());

  const typeDefs = `#graphql
      ${User.types}
      ${Tweet.types}
      
      type Query {
        ${User.queries}
        ${Tweet.queries}
      }

      type Mutation{
        ${Tweet.mutations}
        ${User.mutations}
      }
    `;

  const resolvers = {
    Query: {
      ...User.resolvers.queries,
      ...Tweet.resolver.queries,
    },
    Mutation: {
      ...Tweet.resolver.mutations,
      ...User.resolvers.mutations,
    },
    ...Tweet.resolver.resolvers,
    ...User.resolvers.ExtraResolvers,
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
        user: req.cookies?.auth_token
          ? JWTService.decodeToken(req.cookies.auth_token)
          : undefined,
      }),
    })
  );

  return app;
}
