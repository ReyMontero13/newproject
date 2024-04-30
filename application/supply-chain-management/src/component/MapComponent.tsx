import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon
const customIcon = L.icon({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

// Component to apply custom icon to all markers
const GeoJsonWithCustomMarkers = ({ data }: { data: any }) => {
    const map = useMap();

    useEffect(() => {
        if (data) {
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, { icon: customIcon });
                }
            }).addTo(map);
        }
    }, [data, map]);

    return null;
};

const MapComponent: React.FC = () => {
    const [geoJson, setGeoJson] = useState<any>(null);

    useEffect(() => {
        // Fetch the GeoJSON from the local public folder
        fetch('/data/geojson/cebu/cebu-street.geojson')
            .then(res => res.json())
            .then(data => setGeoJson(data))
            .catch(err => console.error('Error fetching GeoJSON:', err));
    }, []);

    return (
        <MapContainer center={[10.3157, 123.8854]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoJson && <GeoJsonWithCustomMarkers data={geoJson} />}
            console.log(geoJson)
        </MapContainer>
    );
};

export default MapComponent;
