import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

const LocationPicker = ({
  onLocationSelect,
  currentAddress,
  setCurrentAddress,
}) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Use reverse geocoding to get address
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2e37c9a003db449abd9a765f7bcba694&limit=1`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted;
              setCurrentAddress(address);
              onLocationSelect(address);
              toast.success("Current location detected successfully");
            } else {
              throw new Error("No address found");
            }
          } else {
            throw new Error("Geocoding failed");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          // Fallback: just use coordinates
          const fallbackAddress = `Lat: ${position.coords.latitude.toFixed(
            4
          )}, Lng: ${position.coords.longitude.toFixed(4)}`;
          setCurrentAddress(fallbackAddress);
          onLocationSelect(fallbackAddress);
          toast.success("Location coordinates captured");
        }
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Failed to get your location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please allow location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        toast.error(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={currentAddress}
          onChange={(e) => setCurrentAddress(e.target.value)}
          placeholder="Enter pickup address or use current location"
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
        />
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGettingLocation ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
          {isGettingLocation ? "Getting..." : "Current"}
        </button>
      </div>
      <p className="text-sm text-gray-600">
        Click "Current" to automatically detect your location, or type the
        address manually.
      </p>
    </div>
  );
};

export default LocationPicker;
