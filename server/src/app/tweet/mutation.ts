export const mutations = `#graphql
    createTweet(payload: CreateTweetData!): Tweet
    LikeTweet(id: ID!): Boolean
    disLikeTweet(id: ID!): Boolean
    
    CommentTweet(payload: CommentTweetData!): Boolean
`;
