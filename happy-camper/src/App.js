import React from 'react'
import Header from './components/Nav/Nav'
import Nav from './components/Header/Header'
// import Signup from './components/Signup/Signup'
// need to import login item here when ready to connect to backend
import Map from './components/Map/Map'
import Markers from './components/Map/Markers'
import Popup from './components/Map/Popup'

export default function App() {
    return (
      <div className='App'>
           {/* <Signup /> */}
         <Nav />
      <Header />
     <Map />
     {/* <Markers /> */}
     <Popup />
     </div>
      );
}