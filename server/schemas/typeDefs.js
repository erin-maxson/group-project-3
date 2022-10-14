const { gql } = require('apollo-server-express');

const typeDefs =gql`
 
 input SaveLocationInput {
    username: String!
    title: String!
 }
 
 type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth


 }
`;