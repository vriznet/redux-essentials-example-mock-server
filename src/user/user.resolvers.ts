import client from '../client';
import { Resolvers } from '../type';

const resolvers: Resolvers = {
  Query: {
    users: () => client.user.findMany(),
  },
};

export default resolvers;
