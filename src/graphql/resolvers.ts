import { getBooksByCategory } from '@/services';
import { TGetBooksParams } from '@/types';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    booksByCategory: async (_: unknown, { category, limit, page }: TGetBooksParams) => {
      try {
        return getBooksByCategory(category, limit, page);
      } catch (error) {
        throw new GraphQLError('Can`t get books by category');
      }
    },
  },
};
