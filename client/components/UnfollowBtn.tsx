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
import { useRouter } from "next/navigation";

type TgetUserById = GetAllTweetsOfUserQueryQuery["getUserById"];

const UnfollowBtn = ({ userInfo }: { userInfo: TgetUserById }) => {
  const { data: currentUser } = useLoggedInUser();
  const IsAFollower = userInfo?.followers?.find(
    (d) => d?.id === currentUser?.id
  );

  const router = useRouter();

  const followUnfollow = async () => {
    if (!userInfo) return;

    if (IsAFollower) {
      const { unfollowUser } = await graphqlClient.request<
        UnfollowUserMutationMutation,
        UnfollowUserMutationMutationVariables
      >(UnfollowUserMutationDocument, { to: userInfo.id });
      if (unfollowUser) router.refresh();
      return;
    }

    const { followUser } = await graphqlClient.request<
      FollowUserMutationMutation,
      FollowUserMutationMutationVariables
    >(FollowUserMutationDocument, { to: userInfo.id });
    if (followUser) router.refresh();
  };
  return (
    <>
      {currentUser?.id !== userInfo?.id && (
        <button
          className="bg-white text-black px-3 py-1 rounded-full text-sm cursor-pointer"
          onClick={followUnfollow}
        >
          {IsAFollower ? "Unfollow" : "follow"}
        </button>
      )}
    </>
  );
};

export default UnfollowBtn;
