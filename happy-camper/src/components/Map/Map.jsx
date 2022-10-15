import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';

Geocoder.accessToken = 'pk.eyJ1IjoiYWlybWF4MTQiLCJhIjoiY2w4amZrbXhvMDY4ODN3bzJtbnpjNTJsMSJ9.K1O2yAfN9AJ8eg32-XuENA';

//query for getaccesstoken (keep token serverside for security)

const SearchableMap = () => {
  const [viewport, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
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
      <h1>Use the search bar to find a location on the map</h1>
      <Map
        ref={mapRef}
        {...viewport}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        width='100%'
        height='70vh'
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
      </Map>
      <DeckGL {...viewport} layers={[searchResultLayer]} />
    </div>
  );
};

export default SearchableMap;