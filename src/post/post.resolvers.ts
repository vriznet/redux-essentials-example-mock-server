import { randomUUID } from 'crypto';
import client from '../client';
import { Resolvers } from '../type';
import dayjs from 'dayjs';
import { dayjsTimezone } from '../utils';

const resolvers: Resolvers = {
  Query: {
    posts: () =>
      client.post.findMany({
        include: {
          reactions: true,
        },
      }),
  },
  Mutation: {
    addNewPost: async (_, { title, content, userId }) => {
      dayjsTimezone();
      try {
        const newPost = await client.post.create({
          data: {
            id: randomUUID(),
            title,
            content,
            userId,
            date: dayjs().tz('Asia/Seoul').toDate(),
            reactions: {
              create: {
                id: randomUUID(),
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
              },
            },
          },
          include: {
            reactions: true,
          },
        });
        return newPost;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    updatePost: async (_, { id, title, content }) => {
      try {
        const post = await client.post.findUnique({
          where: {
            id,
          },
        });
        if (!post) return null;
        await client.post.update({
          where: {
            id,
          },
          data: {
            title,
            content,
          },
        });
        return await client.post.findUnique({
          where: {
            id,
          },
          include: {
            reactions: true,
          },
        });
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    addPostReaction: async (_, { postId, reactionName }) => {
      try {
        const reactions = await client.postReactions.findFirst({
          where: {
            postId,
          },
        });
        if (!reactions)
          return { ok: false, error: 'Reactions of post not found.' };
        await client.postReactions.update({
          where: {
            id: reactions.id,
          },
          data: {
            [reactionName]:
              reactions[
                reactionName as
                  | 'thumbsUp'
                  | 'hooray'
                  | 'heart'
                  | 'rocket'
                  | 'eyes'
              ] + 1,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: 'Cannot add reaction.',
        };
      }
    },
  },
};

export default resolvers;
