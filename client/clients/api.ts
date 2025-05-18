import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_URL}/graphql`,
  {
    credentials: "include",
  }
);

export const publicGraphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL!,
  {
    credentials: "omit", // Don't send cookies
  }
);
