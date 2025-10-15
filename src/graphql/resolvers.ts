import { fetchPopularBooksSubject, fetchSubjects } from '@/services/subjects-service';
import { fetchBook, fetchBooksBySubject, searchBooks } from '@/services/open-library-service';
import { login, logout, refresh, register } from '@/services/auth-service';
import { Resolvers } from '@/types/graphql-types';
import { clearCookies, setCookies } from '@/services/cookie-service';
import { authUser } from '@/helpers/auth-user';
import type { TGraphQLContext } from '@/types/context-types';
import {
  addBookToLibrary,
  getUserBooks,
  removeBookFromLibrary,
} from '@/services/user-books-service';

export const resolvers: Resolvers = {
  Query: {
    booksBySubject: async (_, { subject, limit, offset }) => {
      return await fetchBooksBySubject(subject, limit, offset);
    },

    searchBooks: async (_, { searchQuery, limit, offset }) => {
      return await searchBooks(searchQuery, limit, offset);
    },

    book: async (__dirname, { key }, context: TGraphQLContext) => {
      let userId: string | undefined = undefined;

      // Проверяем, есть ли вообще авторизация
      try {
        userId = authUser(context);
      } catch {
        userId = undefined;
      }

      return await fetchBook(key, userId);
    },

    userBooks: async (_, { limit, offset }, context: TGraphQLContext) => {
      const userId = authUser(context);
      return await getUserBooks(userId, limit, offset);
    },

    refresh: async (_, __, context) => {
      const { refreshToken } = context;
      const { accessToken, newRefreshToken } = await refresh(refreshToken);
      setCookies('refresh-token', newRefreshToken, context);
      return { accessToken };
    },

    subjects: () => fetchSubjects(),

    popularBooksSubjects: () => fetchPopularBooksSubject(),
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

    addBook: async (_, { book }, context: TGraphQLContext) => {
      const userId = authUser(context);
      return await addBookToLibrary(userId, book);
    },

    removeBook: async (_, { bookKey }, context: TGraphQLContext) => {
      const userId = authUser(context);
      return await removeBookFromLibrary(userId, bookKey);
    },
  },
};
