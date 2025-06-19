
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar, MapPin, Clock, User, Package, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllDonations, reserveDonation } from "@/lib/api";

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get user from localStorage
    const userJson = localStorage.getItem("foodShareUser");
    if (userJson) {
      try {
        setUser(JSON.parse(userJson));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    fetchDonationDetail();
  }, [id]);

  const fetchDonationDetail = async () => {
    try {
      const donations = await getAllDonations();
      const foundDonation = donations.find(d => d._id === id || d.id === id);
      
      if (foundDonation) {
        setDonation(foundDonation);
      } else {
        toast.error("Donation not found");
        navigate("/donations");
      }
    } catch (error) {
      console.error("Error fetching donation:", error);
      toast.error("Failed to fetch donation details");
      navigate("/donations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!user) {
      toast.error("Please log in to reserve donations");
      navigate("/auth");
      return;
    }

    if (user.role !== "orphanage") {
      toast.error("Only orphanages can reserve donations");
      return;
    }

    setIsReserving(true);
    try {
      const token = localStorage.getItem("foodShareToken");
      await reserveDonation(donation._id || donation.id, token);
      toast.success("Donation reserved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error reserving donation:", error);
      toast.error("Failed to reserve donation");
    } finally {
      setIsReserving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold mb-4">Donation Not Found</h1>
              <button
                onClick={() => navigate("/donations")}
                className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
              >
                Back to Donations
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sage-600 hover:text-sage-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            {donation.imageUrl && (
              <div className="w-full h-64 bg-gray-100">
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{donation.title}</h1>
                  <div className="flex items-center text-sage-600 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    <span>Donated by {donation.donorName}</span>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    donation.status === 'available' 
                      ? 'bg-green-100 text-green-700'
                      : donation.status === 'reserved'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                  </span>
                </div>
                
                {user && user.role === "orphanage" && donation.status === "available" && (
                  <button
                    onClick={handleReservation}
                    disabled={isReserving}
                    className="bg-sage-500 text-white px-6 py-3 rounded-md hover:bg-sage-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isReserving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Reserving...
                      </>
                    ) : (
                      <>
                        <Package className="w-4 h-4 mr-2" />
                        Reserve Donation
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="prose max-w-none mb-8">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700">{donation.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Package className="w-5 h-5 mr-3 text-sage-500" />
                    <div>
                      <span className="font-medium">Quantity:</span>
                      <span className="ml-2">{donation.quantity}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-sage-500" />
                    <div>
                      <span className="font-medium">Expiry Date:</span>
                      <span className="ml-2">{formatDate(donation.expiryDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-sage-500" />
                    <div>
                      <span className="font-medium">Pickup Address:</span>
                      <span className="ml-2">{donation.pickupAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-3 text-sage-500" />
                    <div>
                      <span className="font-medium">Pickup Time:</span>
                      <span className="ml-2">
                        {formatTime(donation.pickupTimeStart)} - {formatTime(donation.pickupTimeEnd)}
                      </span>
                    </div>
                  </div>
                  
                  {donation.reservedByName && (
                    <div className="flex items-center text-gray-700">
                      <User className="w-5 h-5 mr-3 text-sage-500" />
                      <div>
                        <span className="font-medium">Reserved by:</span>
                        <span className="ml-2">{donation.reservedByName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {donation.status === 'reserved' && user && user.role === 'orphanage' && (
                <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-800">
                    This donation has been reserved. Please contact the donor for pickup coordination.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DonationDetail;
