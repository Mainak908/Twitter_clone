"use client";

import { graphqlClient } from "@/clients/api";
import {
  FollowUserMutationDocument,
  FollowUserMutationMutation,
  FollowUserMutationMutationVariables,
  GetAllTweetsOfUserQueryQuery,
  UnfollowUserMutationDocument,
  UnfollowUserMutationMutation,
  UnfollowUserMutationMutationVariables,
} from "@/gql/graphql";
import { useLoggedInUser } from "@/hooks/user_check";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type TgetUserById = GetAllTweetsOfUserQueryQuery["getUserById"];

const UnfollowBtn = ({ userInfo }: { userInfo: TgetUserById }) => {
  const { data: currentUser } = useLoggedInUser();
  const IsAFollower = userInfo?.followers?.find(
    (d) => d?.id === currentUser?.id
  );
  const [loading, setloading] = useState(false);

  const queryClient = useQueryClient();

  const followUnfollow = async () => {
    setloading(true);
    if (!userInfo) return;

    if (IsAFollower) {
      const { unfollowUser } = await graphqlClient.request<
        UnfollowUserMutationMutation,
        UnfollowUserMutationMutationVariables
      >(UnfollowUserMutationDocument, { to: userInfo.id });
      if (unfollowUser)
        queryClient.invalidateQueries({ queryKey: ["myTweets"] });
      setloading(false);
      return;
    }

    const { followUser } = await graphqlClient.request<
      FollowUserMutationMutation,
      FollowUserMutationMutationVariables
    >(FollowUserMutationDocument, { to: userInfo.id });
    if (followUser) queryClient.invalidateQueries({ queryKey: ["myTweets"] });
    setloading(false);
  };
  return (
    <>
      {currentUser?.id !== userInfo?.id && (
        <Button
          className="bg-white text-black px-3 py-1 rounded-full text-sm cursor-pointer"
          onClick={followUnfollow}
        >
          {IsAFollower ? "Unfollow" : "follow"}
          {loading && <Loader2 className="animate-spin" />}
        </Button>
      )}
    </>
  );
};

export default UnfollowBtn;
