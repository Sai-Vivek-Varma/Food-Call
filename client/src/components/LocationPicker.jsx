import React, { useState, useRef, useEffect } from "react";
import { LocateFixed, Loader2 } from "lucide-react";

const LocationPicker = ({
  onLocationSelect,
  currentAddress,
  setCurrentAddress,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        q
      )}&email=noobvivek01@gmail.com`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    }
    setFetching(false);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    setCurrentAddress(value);
    setShowDropdown(!!value);
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
        try {
          // Reverse geocode to get address
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const res = await fetch(url);
          const data = await res.json();
          const address = data.display_name || `${latitude}, ${longitude}`;
          setQuery(address);
          setCurrentAddress(address);
          if (onLocationSelect) onLocationSelect(address);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          const fallbackAddress = `${latitude}, ${longitude}`;
          setQuery(fallbackAddress);
          setCurrentAddress(fallbackAddress);
          if (onLocationSelect) onLocationSelect(fallbackAddress);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation failed:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search for address or enter manually"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-sage-200 focus:border-sage-500 transition-all pr-12"
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
            <Loader2 className="w-5 h-5 animate-spin text-sage-600" />
          ) : (
            <LocateFixed className="w-5 h-5 text-sage-600" />
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

      <div className="w-full h-80 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <LocateFixed className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Interactive map temporarily disabled</p>
          <p className="text-xs text-gray-400">
            Use the search above or location button
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
