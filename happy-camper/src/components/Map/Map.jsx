import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef, useState } from 'react';
import Map, { Popup, Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';
import { FaMapMarkerAlt } from 'react-icons/fa';
import * as React from 'react'
import { QUERY_LOCATIONS, QUERY_ME, QUERY_LOCATION } from '../../utils/queries'
// import { ApolloClient, useQuery } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks'
import Auth  from '../../utils/auth'
import { ADD_LOCATION } from '../../utils/mutations'
/*
import {KANSAS} from '../../assets/kansas.jpg'

saved for future use
*/
Geocoder.accessToken = 'pk.eyJ1IjoiYWlybWF4MTQiLCJhIjoiY2w4amZrbXhvMDY4ODN3bzJtbnpjNTJsMSJ9.K1O2yAfN9AJ8eg32-XuENA';

//query for getaccesstoken (keep token serverside for security)

const SearchableMap = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewPort] = useState({
    latitude: 47.1164,
    longitude: -101.2996,
    zoom: 3.5,
    transitionDuration: 100,
  });


  const [searchResultLayer, setSearchResult] = useState(null);
  const mapRef = useRef();
  const handleOnResult = (event) => {
    console.log(event.result);
    setSearchResult(
      new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10,
      })
    );
  };
  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    console.log('Updating');
    return setViewPort({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };


  const { loading, data } = useQuery(QUERY_LOCATIONS)
  const pins = data?.locations || []
  // console.log(pins)

  const [formState, setFormState] = useState({ title: '', description: '', rating: '' })
  const [SaveLocation, { error, locationData }] = useMutation(ADD_LOCATION)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await SaveLocation({
        variables: {
          ...formState
        }
      })

      Auth.login(data.login.token)
    } catch (error) {
      console.error(error);
    }
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'title') {
  //     setTitleText(value);
  //   } else if (name === 'description') {
  //     setDescription(value);
  //   } else {
  //     setRating(value);
  //   }
  // };

  const handleAddClick = (e) => {
    console.log(e)
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long
    });
  };

  return (
      <Map
        ref={mapRef}
        {...viewport}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        width='100%'
        height='100vh'
        dragPan={true}
        onViewportChange={setViewPort}
        onDblClick={handleAddClick}
        mapboxApiAccessToken={Geocoder.accessToken}
      >
        {pins.map(p => (
          <div className="otherUserMarkers" key={p._id}>
            <Marker longitude={p.longitude} latitude={p.latitude} anchor="bottom" >
              <FaMapMarkerAlt style={{ fontSize: viewport.zoom * 7, color: '#f39200' }} />
            </Marker>
            <Popup className='popup' longitude={p.longitude} latitude={p.latitude}
              anchor="bottom"
              closeButton={true}
              closeOnClick={true}
              onClose={() => setShowPopup(false)}>
              <div className='popup-container'>
                <h3 className='pinName'>{p.title}</h3>
                <p className='pinDescription'>{p.description}</p>
                <h4>Reviews:</h4>
                <p className='review'>{p.rating}/5 stars</p>
                <button className="addBtn" href='#'>Update this pin!</button>
              </div>
            </Popup>
          </div>
        ))}

        <Geocoder
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={Geocoder.accessToken}
          position='top-left'
        />



        {/* This works, but need to hide it for now until I get the secondary popup working - EM */}


        {/*TODO: NEED TO FINISH THIS UP FOR THE FORM -- EM  */}
        {/* form for adding a pin */}
        {newPlace && <Popup className='popup-newPlace' longitude={newPlace.long} latitude={newPlace.lat}
          anchor="bottom"
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(false)}>
          <div className='add-pin'>
            <form className='pinForm' onSubmit={handleFormSubmit}>
            <label htmlFor="">Pin Name</label>
              <input 
                name='title'
                value={formState.title}
                type="text" 
                placeholder='Enter a pin name.' 
                onChange={handleChange}
              />
              <label htmlFor="">Pin Description</label>
              <input 
                name='description'
                value={formState.description}
                type="text" 
                placeholder='Enter a description.' 
                onChange={handleChange}
              />
              <label htmlFor="">Leave a Review</label>
              <input 
                name='rating'
                value={formState.rating}
                type="int" 
                placeholder='Enter a rating 1-5.' 
                onChange={handleChange}
              />
            </form>
          </div>
        </Popup>}

        <NavigationControl className='navcontrol' />
        <ScaleControl className='scalecontrol' />
        <GeolocateControl className='geoControl' />
      </Map>
  );
};
  {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
    {/* </div> */}
export default SearchableMap;