import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Package, User, CheckCircle2, Clock, Plus, Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import DonationCard from "@/components/DonationCard";
import DonationFormModal from "@/components/DonationFormModal";
import { fetchDonations } from "../slices/donationsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const donations = useSelector((state) => state.donations.items);
  const isLoading = useSelector((state) => state.donations.loading);

  const [activeTab, setActiveTab] = useState("active");
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) return;
    dispatch(fetchDonations(user.role));
  }, [dispatch, user]);

  useEffect(() => {
    if (user === null) {
      toast.error("You must be logged in to access your dashboard");
      navigate("/auth");
    }
  }, [user, navigate]);

  const filteredDonations = donations.filter((donation) =>
    activeTab === "active"
      ? ["available", "reserved"].includes(donation.status)
      : ["completed", "expired"].includes(donation.status)
  );

  const handleDonationSuccess = () => {
    setIsDonationModalOpen(false);
    if (user) {
      dispatch(fetchDonations(user.role));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50">
      <section className="section-padding pt-24 fade-in">
        <div className="container-custom">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-sage-100 to-emerald-100 text-sage-700 font-semibold text-sm shadow-lg border border-sage-200">
                {user.role === "donor" ? "Donor Dashboard" : "Orphanage Dashboard"}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl max-w-2xl text-pretty">
                {user.role === "donor"
                  ? "Manage your food donations and see their status."
                  : "View your reserved donations and manage pickups."}
              </p>
            </div>
            
            {user.role === "donor" && (
              <div className="flex-shrink-0">
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="btn-primary group text-lg px-8 py-4"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>New Donation</span>
                </button>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="stats-grid mb-12 slide-up">
            {/* Role Card */}
            <div className="stat-card">
              <div className="stat-icon bg-gradient-to-br from-sage-100 to-emerald-100">
                {user.role === "donor" ? (
                  <Heart className="w-7 h-7 text-sage-600" />
                ) : (
                  <User className="w-7 h-7 text-sage-600" />
                )}
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Role</p>
                <p className="font-bold capitalize text-lg">
                  {user.role === "donor" ? "Food Donor" : "Orphanage"}
                </p>
              </div>
            </div>

            {/* Total Donations Card */}
            <div className="stat-card">
              <div className="stat-icon bg-gradient-to-br from-sage-100 to-emerald-100">
                <Package className="w-7 h-7 text-sage-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  {user.role === "donor" ? "Total Donations" : "Total Reservations"}
                </p>
                <span className="stat-value gradient-text">{donations.length}</span>
              </div>
            </div>

            {/* Completed Donations Card */}
            <div className="stat-card">
              <div className="stat-icon bg-gradient-to-br from-green-100 to-emerald-100">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
                <span className="stat-value text-green-600">
                  {donations.filter((d) => d.status === "completed").length}
                </span>
              </div>
            </div>

            {/* Active Listings Card */}
            <div className="stat-card">
              <div className="stat-icon bg-gradient-to-br from-orange-100 to-amber-100">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  {user.role === "donor" ? "Active Listings" : "Pending Pickups"}
                </p>
                <span className="stat-value text-orange-600">
                  {donations.filter((d) => d.status === "available" || d.status === "reserved").length}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs for Active vs History */}
          <div className="mb-10">
            <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 max-w-md">
              <button
                className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === "active"
                    ? "text-white bg-gradient-to-r from-sage-500 to-emerald-500 shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-sage-600 hover:bg-sage-50"
                }`}
                onClick={() => setActiveTab("active")}
              >
                {user.role === "donor" ? "Active Donations" : "Active Reservations"}
              </button>
              <button
                className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === "history"
                    ? "text-white bg-gradient-to-r from-sage-500 to-emerald-500 shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-sage-600 hover:bg-sage-50"
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
            </div>
          </div>

          {/* Donations List */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 scale-in">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sage-500 mb-6"></div>
              <p className="text-gray-600 text-lg">
                Loading {user.role === "donor" ? "donations" : "reservations"}...
              </p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center card-enhanced p-16 lg:p-20 text-center fade-in">
              <Package className="w-20 h-20 text-sage-200 mb-6" />
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {activeTab === "active"
                  ? user.role === "donor"
                    ? "No Active Donations"
                    : "No Active Reservations"
                  : "No History Found"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg leading-relaxed text-pretty">
                {activeTab === "active" ? (
                  user.role === "donor" ? (
                    "You don't have any active donations. Create a new donation to get started!"
                  ) : (
                    <>
                      You don't have any active reservations.
                      <br />
                      <span className="block mt-2">
                        Browse available donations to make a reservation.
                      </span>
                    </>
                  )
                ) : user.role === "donor" ? (
                  "You don't have any completed or expired donations yet."
                ) : (
                  "You don't have any completed reservations yet."
                )}
              </p>
              
              {user.role === "donor" && activeTab === "active" ? (
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="btn-primary"
                >
                  Create a Donation
                </button>
              ) : user.role === "orphanage" && activeTab === "active" ? (
                <button
                  onClick={() => navigate("/donations")}
                  className="btn-primary"
                >
                  Browse Donations
                </button>
              ) : null}
            </div>
          ) : (
            <div className="card-grid slide-up">
              {filteredDonations.map((donation) => (
                <DonationCard
                  key={donation._id || donation.id}
                  donation={donation}
                  isOrphanage={user.role === "orphanage"}
                  onReservationSuccess={handleDonationSuccess}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Donation Form Modal */}
      {user.role === "donor" && (
        <DonationFormModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          onSuccess={handleDonationSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;