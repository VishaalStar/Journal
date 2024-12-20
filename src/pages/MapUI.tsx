import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { gsap } from 'gsap';
import { Marker as LeafletMarker } from 'leaflet'; // Import Leaflet's Marker class for typing
import 'leaflet/dist/leaflet.css';

const MapUI = () => {
  const markerRef = useRef<LeafletMarker | null>(null); // Explicitly type the ref

  // Set initial map center and zoom
  const initialPosition = [51.505, -0.09]; // Coordinates for London
  const initialZoom = 13;

  // Add marker with GSAP animation
  const animateMarker = () => {
    if (markerRef.current) {
      gsap.fromTo(
        markerRef.current?.getElement() as HTMLElement, // Use getElement to get the DOM element and assert it as HTMLElement
        { scale: 0 }, // Start scaling from 0
        { scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.75)' } // Animate to full size
      );
    }
  };

  useEffect(() => {
    animateMarker(); // Trigger marker animation on mount
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={initialPosition} ref={markerRef}>
          <Popup>A sample marker for your map!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapUI;
