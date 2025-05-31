"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DisLikeTweetMutationDocument,
  DisLikeTweetMutationMutation,
  DisLikeTweetMutationMutationVariables,
  GetAllTweetsOfUserQueryQuery,
  GetAllTweetsQueryQuery,
  LikeTweetMutationDocument,
  LikeTweetMutationMutation,
  LikeTweetMutationMutationVariables,
} from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { useRouter } from "next/navigation";
import { MessageCircle, Heart } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { IoIosHeart } from "react-icons/io";

type Tweet = NonNullable<GetAllTweetsQueryQuery["getAllTweets"]>[number];
type tType = NonNullable<GetAllTweetsQueryQuery["getAllTweets"]>;

type myTweetsType = NonNullable<GetAllTweetsOfUserQueryQuery>;

const FeedCard = ({ data }: { data: Tweet }) => {
  if (!data) return null;
  const router = useRouter();
  const queryClient = useQueryClient();

  const redirectHandler = () => {
    router.push(`${data.author?.username}/status/${data.id}`);
  };
  const likehandler = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const { LikeTweet } = await graphqlClient.request<
      LikeTweetMutationMutation,
      LikeTweetMutationMutationVariables
    >(LikeTweetMutationDocument, { id: data.id });

    if (LikeTweet) {
      queryClient.setQueryData(
        ["AllTweets"],
        (prev: tType) =>
          prev &&
          prev?.map((p) =>
            p && p.id === data.id
              ? { ...p, isLikedByMe: true, LikeCount: p.LikeCount + 1 }
              : p
          )
      );

      queryClient.invalidateQueries({ queryKey: ["myTweets"] });
    }
  };

  const dislikehandler = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const { disLikeTweet } = await graphqlClient.request<
      DisLikeTweetMutationMutation,
      DisLikeTweetMutationMutationVariables
    >(DisLikeTweetMutationDocument, { id: data.id });
    if (disLikeTweet) {
      queryClient.setQueryData(
        ["AllTweets"],
        (prev: tType) =>
          prev &&
          prev?.map((p) =>
            p && p.id === data.id
              ? { ...p, isLikedByMe: false, LikeCount: p.LikeCount - 1 }
              : p
          )
      );

      queryClient.invalidateQueries({ queryKey: ["myTweets"] });
    }
  };
  return (
    <div
      className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer"
      onClick={redirectHandler}
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImgUrl && (
            <Image
              className="rounded-full"
              src={data.author.profileImgUrl}
              alt="user-image"
              height={50}
              width={50}
              onClick={(e) => {
                router.push(data.author.username);
                e.stopPropagation();
              }}
            />
          )}
        </div>
        <div className="col-span-11">
          <div className="flex gap-2">
            <h5>
              <Link
                href={`/${data.author?.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                {data.author?.firstName} {data.author?.lastName}
              </Link>
            </h5>
            <h5>@{data.author?.username}</h5>
          </div>

          <p>{data.content}</p>
          {data.imageURL && (
            <Image
              src={data.imageURL}
              alt="image"
              width={400}
              height={400}
              className="rounded-xl mt-2"
            />
          )}
          <div className="flex justify-between  text-xl items-center p-2 w-[90%]">
            <div className="flex gap-4 text-gray-500 mt-2">
              <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>{data.CommentCount}</span>
              </div>

              {data.isLikedByMe ? (
                <div className="flex items-center gap-2 text-pink-500 cursor-pointer ">
                  <IoIosHeart className="w-4 h-4" onClick={dislikehandler} />
                  <span>{data.LikeCount}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 hover:text-pink-500 cursor-pointer ">
                  <Heart className="w-4 h-4" onClick={likehandler} />
                  <span>{data.LikeCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
