import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef, useState } from 'react';
import Map, { Popup, Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';
import { FaMapMarkerAlt} from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai'
import * as React from 'react'

/*
import {KANSAS} from '../../assets/kansas.jpg'

saved for future use
*/
Geocoder.accessToken = 'pk.eyJ1IjoiYWlybWF4MTQiLCJhIjoiY2w4amZrbXhvMDY4ODN3bzJtbnpjNTJsMSJ9.K1O2yAfN9AJ8eg32-XuENA';

//query for getaccesstoken (keep token serverside for security)

const SearchableMap = () => {
  const [showPopup, setShowPopup] = useState(true);
  // const [newPlace, setNewPlace] = useState(null);
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

  useEffect(() => {
    console.log({ viewport });
  }, [viewport]);

  const handleAddClick = (e) => {
    console.log(e)
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long
    });
  };

  return (
    <div>
      <Map
        ref={mapRef}
        {...viewport}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        width='100%'
        height='100vh'
        dragPan= {true}
        onViewportChange={setViewPort}
        onDblClick = {handleAddClick}
        mapboxApiAccessToken={Geocoder.accessToken}
      >

        <Geocoder
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={Geocoder.accessToken}
          position='top-left'
        />

        <div className="otherUserMarkers">
          <Marker longitude={-100} latitude={40} anchor="bottom" >
            <FaMapMarkerAlt style={{fontSize: viewport.zoom *7, color:'#f39200'}}/>
          </Marker>
        </div>

        <div className='popup-container'>
          {showPopup && ( 
            <Popup className='popup' longitude={-100} latitude={40}
              anchor="bottom"
              closeButton={false}
              closeOnClick={true}
              onClose={() => setShowPopup(false)}>
              <AiFillCloseCircle className='exitBtn' />
              <h3 className='pinName'>MIDDLE OF NOWHERE KANSAS</h3>
              <p className='pinDescription'> Treat yourself to a fun time in a corn field.</p>
              <h4>Reviews:</h4>
              <p className='review'>Kansas is just one big farm.</p>
              {/* TODO: ADD HREF FOR BUTTON HERE */}
              <button className="addBtn" href='#'>Add this pin to your list!</button>
            </Popup>)}
            </div>

              {/*TODO: NEED TO FINISH THIS UP FOR THE FORM -- EM  */}
             {/* form for adding a pin */}
            <div className='newplace-popup-container'>
            {/* <Popup> */}
           {/* <div className='add-pin'>
              <form className='pinForm' action="">
                <label htmlFor="">Pin Name</label>
                <input type="text" placeholder='Enter a name for your pin.' />
                <label htmlFor="">Pin Description</label>
                <input type="text" placeholder='Enter a short description for your pin.' />
                <label htmlFor="">Leave a Review</label>
                <input type="text" placeholder='Add your thoughts about this place."' />
                <button className='submitBtn' type='submit'>Add pin to map!</button>
              </form>
            </div>
            </Popup> */}
        </div>
        
        <NavigationControl className='navcontrol' />
        <ScaleControl className='scalecontrol'/>
        <GeolocateControl className ='geoControl'/>
      </Map>
      <DeckGL {...viewport} layers={[searchResultLayer]} />
    </div>
  );
};

export default SearchableMap;