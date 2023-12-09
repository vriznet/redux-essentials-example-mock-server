import { users } from '../data/users';
import { Resolvers } from '../type';

const resolvers: Resolvers = {
  Query: {
    users: () => users,
  },
};

export default resolvers;
