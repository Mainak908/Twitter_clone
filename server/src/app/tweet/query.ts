export const queries = `#graphql
    getAllTweets: [Tweet]
    getSignedURLForTweet(imageName: String!, imageType: String!): String
    getOneTweetDetails(id:ID!):Tweet
    getChildComments(id:ID!):[Tweet]
`;
