const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Number
    savedBooks: [Book]!
  }

  type Book {
    bookId: String
    authors: [String]!
    description: String
    title: String
    image:
    link:
  }

  type Auth {
    token:
    user:
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    addUser(name: String!): User
    addBook(userId: ID!, skill: String!): User
    removeUser(userId: ID!): User
    removeBook(userId: ID!, skill: String!): User
  }
`;

module.exports = typeDefs;
