import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
  }

  type Book {
    id: ID!
    title: String!
    authors: [Author!]!
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
    booksByCategory(category: String!, limit: Int, page: Int): [Book!]!
  }

  type Mutation {
    addBookToLibrary(book: BookInput!, status: String!): AddBookToLibraryResponse
  }

  type AddBookToLibraryResponse {
    success: Boolean!
    userBook: UserBook!
  }
`;
