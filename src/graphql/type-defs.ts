import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type AuthResponse {
    userId: String
    accessToken: String
    refreshToken: String
  }

  type Book {
    key: ID!
    title: String!
    description: String
    authors: [String!]!
    subjects: [String!]
    coverIds: [Int!]
    coverId: Int
  }

  input BookInput {
    key: ID!
    title: String!
    authors: [String!]!
    coverUrl: String
    isTaken: Boolean!
  }

  type UserBook {
    book: Book!
    status: String!
  }

  type Query {
    refresh: AuthResponse!
    searchBooks(searchQuery: String!, limit: Int, page: Int): [Book!]
    booksByCategory(category: String!, limit: Int, page: Int): [Book!]
    book(key: String!): Book!
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    register(email: String!, password: String!): AuthResponse!
    logout: Boolean!
    addBookToLibrary(book: BookInput!, status: String!): AddBookToLibraryResponse
  }

  type AddBookToLibraryResponse {
    success: Boolean!
    userBook: UserBook!
  }
`;
