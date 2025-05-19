/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query verifyUserGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    firstName\n    lastName\n    profileImgUrl\n    recommendedUsers {\n      firstName\n      profileImgUrl\n      id\n      lastName\n    }\n  }\n}": typeof types.VerifyUserGoogleTokenDocument,
    "query GetAllTweetsQuery {\n  getAllTweets {\n    id\n    content\n    imageURL\n    author {\n      firstName\n      lastName\n      profileImgUrl\n      id\n    }\n  }\n}\n\nquery GetAllTweetsOfUserQuery($userId: ID!) {\n  getUserById(userId: $userId) {\n    firstName\n    email\n    lastName\n    profileImgUrl\n    id\n    tweets {\n      content\n      id\n      author {\n        firstName\n        profileImgUrl\n      }\n    }\n    followers {\n      firstName\n      lastName\n      id\n    }\n    following {\n      firstName\n      lastName\n      id\n    }\n  }\n}\n\nquery getSignedURLForTweetQuery($imageType: String!, $imageName: String!) {\n  getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n}\n\nmutation createTweetMutation($payload: CreateTweetData!) {\n  createTweet(payload: $payload) {\n    id\n    content\n    imageURL\n  }\n}\n\nmutation followUserMutation($to: ID!) {\n  followUser(to: $to)\n}\n\nmutation unfollowUserMutation($to: ID!) {\n  unfollowUser(to: $to)\n}": typeof types.GetAllTweetsQueryDocument,
};
const documents: Documents = {
    "query verifyUserGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    firstName\n    lastName\n    profileImgUrl\n    recommendedUsers {\n      firstName\n      profileImgUrl\n      id\n      lastName\n    }\n  }\n}": types.VerifyUserGoogleTokenDocument,
    "query GetAllTweetsQuery {\n  getAllTweets {\n    id\n    content\n    imageURL\n    author {\n      firstName\n      lastName\n      profileImgUrl\n      id\n    }\n  }\n}\n\nquery GetAllTweetsOfUserQuery($userId: ID!) {\n  getUserById(userId: $userId) {\n    firstName\n    email\n    lastName\n    profileImgUrl\n    id\n    tweets {\n      content\n      id\n      author {\n        firstName\n        profileImgUrl\n      }\n    }\n    followers {\n      firstName\n      lastName\n      id\n    }\n    following {\n      firstName\n      lastName\n      id\n    }\n  }\n}\n\nquery getSignedURLForTweetQuery($imageType: String!, $imageName: String!) {\n  getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n}\n\nmutation createTweetMutation($payload: CreateTweetData!) {\n  createTweet(payload: $payload) {\n    id\n    content\n    imageURL\n  }\n}\n\nmutation followUserMutation($to: ID!) {\n  followUser(to: $to)\n}\n\nmutation unfollowUserMutation($to: ID!) {\n  unfollowUser(to: $to)\n}": types.GetAllTweetsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query verifyUserGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    firstName\n    lastName\n    profileImgUrl\n    recommendedUsers {\n      firstName\n      profileImgUrl\n      id\n      lastName\n    }\n  }\n}"): (typeof documents)["query verifyUserGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    email\n    firstName\n    lastName\n    profileImgUrl\n    recommendedUsers {\n      firstName\n      profileImgUrl\n      id\n      lastName\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllTweetsQuery {\n  getAllTweets {\n    id\n    content\n    imageURL\n    author {\n      firstName\n      lastName\n      profileImgUrl\n      id\n    }\n  }\n}\n\nquery GetAllTweetsOfUserQuery($userId: ID!) {\n  getUserById(userId: $userId) {\n    firstName\n    email\n    lastName\n    profileImgUrl\n    id\n    tweets {\n      content\n      id\n      author {\n        firstName\n        profileImgUrl\n      }\n    }\n    followers {\n      firstName\n      lastName\n      id\n    }\n    following {\n      firstName\n      lastName\n      id\n    }\n  }\n}\n\nquery getSignedURLForTweetQuery($imageType: String!, $imageName: String!) {\n  getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n}\n\nmutation createTweetMutation($payload: CreateTweetData!) {\n  createTweet(payload: $payload) {\n    id\n    content\n    imageURL\n  }\n}\n\nmutation followUserMutation($to: ID!) {\n  followUser(to: $to)\n}\n\nmutation unfollowUserMutation($to: ID!) {\n  unfollowUser(to: $to)\n}"): (typeof documents)["query GetAllTweetsQuery {\n  getAllTweets {\n    id\n    content\n    imageURL\n    author {\n      firstName\n      lastName\n      profileImgUrl\n      id\n    }\n  }\n}\n\nquery GetAllTweetsOfUserQuery($userId: ID!) {\n  getUserById(userId: $userId) {\n    firstName\n    email\n    lastName\n    profileImgUrl\n    id\n    tweets {\n      content\n      id\n      author {\n        firstName\n        profileImgUrl\n      }\n    }\n    followers {\n      firstName\n      lastName\n      id\n    }\n    following {\n      firstName\n      lastName\n      id\n    }\n  }\n}\n\nquery getSignedURLForTweetQuery($imageType: String!, $imageName: String!) {\n  getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n}\n\nmutation createTweetMutation($payload: CreateTweetData!) {\n  createTweet(payload: $payload) {\n    id\n    content\n    imageURL\n  }\n}\n\nmutation followUserMutation($to: ID!) {\n  followUser(to: $to)\n}\n\nmutation unfollowUserMutation($to: ID!) {\n  unfollowUser(to: $to)\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;