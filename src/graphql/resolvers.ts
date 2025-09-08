import { getBooksByCategory } from '@/services';
import { TGetBooksParams } from '@/types';
import { Resolvers } from '@/types/graphql-types';
import { GraphQLError } from 'graphql';

export const resolvers: Resolvers = {
  Query: {
    booksByCategory: async (_: unknown, { category, limit, page }) => {
      try {
        return getBooksByCategory(category, limit, page);
      } catch (error) {
        throw new GraphQLError('Can`t get books by category');
      }
    },
  },
};
