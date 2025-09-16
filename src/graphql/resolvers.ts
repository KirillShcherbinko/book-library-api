import {
  fetchPopularBooksSubject,
  fetchSubjects,
  fetchSubSubjects,
} from '@/services/subjects-service';
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
    booksBySubject: async (_, { subject, limit, page }) => {
      return await fetchBooksBySubject(subject, limit, page);
    },

    searchBooks: async (_, { searchQuery, limit, page }) => {
      return await searchBooks(searchQuery, limit, page);
    },

    book: async (__dirname, { key }) => {
      return await fetchBook(key);
    },

    userBooks: async (_, { limit, page }, context: TGraphQLContext) => {
      const userId = authUser(context);
      return await getUserBooks(userId, limit, page);
    },

    refresh: async (_, __, context) => {
      const { refreshToken } = context;
      const { newRefreshToken } = await refresh(refreshToken);
      setCookies('refresh-token', newRefreshToken, context);
      return { refreshToken: newRefreshToken };
    },

    subjects: () => fetchSubjects(),

    subSubjects: (_, { subject }) => fetchSubSubjects(subject),

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
