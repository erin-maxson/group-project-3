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



export const ADD_LOCATION = gql`




`



export const ADD_USER = gql`



`;