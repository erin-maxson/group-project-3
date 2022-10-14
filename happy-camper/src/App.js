import React from 'react'
import Header from './components/Nav/Nav'
import Nav from './components/Header/Header'
import Map from './components/Map/Map'

export default function App() {
    return (
      <div className='App'>
         <Nav />
      <Header />
     <Map />
     </div>
      );
}