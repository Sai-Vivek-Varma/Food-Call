import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Clock,
  Package,
  User,
  Phone,
  MessageSquare,
  ArrowLeft,
  Truck,
} from "lucide-react";
import GradientButton from "../components/GradientButton";
import LoadingSpinner from "../components/LoadingSpinner";
import DeliveryOptionsModal from "../components/DeliveryOptionsModal";

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  useEffect(() => {
    // Mock donation data - replace with API call
    setTimeout(() => {
      const mockDonation = {
        id: id,
        title: "Fresh Vegetables from Restaurant",
        description:
          "High-quality fresh vegetables including carrots, potatoes, onions, and leafy sages. Perfect for preparing nutritious meals.",
        quantity: "25kg mixed vegetables",
        expiryDate: new Date(
          Date.now() + 2 * 24 * 60 * 60 * 1000
        ).toISOString(),
        pickupAddress: "123 Restaurant Street, Downtown",
        pickupTimeStart: "2024-01-15T10:00:00Z",
        pickupTimeEnd: "2024-01-15T16:00:00Z",
        status: "available",
        imageUrl:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
        donor: {
          name: "sage Plate Restaurant",
          phone: "+1-234-567-8900",
          email: "contact@sageplate.com",
        },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      };
      setDonation(mockDonation);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleReserve = async () => {
    if (!user) {
      toast.error("Please login to reserve donations");
      navigate("/auth");
      return;
    }

    if (user.role !== "orphanage") {
      toast.error("Only orphanages can reserve donations");
      return;
    }

    try {
      // API call to reserve donation
      toast.success("Donation reserved successfully!");
      setDonation((prev) => ({ ...prev, status: "reserved" }));
    } catch (error) {
      toast.error("Failed to reserve donation");
    }
  };

  const handleDeliveryBook = () => {
    setShowDeliveryModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50 pt-24">
        <div className="container-custom">
          <LoadingSpinner size="xl" className="min-h-[400px]" />
        </div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50 pt-24">
        <div className="container-custom text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Donation Not Found</h1>
          <GradientButton onClick={() => navigate("/donations")}>
            Back to Donations
          </GradientButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50 pt-24">
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-sage-600 hover:text-sage-700 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Image Section */}
            {donation.imageUrl && (
              <div className="h-64 md:h-80 relative overflow-hidden">
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.status === "available"
                        ? "status-available"
                        : donation.status === "reserved"
                        ? "status-reserved"
                        : donation.status === "completed"
                        ? "status-completed"
                        : "status-expired"
                    }`}
                  >
                    {donation.status.charAt(0).toUpperCase() +
                      donation.status.slice(1)}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Title and Description */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4 gradient-text">
                  {donation.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {donation.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-sage-50 to-emerald-50 rounded-xl">
                    <Package className="w-5 h-5 text-sage-600" />
                    <div>
                      <p className="font-semibold text-gray-700">Quantity</p>
                      <p className="text-sage-600">{donation.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-gray-700">Expiry Date</p>
                      <p className="text-orange-600">
                        {new Date(donation.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-700">
                        Pickup Location
                      </p>
                      <p className="text-blue-600">{donation.pickupAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-700">Pickup Time</p>
                      <p className="text-purple-600">
                        {new Date(
                          donation.pickupTimeStart
                        ).toLocaleTimeString()}{" "}
                        -{" "}
                        {new Date(donation.pickupTimeEnd).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-600" />
                  Donor Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Organization</p>
                    <p className="font-semibold">{donation.donor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">{donation.donor.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{donation.donor.email}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {user?.role === "orphanage" &&
                  donation.status === "available" && (
                    <>
                      <GradientButton
                        onClick={handleReserve}
                        className="flex-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Reserve Donation
                      </GradientButton>
                      <GradientButton
                        onClick={handleDeliveryBook}
                        variant="secondary"
                        className="flex-1"
                      >
                        <Truck className="w-4 h-4" />
                        Book Delivery
                      </GradientButton>
                    </>
                  )}

                {user?.role === "donor" && (
                  <GradientButton
                    onClick={() => navigate(`/donations/edit/${id}`)}
                    className="flex-1"
                  >
                    Edit Donation
                  </GradientButton>
                )}

                <GradientButton
                  onClick={() => window.open(`tel:${donation.donor.phone}`)}
                  variant="secondary"
                >
                  <Phone className="w-4 h-4" />
                  Call Donor
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Modal */}
      <DeliveryOptionsModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        donation={donation}
      />
    </div>
  );
};

export default DonationDetail;
