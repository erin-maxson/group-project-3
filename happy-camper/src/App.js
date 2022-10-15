import React from 'react'
import Header from './components/Nav/Nav'
import Nav from './components/Header/Header'
import SearchableMap from './components/Map/Map'

export default function App() {
    return (
      <div className='App'>
     <Header />
     <Nav />
     <SearchableMap />
     </div>
      );
}