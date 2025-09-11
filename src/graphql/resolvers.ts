import { searchBooks } from './../services/open-library-service';
import { fetchBook, fetchBooksByCategory } from '@/services/open-library-service';
import { login, logout, refresh, register } from '@/services/auth-service';
import { Resolvers } from '@/types/graphql-types';
import { clearCookies, setCookies } from '@/services/cookie-service';

export const resolvers: Resolvers = {
  Query: {
    booksByCategory: async (_, { category, limit, page }) => {
      return await fetchBooksByCategory(category, limit, page);
    },

    searchBooks: async (_, { searchQuery, limit, page }) => {
      return await searchBooks(searchQuery, limit, page);
    },

    book: async (__dirname, { key }) => {
      return await fetchBook(key);
    },

    refresh: async (_, __, context) => {
      const { refreshToken } = context;
      const { newRefreshToken } = await refresh(refreshToken);
      setCookies('refresh-token', newRefreshToken, context);
      return { refreshToken: newRefreshToken };
    },
  },
  Mutation: {
    login: async (_, { email, password }, context) => {
      const result = await login(email, password);
      setCookies('refresh-token', result.refreshToken, context);
      return result;
    },

    register: async (_, { email, password }, context) => {
      const result = await register(email, password);
      setCookies('refresh-token', result.refreshToken, context);
      return result;
    },

    logout: async (_, __, context) => {
      const { refreshToken } = context;
      await logout(refreshToken);
      clearCookies('refresh-token', context);
      return true;
    },
  },
};
