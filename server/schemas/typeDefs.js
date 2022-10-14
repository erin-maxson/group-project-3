const { gql } = require('apollo-server-express');

const typeDefs =gql`
 
 input SaveLocationInput {
    username: String!
    title: String!
    description: String!
    rating: Int!
    latitude: Int!
    longitude: Int!
 }
 
 type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLocation(location: SaveLocationInput): User
    removeLocation(_id: ID!): Location
    updateLocation(_id: ID!, title: String!, rating: String!): Location
 }
`;

module.exports = typeDefs;