import { graphqlClient } from "@/clients/api";
import {
  GetCurrentUserDocument,
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@tanstack/react-query";

export const useLoggedInUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await graphqlClient.request<
        GetCurrentUserQuery,
        GetCurrentUserQueryVariables
      >(GetCurrentUserDocument);

      return res.getCurrentUser;
    },
  });
};
