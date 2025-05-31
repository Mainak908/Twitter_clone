export const types = `#graphql

    input CreateTweetData {
        content: String!
        imageURL: String
    }

    input CommentTweetData {
        content: String!
        imageURL: String
        parentCommentid: ID!
    }

    type Tweet {
        id: ID!
        content: String!
        imageURL: String

        author: User!
        comments: [Tweet]
        
        createdAt:String!
        isLikedByMe: Boolean!
        LikeCount:Int!
        CommentCount:Int!
    }

`;
