// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import {MapboxGeocoder} from 'mapbox-gl-geocoder';

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

MapboxGeocoder.accessToken = 'pk.eyJ1IjoiYWlybWF4MTQiLCJhIjoiY2w4amZrbXhvMDY4ODN3bzJtbnpjNTJsMSJ9.K1O2yAfN9AJ8eg32-XuENA';

// export const Map = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   // map.addControl(
//   //   new MapboxGeocoder({
//   //     accessToken: mapboxgl.accessToken,
//   //     zoom: 4,
//   //     placeholder: 'Try: -40, 170',
//   //     mapboxgl: mapboxgl,
//   //   })
//   // );

  

//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }

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
        id: "search-result",
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
    console.log("Updating");
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
        mapStyle="mapbox://styles/mapbox/streets-v9"
        width="100%"
        height="70vh" 
        onViewportChange={setViewPort}
        mapboxAccessToken={accessToken}
      >
        <Geocoder
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxAccessToken={accessToken}
          position="top-left"
        />
      </Map>
      <DeckGL {...viewport} layers={[searchResultLayer]} />
    </div>
  );
};

export default SearchableMap;

// const token = "MAPBOX_TOKEN";

// const SearchableMap = () => {
//   const [viewport, setViewPort] = useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 1,
//     transitionDuration: 100,
//   });
//   const [searchResultLayer, setSearchResult] = useState(null);
//   const mapRef = useRef();
//   const handleOnResult = (event) => {
//     console.log(event.result);
//     setSearchResult(
//       new GeoJsonLayer({
//         id: "search-result",
//         data: event.result.geometry,
//         getFillColor: [255, 0, 0, 128],
//         getRadius: 1000,
//         pointRadiusMinPixels: 10,
//         pointRadiusMaxPixels: 10,
//       })
//     );
//   };
//   const handleGeocoderViewportChange = (viewport) => {
//     const geocoderDefaultOverrides = { transitionDuration: 1000 };
//     console.log("Updating");
//     return setViewPort({
//       ...viewport,
//       ...geocoderDefaultOverrides,
//     });
//   };
//   useEffect(() => {
//     console.log({ viewport });
//   }, [viewport]);
//   return (
//     <div>
//       <h1>Use the search bar to find a location on the map</h1>
//       <Map
//         ref={mapRef}
//         {...viewport}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//         width="100%"
//         height="70vh"
//         onViewportChange={setViewPort}
//         mapboxAccessToken={token}
//       >
//         <Geocoder
//           mapRef={mapRef}
//           onResult={handleOnResult}
//           onViewportChange={handleGeocoderViewportChange}
//           mapboxAccessToken={token}
//           position="top-left"
//         />
//       </Map>
//       <DeckGL {...viewport} layers={[searchResultLayer]} />
//     </div>
//   );
// };
// export default SearchableMap;