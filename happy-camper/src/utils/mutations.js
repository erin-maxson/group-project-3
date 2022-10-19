import { gql } from '@apollo/client';

export const LOGIN = gql`

mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }


`;






export const ADD_USER = gql`

mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }



`;

export const ADD_LOCATION = gql`

mutation SaveLocation {
    saveLocation {
      _id
      username
      email
    }
  }



`;




export const REMOVE_LOCATION = gql`


mutation RemoveLocation($locationId: ID!) {
    removeLocation(locationId: $locationId) {
      _id
      username
      title
      description
      rating
      latitude
      longitude
    }
  }

`;

export const UPDATE_LOCATION = gql`

mutation UpdateLocation($locationId: ID!) {
    updateLocation(locationId: $locationId) {
      _id
      username
      title
      description
      rating
      latitude
      longitude
    }
  }

`;