export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String
    categories: [String!]!
    coverUrl: String
  }

  type Query {
    booksByCategory(category: String!, limit: Int, page: Int): [Book!]!
  }
`;
