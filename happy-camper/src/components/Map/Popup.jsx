import * as React from 'react';
import {Popup} from 'react-map-gl';

import React from 'react'

const Popup = () => {
  return (
    <div className='popup-container'>
       {showPopup && (
      <Popup longitude={-100} latitude={40}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        You are here
        <button className="addBtn">Add this stop to your list!</button>
      </Popup>)}
    </div>
  )
}

export default Popup