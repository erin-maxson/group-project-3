import { gql } from '@apollo/client';




export const QUERY_LOCATION = gql`


query Location($locationId: ID!) {
    location(locationId: $locationId) {
      _id
      username
      title
      description
      rating
      latitude
      longitude
    }
  }
    

`


export const QUERY_SAVEDLOCATION = gql `

query SavedLocations($username: String!) {
    savedLocations(username: $username) {
      _id
      username
      title
      description
      rating
      latitude
      longitude
    }
  }



`



export const QUERY_LOCATIONS = gql` 

query Locations {
    locations {
      _id
      username
      title
      description
      rating
      latitude
      longitude
    }
  }


`




export const QUERY_USER = gql`

query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedLocations {
        _id
        username
        title
        description
        rating
        latitude
        longitude
      }
    }
  }


`

export const QUERY_USERS = gql`

query Users {
    users {
      _id
      username
      email
      savedLocations {
        _id
        username
        title
        description
        rating
        latitude
        longitude
      }
    }
  }

`


export const QUERY_ME = gql`

query Me {
    me {
      _id
      username
      email
      savedLocations {
        _id
        username
        title
        description
        rating
        latitude
        longitude
      }
    }
  }


`