import { ApolloServer } from '@apollo/server';
import execSchema from './execSchema';
import express from 'express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

interface IContext {
  token?: string;
}

require('dotenv').config();

const startServer = async () => {
  const PORT = (process.env.PORT && +process.env.PORT) || 4000;

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<IContext>({
    schema: execSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
