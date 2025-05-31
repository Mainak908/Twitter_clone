"use client";
import { MessageCircle, Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import CommentsTree from "./InfiniteComments";
import {
  CommentTweetMutationDocument,
  CommentTweetMutationMutation,
  CommentTweetMutationMutationVariables,
  GetOneTweetDetailsQueryQuery,
  User,
} from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IoIosHeart } from "react-icons/io";

type Dtype = GetOneTweetDetailsQueryQuery["getOneTweetDetails"];

export default function TweetCard({ data }: { data: Dtype }) {
  const [content, setcontent] = useState("");
  const queryClient = useQueryClient();

  const [loading, setloading] = useState(false);

  if (!data) return;

  const commentTweetHandler = async () => {
    setloading(true);
    const { CommentTweet } = await graphqlClient.request<
      CommentTweetMutationMutation,
      CommentTweetMutationMutationVariables
    >(CommentTweetMutationDocument, {
      payload: {
        content,

        parentCommentid: data.id,
      },
    });
    setloading(false);
    setcontent("");
    if (CommentTweet) {
      queryClient.invalidateQueries({ queryKey: ["oneTweet"] });
      toast("success");
    }
  };
  const dislikehandler = () => {};
  const likehandler = () => {};
  return (
    <div className="w-xl mx-auto border-b border-gray-700 px-4 py-6 text-white">
      {/* Header: Avatar + Author */}
      <div className="flex gap-3">
        <img
          src={data.author.profileImgUrl}
          alt="Chennai Super Kings"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">
              {data.author.firstName} {data.author.lastName}
            </span>
            <span className="text-gray-500">
              @{data.author.username} ·{" "}
              {new Date(parseInt(data.createdAt)).toDateString()}
            </span>
          </div>

          {/* Tweet Text */}
          <div className="mt-1 text-base leading-relaxed">{data.content}</div>

          {/* Media */}
          {data.imageURL && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
              <img
                src={data.imageURL}
                alt="Tweet media"
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between mt-4 text-sm text-gray-500 max-w-md">
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

          {/* Divider */}
          <div className="my-5 border-t border-gray-700" />
          <div className="flex my-4 w-full ">
            <img
              src={data.author.profileImgUrl}
              alt={data.author.profileImgUrl}
              className="w-10 h-10 rounded-full"
            />
            <textarea
              className="w-full bg-transparent text-xl px-3 focus:outline-none resize-none"
              placeholder="Post Your Reply"
              rows={2}
              value={content}
              onChange={(e) => setcontent(e.target.value)}
            />
            <Button
              className="px-4 font-bold py-3 rounded-2xl cursor-pointer"
              onClick={commentTweetHandler}
            >
              Reply {loading && <Loader2 className="animate-spin" />}
            </Button>
          </div>

          <div className=" border-t border-gray-700" />

          {/* Comments */}
          <div className="space-y-4 my-5">
            {data.comments && <CommentsTree comment={data.comments} />}
          </div>
        </div>
      </div>
    </div>
  );
}
