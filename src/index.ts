import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs } from './graphql/type-defs';
import { resolvers } from './graphql/resolvers';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { TGraphQLContext } from './types/context-types';
import { context } from './context';

dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);

    const server = new ApolloServer<TGraphQLContext>({ typeDefs, resolvers });
    await server.start();

    const app: Express = express();

    app.use(
      '/',
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req, res }: { req: Request; res: Response }) => context({ req, res }),
      }),
    );

    const PORT: number = Number(process.env.PORT) || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
