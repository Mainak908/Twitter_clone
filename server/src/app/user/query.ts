export const queries = `#graphql
    verifyGoogleToken(token:String!,username:String!):Boolean!
    getCurrentUser:User

    getUserById(userId:ID!): User
    CheckUsername(username:String!):Boolean!
    checkUserExist(token:String!):Boolean!
    loginUser(token:String!):Boolean!
`;
