/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTweetData = {
  content: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTweet?: Maybe<Tweet>;
  followUser?: Maybe<Scalars['Boolean']['output']>;
  unfollowUser?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateTweetArgs = {
  payload: CreateTweetData;
};


export type MutationFollowUserArgs = {
  to: Scalars['ID']['input'];
};


export type MutationUnfollowUserArgs = {
  to: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllTweets?: Maybe<Array<Maybe<Tweet>>>;
  getCurrentUser?: Maybe<User>;
  getSignedURLForTweet?: Maybe<Scalars['String']['output']>;
  getUserById?: Maybe<User>;
  verifyGoogleToken: Scalars['Boolean']['output'];
};


export type QueryGetSignedUrlForTweetArgs = {
  imageName: Scalars['String']['input'];
  imageType: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryVerifyGoogleTokenArgs = {
  token: Scalars['String']['input'];
};

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profileImgUrl: Scalars['String']['output'];
  recommendedUsers?: Maybe<Array<Maybe<User>>>;
  tweets?: Maybe<Array<Maybe<Tweet>>>;
};

export type VerifyUserGoogleTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyUserGoogleTokenQuery = { __typename?: 'Query', verifyGoogleToken: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, profileImgUrl: string, recommendedUsers?: Array<{ __typename?: 'User', firstName: string, profileImgUrl: string, id: string, lastName?: string | null } | null> | null } | null };

export type GetAllTweetsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTweetsQueryQuery = { __typename?: 'Query', getAllTweets?: Array<{ __typename?: 'Tweet', id: string, content: string, imageURL?: string | null, author?: { __typename?: 'User', firstName: string, lastName?: string | null, profileImgUrl: string, id: string } | null } | null> | null };

export type GetAllTweetsOfUserQueryQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetAllTweetsOfUserQueryQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', firstName: string, email: string, lastName?: string | null, profileImgUrl: string, id: string, tweets?: Array<{ __typename?: 'Tweet', content: string, id: string, author?: { __typename?: 'User', firstName: string, profileImgUrl: string } | null } | null> | null, followers?: Array<{ __typename?: 'User', firstName: string, lastName?: string | null, id: string } | null> | null, following?: Array<{ __typename?: 'User', firstName: string, lastName?: string | null, id: string } | null> | null } | null };

export type GetSignedUrlForTweetQueryQueryVariables = Exact<{
  imageType: Scalars['String']['input'];
  imageName: Scalars['String']['input'];
}>;


export type GetSignedUrlForTweetQueryQuery = { __typename?: 'Query', getSignedURLForTweet?: string | null };

export type CreateTweetMutationMutationVariables = Exact<{
  payload: CreateTweetData;
}>;


export type CreateTweetMutationMutation = { __typename?: 'Mutation', createTweet?: { __typename?: 'Tweet', id: string, content: string, imageURL?: string | null } | null };

export type FollowUserMutationMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type FollowUserMutationMutation = { __typename?: 'Mutation', followUser?: boolean | null };

export type UnfollowUserMutationMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type UnfollowUserMutationMutation = { __typename?: 'Mutation', unfollowUser?: boolean | null };


export const VerifyUserGoogleTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"verifyUserGoogleToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyGoogleToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyUserGoogleTokenQuery, VerifyUserGoogleTokenQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"recommendedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetAllTweetsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTweetsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTweetsQueryQuery, GetAllTweetsQueryQueryVariables>;
export const GetAllTweetsOfUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTweetsOfUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImgUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTweetsOfUserQueryQuery, GetAllTweetsOfUserQueryQueryVariables>;
export const GetSignedUrlForTweetQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSignedURLForTweetQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignedURLForTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imageType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageType"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}}}]}]}}]} as unknown as DocumentNode<GetSignedUrlForTweetQueryQuery, GetSignedUrlForTweetQueryQueryVariables>;
export const CreateTweetMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTweetMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTweetData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}}]}}]} as unknown as DocumentNode<CreateTweetMutationMutation, CreateTweetMutationMutationVariables>;
export const FollowUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"followUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<FollowUserMutationMutation, FollowUserMutationMutationVariables>;
export const UnfollowUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unfollowUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<UnfollowUserMutationMutation, UnfollowUserMutationMutationVariables>;