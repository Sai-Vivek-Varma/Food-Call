import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Search, Filter, Package, Heart, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationCard from "@/components/DonationCard";
import axios from "axios";

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("available");
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

  useEffect(() => {
    let filtered = donations;
    
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (donation) =>
          donation.title.toLowerCase().includes(lowercaseSearchTerm) ||
          donation.description.toLowerCase().includes(lowercaseSearchTerm) ||
          donation.donorName.toLowerCase().includes(lowercaseSearchTerm)
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
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4 flex items-center justify-center w-fit mx-auto">
              <Building className="w-4 h-4 mr-2" />
              Available for {user.organization || "Your Organization"}
            </span>
            <h1 className="text-3xl font-bold mb-2">Browse Food Donations</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find and reserve available food donations for your organization. All listings show real-time availability and detailed information.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search donations by title, description, or donor..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Package className="w-4 h-4" />
              <span>Showing {filteredDonations.length} available donations</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mb-4"></div>
              <p className="text-muted-foreground">Loading available donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16">
              {searchTerm ? (
                <>
                  <Search className="w-16 h-16 text-sage-200 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Matching Donations Found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    No donations matching "{searchTerm}" were found. Try adjusting your search terms.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <Heart className="w-16 h-16 text-sage-200 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Donations Available</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    There are currently no food donations available. Check back later or encourage local food donors to share their surplus.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-sage-50 rounded-lg border border-sage-200">
                <div className="flex items-center text-sage-700">
                  <Heart className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''} available for reservation
                  </span>
                </div>
                <p className="text-sage-600 text-sm mt-1">
                  Click on any donation to view details and make a reservation for your organization.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
