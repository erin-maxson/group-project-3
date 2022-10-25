const { gql } = require('apollo-server-express');

const typeDefs = gql`



   type User {
      _id: ID
      username: String
      email: String
      savedLocations: [Location]!
   }

   type Location {
      _id: ID
      username: String
      title: String
      description: String
      rating: String
      latitude: Float
      longitude: Float

   }

   type Auth {
      token: String!
      user: User
   }

   type Query {
      users: [User]
      user(username: String!): User
      savedLocations(username: String!): [Location]
      locations: [Location]
      location(locationId: ID!): Location
      me: User

   }


 
 input SaveLocationInput {
    username: String
    title: String
    description: String
    rating: String
    latitude: Float
    longitude: Float
 }

 input UpdateLocationInput {
    title: String
    description: String
    rating: String
    latitude: Float
    longitude: Float
 }
 
 type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveLocation(username: String!, title: String!, description: String!, rating: String!, latitude: Float!, longitude: Float!): Location
    removeLocation(locationId: ID!): Location
    updateLocation(locationId: ID!, newLocation: UpdateLocationInput): Location
 }
`;

module.exports = typeDefs;