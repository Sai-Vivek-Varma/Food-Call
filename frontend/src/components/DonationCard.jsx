import { Clock, MapPin, CalendarIcon, Package, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { reserveDonation } from "../lib/api";
import DonationDetailModal from "./DonationDetailModal";
import DeliveryOptionsModal from "./DeliveryOptionsModal";
import DonationFormModal from "./DonationFormModal";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTimeIST = (date) => {
  // Always format as IST (Asia/Kolkata)
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};

const DonationCard = ({
  donation,
  isOrphanage = false,
  onReservationSuccess,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Check if donation is expired
  const isExpired = new Date(donation.expiryDate) < new Date();

  // Don't render expired donations for orphanages
  if (isExpired && isOrphanage) {
    return null;
  }

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

      if (onReservationSuccess) {
        onReservationSuccess();
      }
    } catch (error) {
      console.error("Error reserving donation:", error);
      toast.error(
        error.message || "Failed to reserve donation. Please try again."
      );
      throw error;
    }
  };

  const handleCardClick = () => {
    setIsDetailModalOpen(true);
  };

  const handleReserveClick = (e) => {
    e.stopPropagation();
    setIsDeliveryModalOpen(true);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md cursor-pointer card-hover"
        onClick={handleCardClick}
      >
        {donation.imageUrl && (
          <div className="relative h-48 rounded-t-xl overflow-hidden">
            <img
              src={donation.imageUrl}
              alt={donation.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusClasses[donation.status]
                }`}
              >
                {donation.status.charAt(0).toUpperCase() +
                  donation.status.slice(1)}
              </span>
            </div>
          </div>
        )}

        <div className="p-5">
          {!donation.imageUrl && (
            <div className="mb-4 flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusClasses[donation.status]
                }`}
              >
                {donation.status.charAt(0).toUpperCase() +
                  donation.status.slice(1)}
              </span>
            </div>
          )}

          <h3 className="text-lg font-semibold mb-2 truncate text-slate-900">
            {donation.title}
          </h3>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {donation.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-slate-600">
              <Package className="w-4 h-4 mr-2 text-sage-500" />
              <span>{donation.quantity}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <CalendarIcon className="w-4 h-4 mr-2 text-sage-500" />
              <span>Expires: {formatDate(donation.expiryDate)}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="w-4 h-4 flex-shrink-0 mr-2 text-sage-500" />
              <span className="truncate">{donation.pickupAddress}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Clock className="w-4 h-4 mr-2 text-sage-500" />
              <span>
                Pickup: {formatTimeIST(donation.pickupTimeStart)} -{" "}
                {formatTimeIST(donation.pickupTimeEnd)}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
            {isOrphanage && donation.status === "available" ? (
              <button
                onClick={handleReserveClick}
                className="w-full py-2 px-4 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors text-center text-sm font-medium"
              >
                Reserve Donation
              </button>
            ) : (
              <>
                {/* Edit button for donor's own donations, not completed */}
                {!isOrphanage &&
                  donation.donorId ===
                    (localStorage.getItem("foodShareUser")
                      ? JSON.parse(localStorage.getItem("foodShareUser"))._id
                      : undefined) &&
                  donation.status !== "completed" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditModalOpen(true);
                      }}
                      className="w-full py-2 px-4 border border-black text-black rounded-md hover:bg-gray-100 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </button>
                  )}
                {/* Show Finish Donation button for donor if reserved and owner */}
                {!isOrphanage &&
                  donation.status === "reserved" &&
                  donation.donorId ===
                    (localStorage.getItem("foodShareUser")
                      ? JSON.parse(localStorage.getItem("foodShareUser"))._id
                      : undefined) && (
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          await import("../lib/api").then(
                            ({ completeDonation }) =>
                              completeDonation(donation._id || donation.id)
                          );
                          toast.success("Donation marked as completed!");
                          if (onReservationSuccess) {
                            onReservationSuccess();
                          } else {
                            window.location.reload();
                          }
                        } catch (error) {
                          toast.error("Failed to complete donation");
                        }
                      }}
                      className="w-full py-2 px-4 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors text-center text-sm font-medium"
                    >
                      Finish Donation
                    </button>
                  )}
              </>
            )}
          </div>
        </div>
      </div>

      <DonationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        donation={donation}
        userRole={isOrphanage ? "orphanage" : "donor"}
        userId={
          localStorage.getItem("foodShareUser")
            ? JSON.parse(localStorage.getItem("foodShareUser"))._id
            : undefined
        }
      />

      <DeliveryOptionsModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        donation={donation}
        onReserve={handleReserve}
      />

      <DonationFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        donation={donation}
        onSuccess={() => {
          setIsEditModalOpen(false);
          if (onReservationSuccess) {
            onReservationSuccess();
          } else {
            window.location.reload();
          }
        }}
      />
    </>
  );
};

export default DonationCard;
