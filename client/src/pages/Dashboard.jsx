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
    localStorage.removeItem("foodcallUser");
    localStorage.removeItem("foodcallToken");
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
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                {user.role === "donor"
                  ? "Donor Dashboard"
                  : "Orphanage Dashboard"}
              </span>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
              <p className="text-muted-foreground">
                {user.role === "donor"
                  ? "Manage your food donations and see their status."
                  : "View your reserved donations and manage pickups."}
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-3">
              {user.role === "donor" && (
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="btn-primary flex items-center space-x-2 bg-sage-500 text-white px-4 py-2 rounded-md hover:bg-sage-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Donation</span>
                </button>
              )}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {/* Role Card */}
            <div className="bg-white p-6 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sage-100 aspect-square min-w-[3rem] min-h-[3rem]">
                {user.role === "donor" ? (
                  <Heart className="w-6 h-6 text-sage-500" />
                ) : (
                  <User className="w-6 h-6 text-sage-500" />
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Role</p>
                <p className="font-medium capitalize">
                  {user.role === "donor" ? "Food Donor" : "Orphanage"}
                </p>
              </div>
            </div>

            {/* Total Donations Card */}
            <div className="bg-white p-6 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sage-100 aspect-square min-w-[3rem] min-h-[3rem]">
                <Package className="w-6 h-6 text-sage-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {user.role === "donor"
                    ? "Total Donations"
                    : "Total Reservations"}
                </p>
                <span className="font-medium text-lg">{donations.length}</span>
              </div>
            </div>

            {/* Completed Donations Card */}
            <div className="bg-white p-6 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sage-100 aspect-square min-w-[3rem] min-h-[3rem]">
                <CheckCircle2 className="w-6 h-6 text-sage-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <span className="font-medium text-lg">
                  {donations.filter((d) => d.status === "completed").length}
                </span>
              </div>
            </div>

            {/* Active Listings Card */}
            <div className="bg-white p-6 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 aspect-square min-w-[3rem] min-h-[3rem]">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {user.role === "donor"
                    ? "Active Listings"
                    : "Pending Pickups"}
                </p>
                <span className="font-medium text-lg">
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
          <div className="mb-8">
            <div className="flex border-b border-border">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "active"
                    ? "text-sage-500 border-b-2 border-sage-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("active")}
              >
                {user.role === "donor"
                  ? "Active Donations"
                  : "Active Reservations"}
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "history"
                    ? "text-sage-500 border-b-2 border-sage-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
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
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16 text-center">
              <Package className="w-16 h-16 text-sage-200 mb-4" />
              <h3 className="text-xl font-medium mb-2 text-center">
                {activeTab === "active"
                  ? user.role === "donor"
                    ? "No Active Donations"
                    : "No Active Reservations"
                  : "No History Found"}
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6 mx-auto">
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
                          className="mt-4 btn-primary bg-sage-600 hover:bg-sage-700"
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
                  className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors mx-auto"
                >
                  Create a Donation
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
