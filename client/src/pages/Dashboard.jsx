import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Package, User, CheckCircle2, Clock, Plus, Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import DonationCard from "@/components/DonationCard";
import DonationFormModal from "@/components/DonationFormModal";
import { fetchDonations } from "../slices/donationsSlice";
import { setUser } from "../slices/userSlice";

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
    if (!user) return; // Don't fetch or redirect if user is not loaded yet
    dispatch(fetchDonations(user.role));
    // eslint-disable-next-line
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

  const handleLogout = () => {
    localStorage.removeItem("foodShareUser");
    localStorage.removeItem("foodShareToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDonationSuccess = () => {
    setIsDonationModalOpen(false);
    if (user) {
      dispatch(fetchDonations(user.role));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50">
      <section className="pt-28 pb-16 px-4 fade-in">
        <div className="container mx-auto max-w-6xl">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-sage-100 to-emerald-100 text-sage-700 font-semibold text-sm mb-6 shadow-lg border border-sage-200">
                {user.role === "donor"
                  ? "Donor Dashboard"
                  : "Orphanage Dashboard"}
              </span>
              <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome, {user.name}</h1>
              <p className="text-gray-600 text-lg">
                {user.role === "donor"
                  ? "Manage your food donations and see their status."
                  : "View your reserved donations and manage pickups."}
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex space-x-4">
              {user.role === "donor" && (
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="btn-primary group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>New Donation</span>
                </button>
              )}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 slide-up">
            {/* Role Card */}
            <div className="card-enhanced p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 group">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sage-100 to-emerald-100 aspect-square min-w-[3.5rem] min-h-[3.5rem] group-hover:scale-110 transition-transform duration-300 shadow-md">
                {user.role === "donor" ? (
                  <Heart className="w-7 h-7 text-sage-600" />
                ) : (
                  <User className="w-7 h-7 text-sage-600" />
                )}
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Role</p>
                <p className="font-bold capitalize text-lg">
                  {user.role === "donor" ? "Food Donor" : "Orphanage"}
                </p>
              </div>
            </div>

            {/* Total Donations Card */}
            <div className="card-enhanced p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 group">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sage-100 to-emerald-100 aspect-square min-w-[3.5rem] min-h-[3.5rem] group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Package className="w-7 h-7 text-sage-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  {user.role === "donor"
                    ? "Total Donations"
                    : "Total Reservations"}
                </p>
                <span className="font-bold text-2xl gradient-text">{donations.length}</span>
              </div>
            </div>

            {/* Completed Donations Card */}
            <div className="card-enhanced p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 group">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 aspect-square min-w-[3.5rem] min-h-[3.5rem] group-hover:scale-110 transition-transform duration-300 shadow-md">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <span className="font-bold text-2xl text-green-600">
                  {donations.filter((d) => d.status === "completed").length}
                </span>
              </div>
            </div>

            {/* Active Listings Card */}
            <div className="card-enhanced p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 group">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 aspect-square min-w-[3.5rem] min-h-[3.5rem] group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  {user.role === "donor"
                    ? "Active Listings"
                    : "Pending Pickups"}
                </p>
                <span className="font-bold text-2xl text-orange-600">
                  {
                    donations.filter(
                      (d) => d.status === "available" || d.status === "reserved"
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Tabs for Active vs History */}
          <div className="mb-10">
            <div className="flex border-b-2 border-gray-200 bg-white rounded-t-2xl p-2 shadow-sm">
              <button
                className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === "active"
                    ? "text-white bg-gradient-to-r from-sage-500 to-emerald-500 shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-sage-600 hover:bg-sage-50"
                }`}
                onClick={() => setActiveTab("active")}
              >
                {user.role === "donor"
                  ? "Active Donations"
                  : "Active Reservations"}
              </button>
              <button
                className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 ${
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
                Loading {user.role === "donor" ? "donations" : "reservations"}
                ...
              </p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center card-enhanced p-20 text-center fade-in">
              <Package className="w-20 h-20 text-sage-200 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-center">
                {activeTab === "active"
                  ? user.role === "donor"
                    ? "No Active Donations"
                    : "No Active Reservations"
                  : "No History Found"}
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-8 mx-auto text-lg">
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
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("/donations")}
                          className="mt-6 btn-primary"
                        >
                          Browse Donations
                        </button>
                      </div>
                    </>
                  )
                ) : user.role === "donor" ? (
                  "You don't have any completed or expired donations yet."
                ) : (
                  "You don't have any completed reservations yet."
                )}
              </p>
              {user.role === "donor" && activeTab === "active" && (
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="btn-primary mx-auto"
                >
                  Create a Donation
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 slide-up">
              {filteredDonations.map((donation) => (
                <DonationCard
                  key={donation._id || donation.id}
                  donation={donation}
                  isOrphanage={user.role === "orphanage"}
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
