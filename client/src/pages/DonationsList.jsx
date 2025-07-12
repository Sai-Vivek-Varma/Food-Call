import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, Package, Heart, Building, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import DonationCard from "@/components/DonationCard";
import { fetchDonations } from "../slices/donationsSlice";

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
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
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
    dispatch(fetchDonations());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (user === null) {
      toast.error("Please log in to browse donations");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Show only available donations
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50">
      <section className="section-padding pt-24 fade-in">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16 space-y-content">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-sage-700 font-semibold text-sm shadow-lg border border-sage-200">
              <Building className="w-4 h-4 mr-2" />
              Available for {user.organization || "Your Organization"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              <span className="gradient-text">Browse Food Donations</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-pretty">
              Find and reserve available food donations for your organization.
              All listings show real-time availability with detailed pickup
              information and delivery options.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-12 slide-up">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by food name, description, donor, or location..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-sage-100 focus:border-sage-500 transition-all text-gray-700 text-lg shadow-sm hover:border-gray-300 bg-white"
              />
            </div>
            <div className="flex-shrink-0 w-full lg:w-48">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full py-4 px-5 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-sage-100 focus:border-sage-500 text-gray-700 bg-white appearance-none pr-12 text-lg shadow-sm hover:border-gray-300"
                >
                  <option disabled value="sortby">
                    Sort by
                  </option>
                  <option value="latest">Latest</option>
                  <option value="soonest">Soonest Expiry</option>
                  <option value="quantity">Quantity (High to Low)</option>
                  <option value="distance">Distance (Nearest)</option>
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Distance sort warning */}
          {sortBy === "distance" && !userLocation && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <p className="font-medium">Location not available</p>
              <p className="text-sm">Please allow location access to sort by distance.</p>
            </div>
          )}

          {/* Content */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 scale-in">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-sage-500 mb-8"></div>
              <p className="text-xl text-gray-600">
                Loading available donations...
              </p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center card-enhanced p-16 lg:p-24 fade-in">
              {searchTerm ? (
                <>
                  <Search className="w-24 h-24 text-gray-300 mb-8" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 text-balance">
                    No Matching Donations Found
                  </h3>
                  <p className="text-gray-600 text-center max-w-md mb-10 text-lg leading-relaxed">
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
                  <Heart className="w-24 h-24 text-gray-300 mb-8" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 text-balance">
                    No Donations Available
                  </h3>
                  <p className="text-gray-600 text-center max-w-md mb-10 text-lg leading-relaxed">
                    There are currently no food donations available in your
                    area. Check back later or encourage local food donors to
                    share their surplus through our platform.
                  </p>
                  <div className="btn-group">
                    <button
                      onClick={() => dispatch(fetchDonations())}
                      className="btn-primary"
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
              {/* Results summary */}
              <div className="mb-12 p-6 lg:p-8 bg-gradient-to-r from-green-50 via-emerald-50 to-sage-50 rounded-3xl border border-green-200 shadow-lg slide-up">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-green-700 mb-3">
                  <Heart className="w-8 h-8 flex-shrink-0" />
                  <span className="font-bold text-xl text-center sm:text-left">
                    {filteredDonations.length} donation
                    {filteredDonations.length !== 1 ? "s" : ""} ready for
                    reservation
                  </span>
                </div>
                <p className="text-green-600 text-center sm:text-left text-lg leading-relaxed">
                  Click on any donation to view full details and make a
                  reservation. Our integrated delivery system supports
                  self-pickup and ONDC delivery options.
                </p>
              </div>

              {/* Donations grid */}
              <div className="card-grid slide-up">
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
        </div>
      </section>
    </div>
  );
};

export default DonationsList;