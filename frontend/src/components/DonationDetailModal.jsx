import { X, Clock, MapPin, CalendarIcon, Package, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { reserveDonation } from "../lib/api";
import DeliveryOptionsModal from "./DeliveryOptionsModal";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DonationDetailModal = ({ isOpen, onClose, donation, userRole }) => {
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  if (!isOpen || !donation) return null;

  const statusClasses = {
    available: "bg-sage-100 text-sage-700",
    reserved: "bg-amber-100 text-amber-700",
    completed: "bg-blue-100 text-blue-700",
    expired: "bg-red-100 text-red-700",
  };

  const handleReserve = async (deliveryOption) => {
    try {
      const token = localStorage.getItem("foodShareToken");
      if (!token) {
        toast.error("Please log in to reserve donations");
        return;
      }

      console.log("Reserving donation with delivery option:", deliveryOption);

      await reserveDonation(donation._id || donation.id, token);
      toast.success("Donation reserved successfully! Donor has been notified.");
      onClose();
    } catch (error) {
      console.error("Error reserving donation:", error);
      toast.error(
        error.message || "Failed to reserve donation. Please try again."
      );
      throw error;
    }
  };

  return (
    <>
      <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              Donation Details
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Image */}
            {donation.imageUrl && (
              <div className="mb-6">
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="w-full h-64 object-cover rounded-lg border border-slate-200"
                />
              </div>
            )}

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusClasses[donation.status]
                }`}
              >
                {donation.status.charAt(0).toUpperCase() +
                  donation.status.slice(1)}
              </span>
            </div>

            {/* Title and Description */}
            <h3 className="text-2xl font-bold mb-4 text-slate-900">
              {donation.title}
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {donation.description}
            </p>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-sage-500" />
                  <div>
                    <div className="text-sm text-slate-500">Quantity</div>
                    <div className="font-medium text-slate-900">
                      {donation.quantity}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-sage-500" />
                  <div>
                    <div className="text-sm text-slate-500">Expiry Date</div>
                    <div className="font-medium text-slate-900">
                      {formatDate(donation.expiryDate)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-sage-500" />
                  <div>
                    <div className="text-sm text-slate-500">Pickup Time</div>
                    <div className="font-medium text-slate-900">
                      {formatTime(donation.pickupTimeStart)} -{" "}
                      {formatTime(donation.pickupTimeEnd)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sage-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Pickup Address</div>
                    <div className="font-medium text-slate-900">
                      {donation.pickupAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-sage-500" />
                  <div>
                    <div className="text-sm text-slate-500">
                      {userRole === "donor" ? "Reserved By" : "Donor"}
                    </div>
                    <div className="font-medium text-slate-900">
                      {userRole === "donor"
                        ? donation.reservedByName || "Not reserved yet"
                        : donation.donorName}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-slate-200">
              {userRole === "orphanage" && donation.status === "available" ? (
                <button
                  onClick={() => setIsDeliveryModalOpen(true)}
                  className="w-full py-3 px-4 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-medium"
                >
                  Reserve This Donation
                </button>
              ) : (
                <div className="text-center text-slate-500 py-3">
                  {donation.status === "reserved" &&
                    "This donation has been reserved. "}
                  {donation.status === "completed" &&
                    "This donation has been completed. "}
                  {donation.status === "expired" && "This donation has expired"}
                  {userRole === "donor" && "You are the donor of this item"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeliveryOptionsModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        donation={donation}
        onReserve={handleReserve}
      />
    </>
  );
};

export default DonationDetailModal;
