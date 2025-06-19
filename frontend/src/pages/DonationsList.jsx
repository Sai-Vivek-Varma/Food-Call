
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, Package, Heart, Building, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationCard from "@/components/DonationCard";
import { getAllDonations } from "@/lib/api";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
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
      console.log("Fetching donations...");
      
      const response = await getAllDonations();
      console.log("Received donations:", response);
      
      // Filter out expired donations and only show available ones for orphanages
      const now = new Date();
      const availableDonations = response.filter(donation => {
        const isExpired = new Date(donation.expiryDate) < now;
        console.log(`Donation ${donation.title}: expired=${isExpired}, status=${donation.status}`);
        return donation.status === "available" && !isExpired;
      });
      
      console.log("Available donations after filtering:", availableDonations);
      
      setDonations(availableDonations);
      setFilteredDonations(availableDonations);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to fetch donations: " + error.message);
      setIsLoading(false);
    }
  };

  const handleReservationSuccess = () => {
    // Refresh the donations list after successful reservation
    fetchDonations();
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4 flex items-center justify-center w-fit mx-auto">
              <Building className="w-4 h-4 mr-2" />
              Available for {user.organization || "Your Organization"}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Food Donations</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find and reserve available food donations for your organization. All listings show real-time availability with detailed pickup information and delivery options.
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
            
            <div className="flex items-center space-x-3 text-sm text-gray-600 bg-white px-4 py-3 rounded-xl border border-gray-200">
              <Package className="w-5 h-5 text-green-600" />
              <span className="font-medium">
                {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''} available
              </span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mb-6"></div>
              <p className="text-lg text-gray-600">Loading available donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm p-20">
              {searchTerm ? (
                <>
                  <Search className="w-20 h-20 text-gray-300 mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Matching Donations Found</h3>
                  <p className="text-gray-600 text-center max-w-md mb-8">
                    No donations matching "{searchTerm}" were found. Try adjusting your search terms or clear the search to see all available donations.
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
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Donations Available</h3>
                  <p className="text-gray-600 text-center max-w-md mb-8">
                    There are currently no food donations available in your area. Check back later or encourage local food donors to share their surplus through our platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={fetchDonations}
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
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                <div className="flex items-center text-green-700 mb-2">
                  <Heart className="w-6 h-6 mr-3" />
                  <span className="font-semibold text-lg">
                    {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''} ready for reservation
                  </span>
                </div>
                <p className="text-green-600 text-sm">
                  Click on any donation to view full details and make a reservation. Our integrated delivery system supports self-pickup, Swiggy, Dunzo, and Porter delivery options.
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
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DonationsList;
