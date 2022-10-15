import React from 'react'
import {Marker} from 'react-map-gl';
import {FaMapMarkerAlt} from 'react-icons/fa'

const Markers = () => {
  return (
        // Other user markers
        <div className="otherUserMarkers">
        <Marker longitude={-100} latitude={40} anchor="bottom" >
      <img src={FaMapMarkerAlt} />
    </Marker>
    </div>
  )
}

export default Markers