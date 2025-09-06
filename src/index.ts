import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { resolvers, typeDefs } from './graphql';

import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer<BaseContext>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 5000 },
});
console.log(`🚀  Server ready at: ${url}`);
