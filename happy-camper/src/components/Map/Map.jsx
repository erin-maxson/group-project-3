import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef, useState } from 'react';
import Map, {Popup, Marker} from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';
import {FaMapMarkerAlt} from 'react-icons/fa'
import {KANSAS} from '../../assets/kansas.jpg'
Geocoder.accessToken = 'pk.eyJ1IjoiYWlybWF4MTQiLCJhIjoiY2w4amZrbXhvMDY4ODN3bzJtbnpjNTJsMSJ9.K1O2yAfN9AJ8eg32-XuENA';

//query for getaccesstoken (keep token serverside for security)

const SearchableMap = () => {
  const [showPopup, setShowPopup] = useState(true);
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
  return (
    <div>
      <Map
        ref={mapRef}
        {...viewport}
        mapStyle='mapbox://styles/mapbox/outdoors-v11'
        width='100%'
        height='80vh'
        onViewportChange={setViewPort}
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
          <FaMapMarkerAlt />
          </Marker>
        </div>

        <div className='popup-container'>
      {showPopup && (
      <Popup longitude={-100} latitude={40}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        <h3 className='stopName'>MIDDLE OF NOWHERE KANSAS</h3>
        <p className='stopBio'> Treat yourself to a fun time in a corn field.</p>
        <button className="addBtn">Add this stop to your list!</button>
      </Popup>)}
    </div>

      </Map>
      <DeckGL {...viewport} layers={[searchResultLayer]} />
    </div>
  );
};

export default SearchableMap;