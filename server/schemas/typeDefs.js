const { gql } = require('apollo-server-express');

const typeDefs =gql`
 
 input SaveLocationInput {
    username: String!
    title: String!
    description: String!
    rating: Int!
    latitude: Float!
    longitude: Float!
 }

 input UpdateLocationInput {
    title: String
    description: String
    rating: Int
    latitude: Float
    longitude: Float
 }
 
 type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLocation(location: SaveLocationInput): User
    removeLocation(locationId: ID!): Location
    updateLocation(locationId: ID!, updateLocation: UpdateLocationInput): Location
 }
`;

module.exports = typeDefs;