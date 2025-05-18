import axios from "axios";
import { prismaClient, redisClient } from "../../clients/index.js";
import JWTService from "../../services/jwt.js";
import { Response } from "express";
import { GraphqlContext } from "../../types.js";
import { User } from "../../../generate/index.js";

interface GoogleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (
    _: any,
    { token }: { token: string },
    { res }: { res: Response }
  ) => {
    const googleToken = token;
    const googleOauthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauthUrl.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(
      googleOauthUrl.toString(),
      {
        responseType: "json",
      }
    );

    let user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImgUrl: data.picture,
        },
      });
    }

    const Usertoken = JWTService.generateTokenForUser(user);

    res.cookie("auth_token", Usertoken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    });

    return true;
  },

  getCurrentUser: async (_: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) return null;

    const user = await prismaClient.user.findUnique({ where: { id } });
    return user;
  },

  getUserById: async (
    _: any,
    { userId }: { userId: string },
    ctx: GraphqlContext
  ) => {
    return prismaClient.user.findUnique({ where: { id: userId } });
  },
};

const ExtraResolvers = {
  User: {
    tweets: async (parent: User) => {
      const data = await prismaClient.tweet.findMany({
        where: { authorId: parent.id },
      });

      return data;
    },

    followers: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { following: { id: parent.id } },
        include: {
          follower: true,
        },
      });
      return result.map((el) => el.follower);
    },
    following: async (parent: User) => {
      const result = await prismaClient.follows.findMany({
        where: { follower: { id: parent.id } },
        include: {
          following: true,
        },
      });
      return result.map((el) => el.following);
    },

    recommendedUsers: async (parent: User, _: any, ctx: GraphqlContext) => {
      if (!ctx.user) return [];
      const cachedValue = await redisClient.get(
        `RECOMMENDED_USERS:${ctx.user.id}`
      );

      if (cachedValue) {
        console.log("Cache Found");
        return JSON.parse(cachedValue);
      }

      const myFollowings = await prismaClient.follows.findMany({
        where: {
          follower: { id: ctx.user.id },
        },
        include: {
          following: {
            include: { followers: { include: { following: true } } },
          },
        },
      });

      const users: User[] = [];

      for (const followings of myFollowings) {
        for (const followingOfFollowedUser of followings.following.followers) {
          if (
            followingOfFollowedUser.following.id !== ctx.user.id &&
            myFollowings.findIndex(
              (e) => e?.followingId === followingOfFollowedUser.following.id
            ) < 0
          ) {
            users.push(followingOfFollowedUser.following);
          }
        }
      }

      console.log("Cache Not Found");
      await redisClient.set(
        `RECOMMENDED_USERS:${ctx.user.id}`,
        JSON.stringify(users)
      );

      return users;
    },
  },
};

const mutations = {
  followUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");

    await prismaClient.follows.create({
      data: {
        follower: { connect: { id: ctx.user.id } },
        following: { connect: { id: to } },
      },
    });
    await redisClient.del(`RECOMMENDED_USERS:${ctx.user.id}`);
    return true;
  },
  unfollowUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");
    await prismaClient.follows.delete({
      where: {
        followerId_followingId: { followerId: ctx.user.id, followingId: to },
      },
    });
    await redisClient.del(`RECOMMENDED_USERS:${ctx.user.id}`);
    return true;
  },
};
export const resolvers = { queries, ExtraResolvers, mutations };
