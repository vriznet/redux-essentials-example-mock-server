export default `#graphql
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User]!
  }
`;
