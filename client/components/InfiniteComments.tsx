"use client";
import { graphqlClient } from "@/clients/api";
import {
  DisLikeTweetMutationDocument,
  DisLikeTweetMutationMutation,
  DisLikeTweetMutationMutationVariables,
  GetOneTweetDetailsQueryQuery,
  LikeTweetMutationDocument,
  LikeTweetMutationMutation,
  LikeTweetMutationMutationVariables,
  User,
} from "@/gql/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosHeart } from "react-icons/io";

type Dtype = NonNullable<
  NonNullable<GetOneTweetDetailsQueryQuery["getOneTweetDetails"]>["comments"]
>;
type Ctype = NonNullable<
  NonNullable<
    NonNullable<GetOneTweetDetailsQueryQuery["getOneTweetDetails"]>["comments"]
  >[number]
>;

function CommentItem({ comment }: { comment: Ctype }) {
  const queryClient = useQueryClient();
  const [showReplies, setShowReplies] = useState(false);
  const router = useRouter();
  const dislikehandler = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    e.stopPropagation();
    const { disLikeTweet } = await graphqlClient.request<
      DisLikeTweetMutationMutation,
      DisLikeTweetMutationMutationVariables
    >(DisLikeTweetMutationDocument, { id: comment.id });
    if (disLikeTweet) {
      queryClient.invalidateQueries({ queryKey: ["oneTweet"] });
    }
  };

  const likehandler = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const { LikeTweet } = await graphqlClient.request<
      LikeTweetMutationMutation,
      LikeTweetMutationMutationVariables
    >(LikeTweetMutationDocument, { id: comment.id });

    if (LikeTweet) queryClient.invalidateQueries({ queryKey: ["oneTweet"] });
  };

  const myFunction = <T extends React.MouseEvent<any>>(e: T) => {
    router.push(`/${comment.author.username}`);
    e.stopPropagation();
  };

  return (
    <div
      className=" mt-4 w-full hover:bg-slate-900 p-2 "
      onClick={() => router.push(`${comment.id}`)}
    >
      <div
        key={comment.id}
        onClick={() => setShowReplies(!showReplies)}
        className=" cursor-pointer"
      >
        <div className="flex gap-3">
          <img
            src={comment.author.profileImgUrl}
            alt={" "}
            className="w-10 h-10 rounded-full"
            onClick={(e) => myFunction(e)}
          />
          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold" onClick={(e) => myFunction(e)}>
                {comment.author.firstName} {comment.author.lastName}
              </span>

              <span className="text-gray-500" onClick={(e) => myFunction(e)}>
                {comment.author.username} .{" "}
                {new Date(parseInt(comment.createdAt)).toDateString()}
              </span>
            </div>
            <div className="text-sm text-gray-300">{comment.content}</div>
          </div>
        </div>
        <div className="flex gap-4 text-gray-500 mt-2">
          <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            <span>{comment.CommentCount}</span>
          </div>
          {comment.isLikedByMe ? (
            <div className="flex items-center gap-2 text-pink-500 cursor-pointer ">
              <IoIosHeart className="w-4 h-4" onClick={dislikehandler} />
              <span>{comment.LikeCount}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 hover:text-pink-500 cursor-pointer ">
              <Heart className="w-4 h-4" onClick={likehandler} />
              <span>{comment.LikeCount}</span>
            </div>
          )}
        </div>

        <div className="my-5 border-t border-gray-700" />
      </div>
    </div>
  );
}

export default function CommentsTree({ comment }: { comment: Dtype }) {
  return (
    <div className="text-white max-w-xl mx-auto px-4 py-6">
      {comment.map((com) => com && <CommentItem key={com.id} comment={com} />)}
    </div>
  );
}
