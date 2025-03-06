import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Package, User, CheckCircle2, Clock, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationCard from "@/components/DonationCard";
import { User as UserType, Donation } from "@/lib/types";
import axios from "axios";
const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      toast.error("You must be logged in to access your dashboard");
      navigate("/auth");
      return;
    }
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
      // Fetch donations from backend
      const fetchDonations = async () => {
        try {
          const response = await axios.get<Donation[]>(
            "https://food-call.onrender.com/api/donations",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "foodShareToken"
                )}`,
              },
            }
          );
          setDonations(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching donations:", error);
          toast.error("Failed to fetch donations");
          setIsLoading(false);
        }
      };
      fetchDonations();
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("An error occurred. Please try logging in again.");
      navigate("/auth");
    }
  }, [navigate]);
  const filteredDonations = donations.filter((donation) =>
    activeTab === "active"
      ? ["available", "reserved"].includes(donation.status)
      : ["completed", "expired"].includes(donation.status)
  );
  const handleLogout = () => {
    localStorage.removeItem("foodShareUser");
    toast.success("Logged out successfully");
    navigate("/");
  };
  if (!user) return null;
  return (
    <div className='min-h-screen'>
      <Navbar />
      <section className='pt-28 pb-16 px-4'>
        <div className='container mx-auto max-w-6xl'>
          {/* Dashboard header and summary cards */}
          <div className='flex flex-col md:flex-row md:items-center justify-between mb-10'>
            <div>
              <span className='inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4'>
                Dashboard
              </span>
              <h1 className='text-3xl font-bold mb-2'>Welcome, {user.name}</h1>
              <p className='text-muted-foreground'>
                {user.role === "donor"
                  ? "Manage your food donations and see their status."
                  : "View your reserved donations and manage pickups."}
              </p>
            </div>
            <div className='mt-6 md:mt-0 flex space-x-3'>
              {user.role === "donor" && (
                <Link
                  to='/donate'
                  className='btn-primary flex items-center space-x-2'
                >
                  <Plus className='w-4 h-4' />
                  <span>New Donation</span>
                </Link>
              )}
              <button onClick={handleLogout} className='btn-outline'>
                Sign Out
              </button>
            </div>
          </div>
          {/* Donation summary cards */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-10'>
            {/* Card for Role */}
            <div className='bg-white p-6 rounded-xl border border-border flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center'>
                <User className='w-6 h-6 text-sage-500' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Role</p>
                <p className='font-medium capitalize'>{user.role}</p>
              </div>
            </div>
            {/* Card for Total Donations */}
            <div className='bg-white p-6 rounded-xl border border-border flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center'>
                <Package className='w-6 h-6 text-sage-500' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Total Donations</p>
                <p className='font-medium'>{donations.length}</p>
              </div>
            </div>
            {/* Card for Completed Donations */}
            <div className='bg-white p-6 rounded-xl border border-border flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center'>
                <CheckCircle2 className='w-6 h-6 text-green-500' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>Completed</p>
                <p className='font-medium'>
                  {donations.filter((d) => d.status === "completed").length}
                </p>
              </div>
            </div>
            {/* Card for Active Listings */}
            <div className='bg-white p-6 rounded-xl border border-border flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center'>
                <Clock className='w-6 h-6 text-orange-500' />
              </div>
              <div>
                <p className='text-muted-foreground text-sm'>
                  {user.role === "donor"
                    ? "Active Listings"
                    : "Pending Pickups"}
                </p>
                <p className='font-medium'>
                  {
                    donations.filter(
                      (d) => d.status === "available" || d.status === "reserved"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          {/* Tabs for Active / History */}
          <div className='mb-8'>
            <div className='flex border-b border-border'>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "active"
                    ? "text-sage-500 border-b-2 border-sage-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active Donations
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
          {isLoading ? (
            <div className='flex flex-col items-center justify-center py-16'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mb-4'></div>
              <p className='text-muted-foreground'>Loading donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className='flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16'>
              <Package className='w-16 h-16 text-sage-200 mb-4' />
              <h3 className='text-xl font-medium mb-2'>No Donations Found</h3>
              <p className='text-muted-foreground text-center max-w-md mb-6'>
                {activeTab === "active"
                  ? "You don't have any active donations. Create a new donation to get started!"
                  : "You don't have any completed or expired donations yet."}
              </p>
              {user.role === "donor" && (
                <Link to='/donate' className='btn-primary'>
                  Create a Donation
                </Link>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredDonations.map((donation) => (
                <DonationCard
                  key={donation.id || donation._id}
                  donation={donation}
                  isOrphanage={user?.role === "orphanage"}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Dashboard;
