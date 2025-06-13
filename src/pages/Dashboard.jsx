import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Package,
  User,
  CheckCircle2,
  Clock,
  Plus,
  Heart,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationCard from "@/components/DonationCard";
import DonationFormModal from "@/components/DonationFormModal";
import DonationDetailModal from "@/components/DonationDetailModal";
import { reserveDonation } from "../lib/api";
import axios from "axios";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Package, Clock, CheckCircle, Users, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      navigate("/auth");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/auth");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
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

  const filteredDonations =
    activeTab === "active" ? activeDonations : completedDonations;

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
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-4">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xl text-gray-600">
              {user.role === 'donor' 
                ? 'Ready to share some surplus food and make a difference?'
                : 'Let\'s find some donations for your community.'
              }
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sage-100">
              <div className="flex items-center justify-between mb-4">
                <Package className="w-10 h-10 text-sage-600" />
                <span className="text-3xl font-bold text-sage-800">12</span>
              </div>
              <h1 className="text-4xl font-bold mb-3 text-sage-800">
                Welcome back, {user.name}
              </h1>
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
                className="btn-outline border border-sage-500 text-sage-500 px-4 py-2 rounded-md hover:bg-sage-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
              <h3 className="font-semibold text-sage-800 mb-2">
                {user.role === 'donor' ? 'Total Donations' : 'Items Received'}
              </h3>
              <p className="text-gray-600 text-sm">This month</p>
            </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Role Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Your Role
                  </p>
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
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sage-100">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-10 h-10 text-orange-500" />
                <span className="text-3xl font-bold text-sage-800">3</span>
              </div>
              <h3 className="font-semibold text-sage-800 mb-2">Pending</h3>
              <p className="text-gray-600 text-sm">Awaiting pickup</p>
            </div>

            {/* Total Donations Card */}
            <div className="bg-white p-6 rounded-xl border border-border flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-sage-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {user.role === "donor"
                    ? "Total Donations"
                    : "Total Reservations"}
                </p>
                <p className="font-medium">{donations.length}</p>
              </div>
            </div>

            {/* Completed Donations Card */}
            <div className="bg-white p-6 rounded-xl border border-border flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <p className="font-medium">
                  {donations.filter((d) => d.status === "completed").length}
                </p>
              </div>
            </div>

            {/* Active Listings Card */}
            <div className="bg-white p-6 rounded-xl border border-border flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {user.role === "donor"
                    ? "Active Listings"
                    : "Pending Pickups"}
                </p>
                <p className="font-medium">
                  {
                    donations.filter(
                      (d) => d.status === "available" || d.status === "reserved"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          {donations.length > 0 && (
            <div className="bg-gradient-to-r from-sage-500 to-sage-600 text-white p-6 rounded-2xl mb-12 shadow-lg">
              <div className="flex items-center justify-between">

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sage-100">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-10 h-10 text-red-500" />
                <span className="text-3xl font-bold text-sage-800">450</span>
              </div>
              <h3 className="font-semibold text-sage-800 mb-2">People Helped</h3>
              <p className="text-gray-600 text-sm">Total impact</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-sage-100 p-8 mb-12">
            <h2 className="text-2xl font-bold text-sage-800 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {user.role === 'donor' ? (
                <>
                  <button className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200">
                    <Plus className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">Create New Donation</h3>
                      <p className="text-gray-600 text-sm">Share your surplus food</p>
                    </div>
                  </button>
                  <button className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200">
                    <Package className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">View My Donations</h3>
                      <p className="text-gray-600 text-sm">Track your contributions</p>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/donations')}
                    className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200"
                  >
                    <Package className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">Browse Donations</h3>
                      <p className="text-gray-600 text-sm">Find available food</p>
                    </div>
                  </button>
                  <button className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200">
                    <Users className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">My Reservations</h3>
                      <p className="text-gray-600 text-sm">Track reserved items</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-sage-100 p-8">
            <h2 className="text-2xl font-bold text-sage-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4" />
                <div>
                  <p className="font-medium text-green-800">
                    {user.role === 'donor' 
                      ? 'Your donation of fresh vegetables was picked up'
                      : 'Successfully received donation from Local Restaurant'
                    }
                  </p>
                  <p className="text-green-600 text-sm">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-blue-800">
                    {user.role === 'donor' 
                      ? 'New reservation on your bread donation'
                      : 'Your reservation for fruit donation is confirmed'
                    }
                  <h3 className="text-lg font-semibold mb-2">
                    {user.role === "donor"
                      ? "Your Impact"
                      : "Community Support"}
                  </h3>
                  <p className="opacity-90">
                    {user.role === "donor"
                      ? `You've created ${donations.length} donation${
                          donations.length !== 1 ? "s" : ""
                        } helping feed communities`
                      : `You've reserved ${donations.length} donation${
                          donations.length !== 1 ? "s" : ""
                        } for your organization`}
                  </p>
                  <p className="text-blue-600 text-sm">5 hours ago</p>
                </div>
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
                {user.role === "donor"
                  ? "Active Donations"
                  : "Active Reservations"}
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
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mb-4"></div>
              <p className="text-muted-foreground">
                Loading {user.role === "donor" ? "donations" : "reservations"}
                ...
              </p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16">
              <Package className="w-16 h-16 text-sage-200 mb-4" />
              <h3 className="text-xl font-medium mb-2">
                {activeTab === "active"
                  ? user.role === "donor"
                    ? "No Active Donations"
                    : "No Active Reservations"
                  : "No History Found"}
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-8 text-lg leading-relaxed">
                {activeTab === "active"
                  ? user.role === "donor"
                    ? "You don't have any active donations. Create a new donation to get started!"
                    : "You don't have any active reservations. Browse available donations to make a reservation."
                  : user.role === "donor"
                  ? "You don't have any completed or expired donations yet."
                  : "You don't have any completed reservations yet."}
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
      </main>
      
      <Footer />

      {/* Donation Form Modal */}
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
