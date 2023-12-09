import { posts } from '../data/posts';
import { Resolvers } from '../type';

const resolvers: Resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    addNewPost: (_, { title, content, userId }) => {
      const newPost = {
        id: String(posts.length + 1),
        title,
        content,
        userId,
        date: new Date().toISOString(),
        reactions: {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        },
      };
      posts.push(newPost);
      return newPost;
    },
  },
};

export default resolvers;
