import React from 'react'
import Header from './components/Nav/Nav'
import Nav from './components/Header/Header'
// import Signup from './components/Signup/Signup'
// need to import login item here when ready to connect to backend
import Map from './components/Map/Map'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const 
})

export default function App() {
    return (
      <div className='App'>
           {/* <Signup /> */}
         <Nav />
      <Header />
     <Map />
     </div>
      );
}