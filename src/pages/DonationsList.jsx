
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, Package, Heart, Building, Filter, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationCard from "@/components/DonationCard";
import DonationDetailModal from "@/components/DonationDetailModal";
import { reserveDonation } from "../lib/api";
import axios from "axios";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const userJson = localStorage.getItem("foodShareUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setUser(parsedUser);
        
        // Redirect donors away from donations list - they should use dashboard
        if (parsedUser.role === "donor") {
          toast.info("As a donor, use your dashboard to manage donations");
          navigate("/dashboard");
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // Redirect non-logged users to home
      toast.error("Please log in to browse donations");
      navigate("/");
      return;
    }

    fetchDonations();
  }, [navigate]);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("foodShareToken");
      const response = await axios.get("http://localhost:5000/api/donations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Only show available donations for orphanages
      const availableDonations = response.data.filter(donation => donation.status === "available");
      setDonations(availableDonations);
      setFilteredDonations(availableDonations);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to fetch donations");
      setIsLoading(false);
    }
  };

  const handleReservationSuccess = () => {
    // Refresh the donations list after successful reservation
    fetchDonations();
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setIsDetailModalOpen(true);
  };

  const handleReserveFromModal = async (donationId) => {
    setIsReserving(true);
    try {
      const token = localStorage.getItem("foodShareToken");
      await reserveDonation(donationId, token);
      toast.success("Donation reserved successfully!");
      setIsDetailModalOpen(false);
      fetchDonations(); // Refresh the list
    } catch (error) {
      console.error("Error reserving donation:", error);
      toast.error(error.message || "Failed to reserve donation");
    } finally {
      setIsReserving(false);
    }
  };

  useEffect(() => {
    let filtered = donations;
    
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (donation) =>
          donation.title.toLowerCase().includes(lowercaseSearchTerm) ||
          donation.description.toLowerCase().includes(lowercaseSearchTerm) ||
          donation.donorName.toLowerCase().includes(lowercaseSearchTerm) ||
          donation.pickupAddress.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    setFilteredDonations(filtered);
  }, [searchTerm, donations]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!user || user.role !== "orphanage") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-6">
              <Building className="w-4 h-4 mr-2" />
              Available for {user.organization || "Your Organization"}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-sage-800">Browse Food Donations</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover fresh food donations from local restaurants, events, and generous individuals. 
              All listings show real-time availability with detailed pickup information.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl border-2 border-sage-100 shadow-lg p-6 mb-10">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, description, donor, or location..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all text-lg"
                />
              </div>
              
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center bg-sage-50 px-4 py-2 rounded-lg">
                  <Package className="w-5 h-5 mr-2 text-sage-600" />
                  <span className="font-medium text-sage-800">
                    {filteredDonations.length} available
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sage-600 mb-6"></div>
              <p className="text-xl text-muted-foreground">Loading available donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-sage-100 shadow-lg p-16">
              {searchTerm ? (
                <>
                  <Search className="w-20 h-20 text-sage-300 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-sage-800">No Matching Donations Found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-8 text-lg">
                    No donations matching "<span className="font-semibold text-sage-600">{searchTerm}</span>" were found. 
                    Try adjusting your search terms or browse all available donations.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-8 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors font-semibold"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <Heart className="w-20 h-20 text-sage-300 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-sage-800">No Donations Available</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-8 text-lg leading-relaxed">
                    There are currently no food donations available in your area. 
                    Check back later or encourage local food donors to share their surplus through FoodCall.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors font-semibold"
                    >
                      Refresh Page
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Results Summary */}
              <div className="mb-8 p-6 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 mr-3" />
                      <span className="text-xl font-bold">
                        {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''} ready for reservation
                      </span>
                    </div>
                    <p className="opacity-90 text-lg">
                      Fresh food from generous donors in your community, waiting to make a difference.
                    </p>
                  </div>
                  <MapPin className="w-8 h-8 opacity-80" />
                </div>
              </div>
              
              {/* Donations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDonations.map((donation) => (
                  <DonationCard
                    key={donation._id || donation.id}
                    donation={donation}
                    isOrphanage={true}
                    onReservationSuccess={handleReservationSuccess}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />

      {/* Detail Modal */}
      <DonationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        donation={selectedDonation}
        user={user}
        onReserve={handleReserveFromModal}
        isReserving={isReserving}
      />
    </div>
  );
};

export default DonationsList;
