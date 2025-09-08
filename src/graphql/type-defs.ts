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

  type UserBook {
    book: Book!
    status: String!
  }

  type Query {
    booksByCategory(category: String!, limit: Int, page: Int): [Book!]!
  }

  type Mutation {
    addBookToLibrary(book: Book!, status: String!): AddBookToLibraryResponse
  }

  type AddBookToLibraryResponse {
    success: Boolean!
    userBook: UserBook!
  }
`;
