"use client";

import { useLoggedInUser } from "@/hooks/user_check";
import React, { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { graphqlClient } from "@/clients/api";
import {
  CreateTweetMutationDocument,
  CreateTweetMutationMutation,
  CreateTweetMutationMutationVariables,
  GetSignedUrlForTweetQueryDocument,
  GetSignedUrlForTweetQueryQuery,
  GetSignedUrlForTweetQueryQueryVariables,
} from "@/gql/graphql";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const TweetSection = () => {
  const { data: user, isLoading } = useLoggedInUser();

  const [content, setContent] = useState("");
  const [image, setImage] = useState<{ img: File; src: string }>();
  const [loading, setloading] = useState(false);
  const router = useRouter();

  let imageURL: string;

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.click();

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];

      if (file) {
        imageURL = URL.createObjectURL(file);

        setImage({ img: file, src: imageURL });
      }
    };
  }, []);

  async function handleCreateTweet() {
    let imageUrl: string | null = null;
    setloading(true);

    if (image) {
      const { getSignedURLForTweet } = await graphqlClient.request<
        GetSignedUrlForTweetQueryQuery,
        GetSignedUrlForTweetQueryQueryVariables
      >(GetSignedUrlForTweetQueryDocument, {
        imageName: image.img.name,
        imageType: image.img.type,
      });

      if (!getSignedURLForTweet) return;

      const uploadResponse = await fetch(getSignedURLForTweet, {
        method: "PUT",
        body: image.img,
        headers: {
          "Content-Type": image.img.type,
        },
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");

      imageUrl = getSignedURLForTweet.split("?")[0];
      URL.revokeObjectURL(imageURL);
    }

    const { createTweet } = await graphqlClient.request<
      CreateTweetMutationMutation,
      CreateTweetMutationMutationVariables
    >(CreateTweetMutationDocument, {
      payload: {
        content,
        imageURL: imageUrl || null,
      },
    });

    setloading(false);
    setContent("");
    setImage(undefined);

    toast.success("success");
    router.refresh();
  }

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {user?.profileImgUrl && (
            <Image
              className="rounded-full"
              src={user?.profileImgUrl}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
            placeholder="What's happening?"
            rows={3}
          ></textarea>
          {image && (
            <Image src={image.src} alt="tweet-image" width={300} height={300} />
          )}
          <div className="mt-2 flex justify-between items-center">
            <BiImageAlt
              onClick={handleSelectImage}
              className="text-xl cursor-pointer"
            />
            <Button
              onClick={handleCreateTweet}
              disabled={loading || !user}
              className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full cursor-pointer"
            >
              Tweet {loading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetSection;
