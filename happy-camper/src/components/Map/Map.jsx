import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYWlybWF4MTQiLCJhIjoiY2w4amZrbXhvMDY4ODN3bzJtbnpjNTJsMSJ9.K1O2yAfN9AJ8eg32-XuENA';

const Map = () => {    
        const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(-70.9);
        const [lat, setLat] = useState(42.35);
        const [zoom, setZoom] = useState(9);
    
        useEffect(() => {
            if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: 'mapbox://styles/mapbox/outdoors-v11',
              center: [lng, lat],
              zoom: 4
            });
          });
    
          useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
              setLng(map.current.getCenter().lng.toFixed(4));
              setLat(map.current.getCenter().lat.toFixed(4));
              setZoom(map.current.getZoom().toFixed(2));
            });
          });

          for (const marker of geojson.features) {
            // Create a DOM element for each marker.
            const el = document.createElement('div');
            const width = '20'
            const height = '20'
            el.className = 'marker';
            el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = '100%';
             
            el.addEventListener('click', () => {
            window.alert(marker.properties.message);
            });
             
            // Add markers to the map.
            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
            }

          return (
            <div>
              <div ref={mapContainer} className="map-container" />
            </div>
          );
    }

export default Map