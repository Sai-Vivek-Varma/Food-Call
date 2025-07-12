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
  // Always format as IST (Asia/Kolkata)
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
      available: "bg-sage-100 text-sage-700",
      reserved: "bg-amber-100 text-amber-700",
      completed: "bg-blue-100 text-blue-700",
      expired: "bg-red-100 text-red-700",
    };

    const handleReserve = async (deliveryOption) => {
      try {
        const token = localStorage.getItem("foodcallToken");
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

    // Use useCallback for handlers
    const handleOpenDetailModal = useCallback(
      () => setIsDetailModalOpen(true),
      []
    );
    const handleCloseDetailModal = useCallback(
      () => setIsDetailModalOpen(false),
      []
    );

    // Get orphanage userId if needed
    let userId;
    if (isOrphanage) {
      const user = localStorage.getItem("foodcallUser");
      try {
        userId = user ? JSON.parse(user)._id : undefined;
      } catch {
        userId = undefined;
      }
    }

    return (
      <>
        <div
          className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md cursor-pointer card-hover"
          onClick={handleCardClick}
        >
          {donation.imageUrl && donation.imageUrl.trim() !== "" ? (
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
          ) : (
            <div className="relative h-48 rounded-t-xl overflow-hidden flex flex-col items-center justify-center bg-gray-100 border-b border-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-300 mb-2"
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
            {/* Remove duplicate status badge for cards with no image */}
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
              ) : null}
              {/* Allow orphanage to unreserve their own reserved donation */}
              {isOrphanage && donation.status === "reserved" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCancelConfirm(true);
                  }}
                  className="w-full py-2 px-4 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors text-center text-sm font-medium"
                >
                  Cancel Reservation
                </button>
              )}
              {/* Edit button for donor's own donations, not completed */}
              {!isOrphanage &&
                donation.donorId ===
                  (localStorage.getItem("foodcallUser")
                    ? JSON.parse(localStorage.getItem("foodcallUser"))._id
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
                  (localStorage.getItem("foodcallUser")
                    ? JSON.parse(localStorage.getItem("foodcallUser"))._id
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
                    className="w-full py-2 px-4 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors text-center text-sm font-medium"
                  >
                    Finish Donation
                  </button>
                )}
            </div>
          </div>
        </div>

        <DonationDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          donation={donation}
          userRole={isOrphanage ? "orphanage" : "donor"}
          userId={(() => {
            const user = localStorage.getItem("foodcallUser");
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
            } // removed reload, rely on parent to update
          }}
        />

        <Modal
          isOpen={showCancelConfirm}
          onClose={() => setShowCancelConfirm(false)}
          title="Cancel Reservation?"
        >
          <div className="space-y-4">
            <p>
              Are you sure you want to cancel this reservation? This donation
              will become available to others.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={() => setShowCancelConfirm(false)}
              >
                No, Keep Reserved
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
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
                Yes, Cancel Reservation
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

export default DonationCard;
