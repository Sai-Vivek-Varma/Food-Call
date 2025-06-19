import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, Package, Heart, Building, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import DonationCard from "@/components/DonationCard";
import { fetchDonations } from "../slices/donationsSlice";
import { setUser } from "../slices/userSlice";

// Haversine formula for distance in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  if (
    typeof lat1 !== "number" ||
    typeof lon1 !== "number" ||
    typeof lat2 !== "number" ||
    typeof lon2 !== "number"
  )
    return Number.MAX_SAFE_INTEGER;
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

const DonationsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const donations = useSelector((state) => state.donations.items);
  const isLoading = useSelector((state) => state.donations.loading);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("sortby");
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) return;
    if (user.role === "donor") {
      toast.info("As a donor, use your dashboard to manage donations");
      navigate("/dashboard");
      return;
    }
    // Always fetch all donations for browse page
    dispatch(fetchDonations());
    // eslint-disable-next-line
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (user === null) {
      toast.error("Please log in to browse donations");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    let filtered = donations.filter(
      (donation) => donation.status === "available"
    );

    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (donation) =>
          donation.title.toLowerCase().includes(lowercaseSearchTerm) ||
          donation.description.toLowerCase().includes(lowercaseSearchTerm) ||
          (donation.donorName &&
            donation.donorName.toLowerCase().includes(lowercaseSearchTerm)) ||
          donation.pickupAddress.toLowerCase().includes(lowercaseSearchTerm)
      );
    }

    // Only sort if a real sort option is selected
    if (sortBy !== "sortby") {
      filtered = filtered.slice().sort((a, b) => {
        if (sortBy === "latest") {
          const aDate = a.createdAt
            ? new Date(a.createdAt).getTime()
            : a.expiryDate
            ? new Date(a.expiryDate).getTime()
            : 0;
          const bDate = b.createdAt
            ? new Date(b.createdAt).getTime()
            : b.expiryDate
            ? new Date(b.expiryDate).getTime()
            : 0;
          return bDate - aDate;
        } else if (sortBy === "soonest") {
          const aDate = a.expiryDate
            ? new Date(a.expiryDate).getTime()
            : a.createdAt
            ? new Date(a.createdAt).getTime()
            : Number.MAX_SAFE_INTEGER;
          const bDate = b.expiryDate
            ? new Date(b.expiryDate).getTime()
            : b.createdAt
            ? new Date(b.createdAt).getTime()
            : Number.MAX_SAFE_INTEGER;
          return aDate - bDate;
        } else if (sortBy === "quantity") {
          return (b.quantity || 0) - (a.quantity || 0);
        } else if (sortBy === "distance" && userLocation) {
          // Parse coordinates as numbers, fallback to null if invalid
          const aLat = Number(a.latitude);
          const aLon = Number(a.longitude);
          const bLat = Number(b.latitude);
          const bLon = Number(b.longitude);
          const userLat = Number(userLocation.latitude);
          const userLon = Number(userLocation.longitude);
          const aValid = !isNaN(aLat) && !isNaN(aLon);
          const bValid = !isNaN(bLat) && !isNaN(bLon);
          if (!aValid && !bValid) return 0;
          if (!aValid) return 1;
          if (!bValid) return -1;
          const aDist = getDistanceFromLatLonInKm(userLat, userLon, aLat, aLon);
          const bDist = getDistanceFromLatLonInKm(userLat, userLon, bLat, bLon);
          return aDist - bDist;
        }
        return 0;
      });
    }

    setFilteredDonations(filtered);
  }, [searchTerm, donations, sortBy, userLocation]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReservationSuccess = () => {
    // Re-fetch all donations after a reservation is made
    dispatch(fetchDonations());
  };

  useEffect(() => {
    if (sortBy === "distance" && !userLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          (err) => {
            toast.error("Location access denied. Cannot sort by distance.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    }
  }, [sortBy, userLocation]);

  if (!user || user.role !== "orphanage") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4 flex items-center justify-center w-fit mx-auto">
              <Building className="w-4 h-4 mr-2" />
              Available for {user.organization || "Your Organization"}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Browse Food Donations
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find and reserve available food donations for your organization.
              All listings show real-time availability with detailed pickup
              information and delivery options.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by food name, description, donor, or location..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all text-gray-700"
              />
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-3 px-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-gray-700 bg-white appearance-none pr-10"
                >
                  <option disabled value="sortby">
                    Sort by
                  </option>
                  <option value="latest">Latest</option>
                  <option value="soonest">Soonest Expiry</option>
                  <option value="quantity">Quantity (High to Low)</option>
                  <option value="distance">Distance (Nearest)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mb-6"></div>
              <p className="text-lg text-gray-600">
                Loading available donations...
              </p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm p-20">
              {searchTerm ? (
                <>
                  <Search className="w-20 h-20 text-gray-300 mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    No Matching Donations Found
                  </h3>
                  <p className="text-gray-600 text-center max-w-md mb-8">
                    No donations matching "{searchTerm}" were found. Try
                    adjusting your search terms or clear the search to see all
                    available donations.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="btn-primary"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <Heart className="w-20 h-20 text-gray-300 mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    No Donations Available
                  </h3>
                  <p className="text-gray-600 text-center max-w-md mb-8">
                    There are currently no food donations available in your
                    area. Check back later or encourage local food donors to
                    share their surplus through our platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={fetchDonations}
                      className="btn-primary bg-sage-600 hover:bg-sage-700"
                    >
                      Refresh List
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="btn-outline"
                    >
                      Learn More
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                <div className="flex items-center text-green-700 mb-2">
                  <Heart className="w-6 h-6 mr-3" />
                  <span className="font-semibold text-lg">
                    {filteredDonations.length} donation
                    {filteredDonations.length !== 1 ? "s" : ""} ready for
                    reservation
                  </span>
                </div>
                <p className="text-green-600 text-sm">
                  Click on any donation to view full details and make a
                  reservation. Our integrated delivery system supports
                  self-pickup, Swiggy, Dunzo, and Porter delivery options.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDonations.map((donation) => (
                  <DonationCard
                    key={donation._id || donation.id}
                    donation={donation}
                    isOrphanage={true}
                    onReservationSuccess={handleReservationSuccess}
                  />
                ))}
              </div>
            </>
          )}
          {/* Show a warning if user selects distance sort but location is not available */}
          {sortBy === "distance" && !userLocation && (
            <div className="text-red-500 text-sm mb-2">
              Location not available. Please allow location access to sort by
              distance.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DonationsList;
