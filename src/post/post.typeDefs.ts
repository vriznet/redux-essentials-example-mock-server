export default `#graphql
  type Post {
    id: String!
    title: String!
    content: String!
    userId: String!
    date: String!
    reactions: PostReactions!
  }

  type PostReactions {
    thumbsUp: Int!
    hooray: Int!
    heart: Int!
    rocket: Int!
    eyes: Int!
  }

  type Query {
    posts: [Post]!
  }

  type Mutation {
    addNewPost(title: String!, content: String!, userId: String!): Post!
  }
`;
