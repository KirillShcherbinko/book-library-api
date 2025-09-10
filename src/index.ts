import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './graphql/type-defs';
import { resolvers } from './graphql/resolvers';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { TGraphQLContext } from './types/context-types';
import { context } from './context';

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);

    const server = new ApolloServer<TGraphQLContext>({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
      context: async ({ req, res }) => context({ req, res }),
      listen: { port: Number(process.env.PORT) || 5000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error(error);
  }
};

startServer();
