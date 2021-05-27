import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String!
  }
  type User {
    id: ID!,
    username: String!,
    password: String!,
    token: String!
  }

  type Message {
    id: ID!,
    from: String!,
    to: String!,
    message: String!,
    time: String!,
    read: Boolean!
  }

  type Mutation {
    register(username: String!, password: String!, confirmPassword: String!): User!
    login(username: String!, password: String): User!
  }
`;


