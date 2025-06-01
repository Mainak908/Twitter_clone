"use client";
import { BsArrowLeftShort } from "react-icons/bs";
import React from "react";
import UnfollowBtn from "@/components/UnfollowBtn";
import { graphqlClient } from "@/clients/api";
import {
  GetAllTweetsOfUserQueryDocument,
  GetAllTweetsOfUserQueryQuery,
  GetAllTweetsOfUserQueryQueryVariables,
} from "@/gql/graphql";
import FeedCard from "@/components/FeedCard";
import Image from "next/image";
import LeftBar from "@/components/LeftBar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader_Comp from "@/components/Loader_Comp";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const fetcherfn = async () => {
    const { getUserById } = await graphqlClient.request<
      GetAllTweetsOfUserQueryQuery,
      GetAllTweetsOfUserQueryQueryVariables
    >(GetAllTweetsOfUserQueryDocument, { userId: id });

    return getUserById;
  };

  const { data: getUserById, isLoading } = useQuery({
    queryFn: fetcherfn,
    queryKey: ["myTweets"],
  });
  if (isLoading) return <Loader_Comp />;
  return (
    <div className=" w-screen flex ">
      <LeftBar />

      <div className=" border-r-[1px] border-l-[1px]  border-gray-600 mx-auto max-w-[550px]">
        <nav className="flex items-center gap-3 py-3 px-3">
          <Link href={"/home"}>
            <BsArrowLeftShort className="text-4xl" />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">
              {getUserById?.firstName} {getUserById?.lastName}
            </h1>
            <h1 className="text-md font-bold text-slate-500">
              {getUserById?.tweets?.length} Tweets
            </h1>
          </div>
        </nav>
        <div className="p-4 border-b border-slate-800">
          {getUserById?.profileImgUrl && (
            <Image
              src={getUserById.profileImgUrl}
              alt="user-image"
              className="rounded-full"
              width={100}
              height={100}
            />
          )}
          <h1 className="text-2xl font-bold mt-5">
            {getUserById?.firstName} {getUserById?.lastName}
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              <span>{getUserById?.followers?.length} followers</span>
              <span>{getUserById?.following?.length} following</span>
            </div>
            <UnfollowBtn userInfo={getUserById} />
          </div>
        </div>
        <div>
          {getUserById?.tweets?.map(
            (tweet) => tweet && <FeedCard data={tweet} key={tweet?.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
