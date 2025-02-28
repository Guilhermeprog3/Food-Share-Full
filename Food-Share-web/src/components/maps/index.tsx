import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Map, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import { Button } from '../ui/button';
import Update_User from './action';
import Get_UserById from './action_get_user';

const OpenStreetMap = () => {
  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 });
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
    error: null as string | null,
  });

  const ZOOM_LEVEL = 13;
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      const userData = await Get_UserById();

      if (userData && userData.latitude && userData.longitude) {
        const { latitude, longitude } = userData;
        setCenter({ lat: latitude, lng: longitude });
        setLocation({
          loaded: true,
          coordinates: { lat: latitude, lng: longitude },
          error: null,
        });

        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], ZOOM_LEVEL);
        }
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCenter({ lat: latitude, lng: longitude });
              setLocation({
                loaded: true,
                coordinates: { lat: latitude, lng: longitude },
                error: null,
              });

              if (mapRef.current) {
                mapRef.current.setView([latitude, longitude], ZOOM_LEVEL);
              }
            },
            (error) => {
              console.error('Erro ao obter localização:', error);
              setLocation({
                loaded: false,
                coordinates: { lat: 0, lng: 0 },
                error: 'Erro ao obter localização.',
              });
            }
          );
        } else {
          console.error('Geolocalização não suportada pelo navegador.');
          setLocation({
            loaded: false,
            coordinates: { lat: 0, lng: 0 },
            error: 'Geolocalização não suportada.',
          });
        }
      }
    };

    fetchUserLocation();
  }, []);

  const updateLocation = (lat: number, lng: number) => {
    setLocation({ loaded: true, coordinates: { lat, lng }, error: null });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        updateLocation(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const customIcon = divIcon({
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />
    ),
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    className: '',
  });

  const handleUpdateUser = async () => {
    const { lat, lng } = location.coordinates;

    const updatedUser = await Update_User({
      latitude: lat,
      longitude: lng,
    });

    if (updatedUser) {
      alert('Localização atualizada com sucesso!');
    } else {
      alert('Erro ao atualizar localização.');
    }
  };

  return (
    <div className="relative bg-card rounded-lg border border-gray-200 p-2 shadow-md">
      <div className="p-6 bg-card">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Especifique o ponto de Doação</h1>
        </div>
        <div className="w-full h-[320px] border-2 border-gray-300 rounded-lg overflow-hidden relative z-0">
          <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            ref={mapRef}
            className="h-full w-full"
            key={center.lat + center.lng}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuidores'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler />
            {location.loaded && !location.error && (
              <Marker
                position={[location.coordinates.lat, location.coordinates.lng]}
                icon={customIcon}
              />
            )}
          </MapContainer>
        </div>
        {location.loaded && !location.error && (
          <div className="absolute bottom-20 right-7 m-0 p-2 bg-white rounded-lg shadow-md z-10">
            <p>Latitude: {location.coordinates.lat.toFixed(6)}</p>
            <p>Longitude: {location.coordinates.lng.toFixed(6)}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center mb-4">
        <Button onClick={handleUpdateUser}>Adicionar</Button>
      </div>
    </div>
  );
};

export default OpenStreetMap;
