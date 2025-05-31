import { Tweet } from "../../../generate/index.js";
import { prismaClient, redisClient, s3Client } from "../../clients/index.js";
import { GraphqlContext } from "../../types.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface CreateTweetPayload {
  content: string;
  imageURL?: string;
}
export interface CommentTweetPayload {
  content: string;
  imageURL?: string;
  parentCommentid: string;
}

const queries = {
  getOneTweetDetails: (_: any, { id }: { id: string }) =>
    prismaClient.tweet.findFirst({
      where: {
        id,
      },
    }),

  getChildComments: (_: any, { id }: { id: string }) =>
    prismaClient.tweet.findMany({
      where: {
        parentCommentId: id,
      },
    }),

  getAllTweets: async () => {
    const cachedTweets = await redisClient.get("ALL_TWEETS");
    if (cachedTweets) return JSON.parse(cachedTweets);

    const tweets = await prismaClient.tweet.findMany({
      where: {
        parentCommentId: null,
      },
      orderBy: { createdAt: "desc" },
    });
    await redisClient.set("ALL_TWEETS", JSON.stringify(tweets));
    return tweets;
  },
  getSignedURLForTweet: async (
    parent: any,
    { imageType, imageName }: { imageType: string; imageName: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");
    const allowedImageTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedImageTypes.includes(imageType))
      throw new Error("Unsupported Image Type");

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      ContentType: imageType,
      Key: `uploads/${ctx.user.id}/${imageName}`,
    });

    const signedURL = await getSignedUrl(s3Client, putObjectCommand);

    return signedURL;
  },
};

const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    const tweet = await prismaClient.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: { connect: { id: ctx.user.id } },
      },
    });
    await redisClient.del("ALL_TWEETS");
    return tweet;
  },

  LikeTweet: async (
    parent: any,
    { id }: { id: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    await prismaClient.like.create({
      data: {
        userId: ctx.user.id,
        tweetId: id,
      },
    });

    return true;
  },

  disLikeTweet: async (
    parent: any,
    { id }: { id: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    await prismaClient.like.delete({
      where: {
        userId_tweetId: {
          tweetId: id,
          userId: ctx.user.id,
        },
      },
    });

    return true;
  },

  CommentTweet: async (
    parent: any,
    { payload }: { payload: CommentTweetPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    await prismaClient.tweet.create({
      data: {
        content: payload.content,
        authorId: ctx.user.id,
        imageURL: payload.imageURL,
        parentCommentId: payload.parentCommentid,
      },
    });

    return true;
  },
};

const resolvers = {
  Tweet: {
    author: (parent: Tweet) => {
      return prismaClient.user.findUnique({
        where: { id: parent.authorId },
      });
    },
    comments: async (parent: Tweet) => {
      return prismaClient.tweet.findMany({
        where: {
          parentCommentId: parent.id,
        },
      });
    },
    LikeCount: (parent: Tweet) =>
      prismaClient.like.count({
        where: {
          tweetId: parent.id,
        },
      }),
    CommentCount: (parent: Tweet) =>
      prismaClient.tweet.count({
        where: {
          parentCommentId: parent.id,
        },
      }),
    isLikedByMe: async (parent: Tweet, _: any, context: GraphqlContext) => {
      const userId = context.user?.id;
      console.log("last");
      if (!userId) return false;
      console.log("first");
      const like = await prismaClient.like.findUnique({
        where: {
          userId_tweetId: {
            userId,
            tweetId: parent.id,
          },
        },
      });

      return Boolean(like);
    },
  },
};

export const resolver = { mutations, resolvers, queries };
