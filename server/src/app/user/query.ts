export const queries = `#graphql
    verifyGoogleToken(token:String!):Boolean!
    getCurrentUser:User

    getUserById(userId:ID!): User
`;
