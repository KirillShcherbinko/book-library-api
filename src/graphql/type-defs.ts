import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type AuthResponse {
    userId: String
    accessToken: String
    refreshToken: String
  }

  type Book {
    id: ID!
    title: String!
    authors: [String!]!
    categories: [String!]!
    coverUrl: String
  }

  input BookInput {
    id: ID!
    title: String!
    authors: [String!]!
    categories: [String!]!
    coverUrl: String
    status: Boolean!
  }

  type UserBook {
    book: Book!
    status: String!
  }

  type Query {
    refresh: AuthResponse
    booksByCategory(category: String!, limit: Int, page: Int): [Book!]
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse
    register(email: String!, password: String!): AuthResponse
    logout: Boolean
    addBookToLibrary(book: BookInput!, status: String!): AddBookToLibraryResponse
  }

  type AddBookToLibraryResponse {
    success: Boolean!
    userBook: UserBook!
  }
`;
