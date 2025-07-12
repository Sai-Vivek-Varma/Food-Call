import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function LocationMarker({ position, setPosition, onLocationSelect }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onLocationSelect) onLocationSelect(e.latlng);
    },
    dragend(e) {
      setPosition(e.target.getLatLng());
      if (onLocationSelect) onLocationSelect(e.target.getLatLng());
    },
  });
  return position === null ? null : (
    <Marker
      position={position}
      icon={defaultIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          setPosition(e.target.getLatLng());
          if (onLocationSelect) onLocationSelect(e.target.getLatLng());
        },
      }}
    />
  );
}

const NominatimAutocomplete = ({ setPosition, setAddress }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef();

  const fetchSuggestions = async (q) => {
    if (!q) {
      setResults([]);
      return;
    }
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      q
    )}`;
    const res = await fetch(url);
    const data = await res.json();
    setResults(data);
    setShowDropdown(true);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchSuggestions(value), 350);
  };

  return (
    <div className="mb-2 relative">
      <input
        className="flex-1 px-3 py-2 border rounded w-full"
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Search for address..."
        onFocus={() => query && setShowDropdown(true)}
        autoComplete="off"
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded mt-1 max-h-40 overflow-y-auto z-50 shadow-lg">
          {results.map((r, i) => (
            <li
              key={i}
              className="p-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                setPosition({ lat: parseFloat(r.lat), lng: parseFloat(r.lon) });
                setAddress(r.display_name);
                setResults([]);
                setShowDropdown(false);
              }}
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const LocationPickerMap = ({ onLocationSelect, initialCoords, setAddress }) => {
  const [position, setPosition] = useState(
    initialCoords || { lat: 20.5937, lng: 78.9629 }
  );
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
      <NominatimAutocomplete
        setPosition={setPosition}
        setAddress={setAddress}
      />
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "320px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={position}
          setPosition={setPosition}
          onLocationSelect={onLocationSelect}
        />
      </MapContainer>
    </div>
  );
};

export default LocationPickerMap;
