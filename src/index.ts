import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import execSchema from './execSchema';

require('dotenv').config();

const startServer = async () => {
  const PORT = (process.env.PORT && +process.env.PORT) || 4000;

  const server = new ApolloServer({
    schema: execSchema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
