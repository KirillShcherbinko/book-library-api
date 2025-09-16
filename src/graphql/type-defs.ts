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
    coverId: Int
  }

  type Query {
    refresh: AuthResponse!
    searchBooks(searchQuery: String!, limit: Int!, page: Int!): [Book!]
    booksBySubject(subject: String!, limit: Int!, page: Int!): [Book!]
    book(key: String!): Book!
    userBooks(limit: Int!, page: Int!): [Book!]
    subjects: [String!]
    subSubjects(subject: String!): [String!]
    popularBooksSubjects: [String!]
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    register(email: String!, password: String!): AuthResponse!
    logout: Boolean!
    addBook(book: BookInput!): Boolean!
    removeBook(bookKey: String!): Boolean!
  }
`;
