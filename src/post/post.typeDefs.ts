export default `#graphql
  type Post {
    id: String!
    title: String!
    content: String!
    userId: String!
    date: String!
    reactions: PostReactions
  }

  type PostReactions {
    id: String!
    thumbsUp: Int!
    hooray: Int!
    heart: Int!
    rocket: Int!
    eyes: Int!
  }

  type AddNewPostResponse {
    id: String!
    title: String!
    content: String!
    userId: String!
    date: String!
    reactions: PostReactions!
  }

  type Query {
    posts: [Post]!
  }

  type Mutation {
    addNewPost(title: String!, content: String!, userId: String!): AddNewPostResponse!
    updatePost(id: String!, title: String!, content: String!): Post!
    addPostReaction(postId: String!, reactionName: String!): MutationResponse!
  }
`;
