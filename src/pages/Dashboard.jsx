
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Package, User, CheckCircle2, Clock, Plus, Heart, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationCard from "@/components/DonationCard";
import DonationFormModal from "@/components/DonationFormModal";
import DonationDetailModal from "@/components/DonationDetailModal";
import { reserveDonation } from "../lib/api";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [isLoading, setIsLoading] = useState(true);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      toast.error("You must be logged in to access your dashboard");
      navigate("/");
      return;
    }
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
      fetchDonations(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("An error occurred. Please try logging in again.");
      navigate("/");
    }
  }, [navigate]);

  const fetchDonations = async (currentUser) => {
    try {
      const token = localStorage.getItem("foodShareToken");
      let endpoint = "http://localhost:5000/api/donations";
      
      // Different endpoints for different user types
      if (currentUser.role === "donor") {
        endpoint = "http://localhost:5000/api/donations/user/donor";
      } else if (currentUser.role === "orphanage") {
        endpoint = "http://localhost:5000/api/donations/user/reserved";
      }
      
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to fetch donations");
      setIsLoading(false);
    }
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
      if (user) {
        fetchDonations(user);
      }
    } catch (error) {
      console.error("Error reserving donation:", error);
      toast.error(error.message || "Failed to reserve donation");
    } finally {
      setIsReserving(false);
    }
  };

  const activeDonations = donations.filter((donation) =>
    ["available", "reserved"].includes(donation.status)
  );

  const completedDonations = donations.filter((donation) =>
    ["completed", "expired"].includes(donation.status)
  );

  const filteredDonations = activeTab === "active" ? activeDonations : completedDonations;

  const handleLogout = () => {
    localStorage.removeItem("foodShareUser");
    localStorage.removeItem("foodShareToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDonationSuccess = () => {
    if (user) {
      fetchDonations(user);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                {user.role === "donor" ? (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Donor Dashboard
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Orphanage Dashboard
                  </>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-3 text-sage-800">Welcome back, {user.name}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {user.role === "donor"
                  ? "Track your food donations and see the positive impact you're making in your community."
                  : "Manage your reserved donations and coordinate pickups with local food donors."}
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row gap-3">
              {user.role === "donor" && (
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="inline-flex items-center px-6 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Donation
                </button>
              )}
              <button 
                onClick={handleLogout} 
                className="px-6 py-3 border-2 border-sage-600 text-sage-700 rounded-xl hover:bg-sage-50 transition-colors font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Role Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Role</p>
                  <p className="text-xl font-bold text-sage-800 capitalize">
                    {user.role === "donor" ? "Food Donor" : "Orphanage"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center">
                  {user.role === "donor" ? (
                    <Heart className="w-6 h-6 text-sage-600" />
                  ) : (
                    <User className="w-6 h-6 text-sage-600" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Total Donations Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {user.role === "donor" ? "Total Donations" : "Total Reservations"}
                  </p>
                  <p className="text-2xl font-bold text-sage-800">{donations.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            {/* Active Items Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {user.role === "donor" ? "Active Listings" : "Pending Pickups"}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">{activeDonations.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            
            {/* Completed Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedDonations.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          {donations.length > 0 && (
            <div className="bg-gradient-to-r from-sage-500 to-sage-600 text-white p-6 rounded-2xl mb-12 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {user.role === "donor" ? "Your Impact" : "Community Support"}
                  </h3>
                  <p className="opacity-90">
                    {user.role === "donor" 
                      ? `You've created ${donations.length} donation${donations.length !== 1 ? 's' : ''} helping feed communities`
                      : `You've reserved ${donations.length} donation${donations.length !== 1 ? 's' : ''} for your organization`
                    }
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 opacity-80" />
              </div>
            </div>
          )}

          {/* Tabs for Active vs History */}
          <div className="mb-8">
            <div className="flex border-b-2 border-sage-200 bg-white rounded-t-xl">
              <button
                className={`px-8 py-4 font-semibold text-lg transition-all ${
                  activeTab === "active"
                    ? "text-sage-600 border-b-2 border-sage-600 bg-sage-50"
                    : "text-muted-foreground hover:text-sage-600 hover:bg-sage-50"
                }`}
                onClick={() => setActiveTab("active")}
              >
                {user.role === "donor" ? "Active Donations" : "Active Reservations"}
                <span className="ml-2 px-2 py-1 text-xs bg-sage-100 text-sage-700 rounded-full">
                  {activeDonations.length}
                </span>
              </button>
              <button
                className={`px-8 py-4 font-semibold text-lg transition-all ${
                  activeTab === "history"
                    ? "text-sage-600 border-b-2 border-sage-600 bg-sage-50"
                    : "text-muted-foreground hover:text-sage-600 hover:bg-sage-50"
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
                <span className="ml-2 px-2 py-1 text-xs bg-sage-100 text-sage-700 rounded-full">
                  {completedDonations.length}
                </span>
              </button>
            </div>
          </div>

          {/* Donations List */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sage-600 mb-6"></div>
              <p className="text-xl text-muted-foreground">Loading {user.role === "donor" ? "donations" : "reservations"}...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-sage-100 shadow-lg p-16">
              <Package className="w-20 h-20 text-sage-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-sage-800">
                {activeTab === "active" 
                  ? (user.role === "donor" ? "No Active Donations" : "No Active Reservations")
                  : "No History Found"
                }
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-8 text-lg leading-relaxed">
                {activeTab === "active"
                  ? user.role === "donor" 
                    ? "You haven't created any donations yet. Start sharing surplus food to help communities in need!"
                    : "You don't have any active reservations. Browse available donations to make a reservation."
                  : user.role === "donor"
                    ? "You don't have any completed or expired donations yet. Keep sharing food to build your impact history!"
                    : "You don't have any completed reservation history yet. Continue supporting your community!"
                }
              </p>
              {user.role === "donor" && activeTab === "active" && (
                <button 
                  onClick={() => setIsDonationModalOpen(true)}
                  className="px-8 py-4 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Create Your First Donation
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map((donation) => (
                <DonationCard
                  key={donation._id || donation.id}
                  donation={donation}
                  isOrphanage={user.role === "orphanage"}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
      
      {/* Modals */}
      <DonationFormModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onSuccess={handleDonationSuccess}
      />
      
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

export default Dashboard;
