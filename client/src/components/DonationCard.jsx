import React, { useState, useCallback } from "react";
import { Clock, MapPin, CalendarIcon, Package, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  reserveDonationThunk,
  unreserveDonationThunk,
  completeDonationThunk,
} from "@/slices/donationsSlice";
import DonationDetailModal from "./DonationDetailModal";
import DeliveryOptionsModal from "./DeliveryOptionsModal";
import DonationFormModal from "./DonationFormModal";
import { useDispatch } from "react-redux";
import Modal from "./Modal";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTimeIST = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};

const DonationCard = React.memo(
  ({ donation, isOrphanage = false, onReservationSuccess }) => {
    const dispatch = useDispatch();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    // Check if donation is expired
    const isExpired = new Date(donation.expiryDate) < new Date();

    // Don't render expired donations for orphanages
    if (isExpired && isOrphanage) {
      return null;
    }

    const statusClasses = {
      available: "status-available",
      reserved: "status-reserved", 
      completed: "status-completed",
      expired: "status-expired",
    };

    const handleReserve = async (deliveryOption) => {
      try {
        const token = localStorage.getItem("foodShareToken");
        if (!token) {
          toast.error("Please log in to reserve donations");
          return;
        }
        await dispatch(
          reserveDonationThunk({ id: donation._id || donation.id })
        ).unwrap();
        toast.success(
          "Donation reserved successfully! Donor has been notified."
        );
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

    const handleOpenDetailModal = useCallback(
      () => setIsDetailModalOpen(true),
      []
    );
    const handleCloseDetailModal = useCallback(
      () => setIsDetailModalOpen(false),
      []
    );

    // Get user info for ownership checks
    let userId;
    if (isOrphanage) {
      const user = localStorage.getItem("foodShareUser");
      try {
        userId = user ? JSON.parse(user)._id : undefined;
      } catch {
        userId = undefined;
      }
    }

    return (
      <>
        <div
          className="card-enhanced cursor-pointer group"
          onClick={handleCardClick}
        >
          {/* Image Section */}
          <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
            {donation.imageUrl && donation.imageUrl.trim() !== "" ? (
              <img
                src={donation.imageUrl}
                alt={donation.title}
                className="image-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-300 mb-2 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm16 10l-4-4a2 2 0 00-2.828 0l-4 4M8 13l-2 2m8-2l2 2"
                  />
                </svg>
                <span className="text-gray-400 text-xs select-none">
                  No photo uploaded
                </span>
              </div>
            )}
            
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span className={`${statusClasses[donation.status]} shadow-lg backdrop-blur-sm`}>
                {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-sage-600 transition-colors line-clamp-2">
              {donation.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 line-clamp-2 leading-relaxed">
              {donation.description}
            </p>

            {/* Details Grid */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="stat-icon w-8 h-8 bg-sage-50">
                  <Package className="w-4 h-4 text-sage-500" />
                </div>
                <span className="font-medium text-sm">{donation.quantity}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <div className="stat-icon w-8 h-8 bg-sage-50">
                  <CalendarIcon className="w-4 h-4 text-sage-500" />
                </div>
                <span className="font-medium text-sm">
                  Expires: {formatDate(donation.expiryDate)}
                </span>
              </div>
              
              <div className="flex items-start gap-3 text-gray-600">
                <div className="stat-icon w-8 h-8 bg-sage-50 flex-shrink-0">
                  <MapPin className="w-4 h-4 text-sage-500" />
                </div>
                <span className="font-medium text-sm line-clamp-2 leading-relaxed">
                  {donation.pickupAddress}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <div className="stat-icon w-8 h-8 bg-sage-50">
                  <Clock className="w-4 h-4 text-sage-500" />
                </div>
                <span className="font-medium text-sm">
                  {formatTimeIST(donation.pickupTimeStart)} - {formatTimeIST(donation.pickupTimeEnd)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-100">
              <div className="btn-group">
                {isOrphanage && donation.status === "available" ? (
                  <button
                    onClick={handleReserveClick}
                    className="btn-primary w-full py-3"
                  >
                    Reserve Donation
                  </button>
                ) : null}
                
                {/* Orphanage cancel reservation */}
                {isOrphanage && donation.status === "reserved" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCancelConfirm(true);
                    }}
                    className="w-full py-3 px-4 border-2 border-red-500 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-600 transition-all duration-300 font-semibold"
                  >
                    Cancel Reservation
                  </button>
                )}
                
                {/* Donor edit button */}
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
                      className="w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                  )}
                
                {/* Donor finish donation button */}
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
                          await dispatch(
                            completeDonationThunk({
                              id: donation._id || donation.id,
                            })
                          ).unwrap();
                          toast.success("Donation marked as completed!");
                          if (onReservationSuccess) {
                            onReservationSuccess();
                          }
                        } catch (error) {
                          toast.error("Failed to complete donation");
                        }
                      }}
                      className="btn-primary w-full py-3"
                    >
                      Finish Donation
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <DonationDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          donation={donation}
          userRole={isOrphanage ? "orphanage" : "donor"}
          userId={(() => {
            const user = localStorage.getItem("foodShareUser");
            try {
              return user ? JSON.parse(user)._id : undefined;
            } catch {
              return undefined;
            }
          })()}
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
            }
          }}
        />

        <Modal
          isOpen={showCancelConfirm}
          onClose={() => setShowCancelConfirm(false)}
          title="Cancel Reservation?"
        >
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              Are you sure you want to cancel this reservation? This donation
              will become available to others.
            </p>
            <div className="btn-group">
              <button
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors"
                onClick={() => setShowCancelConfirm(false)}
              >
                Keep Reserved
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
                onClick={async () => {
                  try {
                    await dispatch(
                      unreserveDonationThunk({
                        id: donation._id || donation.id,
                      })
                    ).unwrap();
                    toast.success(
                      "Reservation cancelled. Donation is now available to others."
                    );
                    setShowCancelConfirm(false);
                    if (onReservationSuccess) onReservationSuccess();
                  } catch (error) {
                    toast.error(
                      error?.message || "Failed to cancel reservation"
                    );
                  }
                }}
              >
                Cancel Reservation
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

export default DonationCard;