// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import {MapboxGeocoder} from 'mapbox-gl-geocoder';

// import "mapbox-gl/dist/mapbox-gl.css";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import { useEffect, useRef, useState } from "react";
// import Map from "react-map-gl";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
// import Geocoder from "react-map-gl-geocoder";

// mapboxgl.accessToken = 'pk.eyJ1IjoiYWlybWF4MTQiLCJhIjoiY2w4amZrbXhvMDY4ODN3bzJtbnpjNTJsMSJ9.K1O2yAfN9AJ8eg32-XuENA';

// const Map = () => {    
//         const mapContainer = useRef(null);
//         const map = useRef(null);
//         const [lng, setLng] = useState(-70.9);
//         const [lat, setLat] = useState(42.35);
//         const [zoom, setZoom] = useState(9);
    
//         useEffect(() => {
//             if (map.current) return; // initialize map only once
//             map.current = new mapboxgl.Map({
//               container: mapContainer.current,
//               style: 'mapbox://styles/mapbox/streets-v11',
//               center: [lng, lat],
//               zoom: zoom
//             });
//           });
    
//           useEffect(() => {
//             if (!map.current) return; // wait for map to initialize
//             map.current.on('move', () => {
//               setLng(map.current.getCenter().lng.toFixed(4));
//               setLat(map.current.getCenter().lat.toFixed(4));
//               setZoom(map.current.getZoom().toFixed(2));
//             });
//           });

//           map.addControl(
//             new MapboxGeocoder({
//             accessToken: mapboxgl.accessToken, 
//             zoom: 4,
//             placeholder: 'Try: -40, 170',
//             mapboxgl: mapboxgl,
//             })
//             );

//           return (
//             <div>
//               <div ref={mapContainer} className="map-container" />
//             </div>
//           );
//     }

// export default Map

