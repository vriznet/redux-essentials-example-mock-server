export default `#graphql
  type User {
    id: String!
    name: String!
    posts: [Post]!
    notifications: [Notification]!
  }

  type Query {
    users: [User]!
  }
`;
