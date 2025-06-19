import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { MapPin, LocateFixed, Loader2 } from "lucide-react";
import "leaflet/dist/leaflet.css";

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

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);
  return null;
}

const LocationPicker = ({
  onLocationSelect,
  currentAddress,
  setCurrentAddress,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [position, setPosition] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [dropdownHover, setDropdownHover] = useState(false);
  const timeoutRef = useRef();

  // Autocomplete suggestions
  const fetchSuggestions = async (q) => {
    if (!q) {
      setResults([]);
      setFetching(false);
      return;
    }
    setFetching(true);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      q
    )}&email=noobvivek01@gmail.com`;
    const res = await fetch(url);
    const data = await res.json();
    setResults(data);
    setShowDropdown(true);
    setFetching(false);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    setCurrentAddress(value);
    setShowDropdown(!!value); // Always show dropdown if there is input
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchSuggestions(value), 700);
  };

  // Use current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (positionObj) => {
        const { latitude, longitude } = positionObj.coords;
        setPosition({ lat: latitude, lng: longitude });
        setMapCenter({ lat: latitude, lng: longitude });
        // Reverse geocode to get address
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        const res = await fetch(url);
        const data = await res.json();
        setQuery(data.display_name || `${latitude}, ${longitude}`);
        setCurrentAddress(data.display_name || `${latitude}, ${longitude}`);
        if (onLocationSelect)
          onLocationSelect(data.display_name || `${latitude}, ${longitude}`);
        setLoading(false);
      },
      () => setLoading(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  // When marker is moved, update address
  const handleMarkerMove = async (latlng) => {
    setPosition(latlng);
    setMapCenter(latlng);
    // Reverse geocode
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`;
    const res = await fetch(url);
    const data = await res.json();
    setQuery(data.display_name || `${latlng.lat}, ${latlng.lng}`);
    setCurrentAddress(data.display_name || `${latlng.lat}, ${latlng.lng}`);
    if (onLocationSelect)
      onLocationSelect(data.display_name || `${latlng.lat}, ${latlng.lng}`);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search for address or move marker"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all pr-12"
          autoComplete="off"
          onFocus={() => setShowDropdown(!!query)}
          onBlur={() => {
            if (!dropdownHover) setShowDropdown(false);
          }}
        />
        <button
          type="button"
          onClick={getCurrentLocation}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-gray-200 hover:bg-gray-100"
          disabled={loading}
          aria-label="Use current location"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-green-600" />
          ) : (
            <LocateFixed className="w-5 h-5 text-green-600" />
          )}
        </button>
        {showDropdown && (
          <ul
            className="absolute left-0 right-0 bg-white border rounded mt-1 max-h-40 overflow-y-auto z-[9999] shadow-lg"
            onMouseEnter={() => setDropdownHover(true)}
            onMouseLeave={() => setDropdownHover(false)}
          >
            {fetching ? (
              <li className="p-2 text-gray-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading...
              </li>
            ) : results.length === 0 && query ? (
              <li className="p-2 text-gray-400">No results found</li>
            ) : (
              results.map((r, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => {
                    const lat = parseFloat(r.lat);
                    const lng = parseFloat(r.lon);
                    setPosition({ lat, lng });
                    setMapCenter({ lat, lng });
                    setQuery(r.display_name);
                    setCurrentAddress(r.display_name);
                    setShowDropdown(false);
                    if (onLocationSelect) onLocationSelect(r.display_name);
                  }}
                >
                  {r.display_name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 z-0">
        <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <RecenterMap center={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={position}
            setPosition={(latlng) => {
              setPosition(latlng);
              setMapCenter(latlng);
              handleMarkerMove(latlng);
            }}
            onLocationSelect={(latlng) => {
              setMapCenter(latlng);
              handleMarkerMove(latlng);
            }}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPicker;
