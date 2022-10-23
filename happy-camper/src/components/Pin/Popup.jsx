import './Popup.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'
import {QUERY_LOCATION} from "../../utils/queries"
import Map, { Popup, Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';

const Pin = () => {

  const [formState, setFormState] = useState({ title: "", description: "", latitude: "", longitude: "", rating: "" })
  const {loading, data} = useQuery(QUERY_LOCATION)
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="otherUserMarkers" key={data._id}>
      <Popup className='popup' longitude={data.longitude} latitude={data.latitude}
        anchor="bottom"
        closeButton={true}
        closeOnClick={true}
        onClose={() => setShowPopup(false)}>
        <div className='popup-container'>
          <h3 className='pinName'>{data.title}</h3>
          <p className='pinDescription'>{data.description}</p>
          <h4>Reviews:</h4>
          <p className='review'>{data.rating}/5 stars</p>
          <button className="addBtn" href='#'>Update this pin!</button>
        </div>
      </Popup>
    </div>


  )



}


export default Pin
