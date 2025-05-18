import { graphqlClient } from "@/clients/api";
import {
  GetAllTweetsQueryDocument,
  GetAllTweetsQueryQuery,
  GetAllTweetsQueryQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@tanstack/react-query";

export const useTweets = () => {
  return useQuery({
    queryKey: ["allTweets"],
    queryFn: async () => {
      const res = await graphqlClient.request<
        GetAllTweetsQueryQuery,
        GetAllTweetsQueryQueryVariables
      >(GetAllTweetsQueryDocument);

      return res.getAllTweets;
    },
  });
};
