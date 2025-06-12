
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Calendar, Clock, MapPin, Package, User, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    // Get user details
    const userJson = localStorage.getItem("foodShareUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    if (id) {
      fetchDonation();
    }
  }, [id]);

  const fetchDonation = async () => {
    try {
      const token = localStorage.getItem("foodShareToken");
      const response = await axios.get(`http://localhost:5000/api/donations/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setDonation(response.data);
    } catch (error) {
      console.error("Error fetching donation details:", error);
      toast.error("Failed to fetch donation details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!user) {
      toast.error("Please log in to reserve donations");
      return;
    }

    if (user.role !== "orphanage") {
      toast.error("Only orphanages can reserve donations");
      return;
    }

    setIsReserving(true);
    try {
      const token = localStorage.getItem("foodShareToken");
      await axios.post(`http://localhost:5000/api/donations/${id}/reserve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Donation reserved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error reserving donation:", error);
      toast.error(error.response?.data?.message || "Failed to reserve donation");
    } finally {
      setIsReserving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mb-4"></div>
            <p className="text-muted-foreground">Loading donation details...</p>
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
        <div className="pt-28 flex items-center justify-center p-4">
          <div className="text-center">
            <Package className="w-16 h-16 text-sage-200 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">Donation Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The donation you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to={user?.role === "orphanage" ? "/donations" : "/dashboard"}
              className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
            >
              Go Back
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const canReserve = user && user.role === "orphanage" && donation.status === "available";
  const isOwner = user && user.role === "donor" && donation.donorId === user.id;

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back navigation */}
          <Link 
            to={user?.role === "orphanage" ? "/donations" : "/dashboard"}
            className="inline-flex items-center text-sage-500 hover:text-sage-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {user?.role === "orphanage" ? "Donations" : "Dashboard"}
          </Link>

          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            {/* Donation Image */}
            {donation.imageUrl && (
              <div className="w-full h-64 md:h-80">
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  donation.status === "available" 
                    ? "bg-green-100 text-green-800"
                    : donation.status === "reserved"
                    ? "bg-orange-100 text-orange-800"
                    : donation.status === "completed"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {donation.status === "available" && <CheckCircle className="w-4 h-4 mr-1" />}
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
                
                {isOwner && (
                  <span className="text-sm text-muted-foreground bg-sage-50 px-3 py-1 rounded-full">
                    Your Donation
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold mb-4">{donation.title}</h1>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{donation.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-sage-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Quantity</p>
                      <p className="text-muted-foreground">{donation.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-sage-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Expiry Date</p>
                      <p className="text-muted-foreground">
                        {new Date(donation.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-sage-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Donor</p>
                      <p className="text-muted-foreground">{donation.donorName}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-sage-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Pickup Address</p>
                      <p className="text-muted-foreground">{donation.pickupAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-sage-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Pickup Time</p>
                      <p className="text-muted-foreground">
                        {new Date(donation.pickupTimeStart).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(donation.pickupTimeEnd).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {donation.reservedByName && (
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Reserved By</p>
                        <p className="text-muted-foreground">{donation.reservedByName}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {canReserve && (
                <div className="border-t border-border pt-6">
                  <button
                    onClick={handleReservation}
                    disabled={isReserving}
                    className="w-full md:w-auto bg-sage-500 text-white px-8 py-3 rounded-md hover:bg-sage-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isReserving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Reserving...
                      </>
                    ) : (
                      "Reserve This Donation"
                    )}
                  </button>
                  <p className="text-sm text-muted-foreground mt-2">
                    By reserving, you confirm your organization will pick up this donation within the specified time frame.
                  </p>
                </div>
              )}

              {donation.status === "reserved" && !isOwner && user?.role === "orphanage" && (
                <div className="border-t border-border pt-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                    <p className="text-orange-800 font-medium">This donation is already reserved</p>
                    <p className="text-orange-600 text-sm mt-1">
                      This donation has been reserved by another organization.
                    </p>
                  </div>
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
