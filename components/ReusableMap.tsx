'use client';

import React, { useEffect, useState } from 'react';
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const defaultCenter: [number, number] = [40.7128, -74.006]; // NYC fallback
const sampleRectangle: [number, number][] = [
  [40.71, -74.01],
  [40.72, -74.005],
];

type Neighborhood = {
  id: string;
  name: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  safetyScore?: number;
  walkabilityScore?: number;
  averageRating?: number;
};

export default function ReusableMap() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const res = await fetch('/api/neighborhoods');
        const data = await res.json();
        setNeighborhoods(data);
      } catch (error) {
        console.error('Failed to fetch neighborhoods:', error);
      }
    };

    fetchNeighborhoods();
  }, []);

  return (
    <div className='h-screen w-full'>
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        className='h-full w-full z-0'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <LayersControl position='topright'>
          <LayersControl.Overlay checked name='Neighborhood Markers'>
            <LayerGroup>
              {neighborhoods.map((n) => (
                <Marker key={n.id} position={[n.latitude, n.longitude]}>
                  <Popup>
                    <strong>{n.name}</strong> <br />
                    {n.city}, {n.state} ({n.zipCode}) <br />
                    Safety: {n.safetyScore ?? 'N/A'} <br />
                    Walkability: {n.walkabilityScore ?? 'N/A'} <br />
                    Avg Rating: {n.averageRating ?? 'N/A'}
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Feature group'>
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[40.715, -74.01]} radius={250} />
              <Rectangle bounds={sampleRectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
