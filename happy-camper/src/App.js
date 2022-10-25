import React from 'react'
import Header from './components/Nav/Nav'
import Nav from './components/Header/Header'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Placer from './components/Location/Location'
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
  const token = localStorage.getItem('id_token');

  return {

    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>

      <Router>
        <div className='App'>

          {/* <Signup /> */}
          <Nav />
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Map />} />
            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/placer"
              element={<Placer />}
            />

          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}