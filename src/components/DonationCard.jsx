
import { Clock, MapPin, CalendarIcon, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { reserveDonation } from "../lib/api";

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

const DonationCard = ({ donation, isOrphanage = false, onReservationSuccess, onViewDetails }) => {
  const [isReserving, setIsReserving] = useState(false);

  const statusClasses = {
    available: "bg-green-100 text-green-700",
    reserved: "bg-blue-100 text-blue-700",
    completed: "bg-sage-100 text-sage-700",
    expired: "bg-red-100 text-red-700",
  };

  const handleReserve = async () => {
    if (!isOrphanage || donation.status !== "available") return;

    setIsReserving(true);
    try {
      const token = localStorage.getItem("foodShareToken");
      if (!token) {
        toast.error("Please log in to reserve donations");
        return;
      }

      console.log("Attempting to reserve donation:", donation._id || donation.id);
      console.log("Token:", token ? "Present" : "Missing");
      
      await reserveDonation(donation._id || donation.id, token);
      toast.success("Donation reserved successfully!");
      
      if (onReservationSuccess) {
        onReservationSuccess();
      }
    } catch (error) {
      console.error("Error reserving donation:", error);
      toast.error(error.message || "Failed to reserve donation. Please try again.");
    } finally {
      setIsReserving(false);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(donation);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-sage-200 shadow-sm transition-all hover:shadow-lg hover:border-sage-300">
      {donation.imageUrl && (
        <div className="relative h-48 rounded-t-xl overflow-hidden">
          <img
            src={donation.imageUrl}
            alt={donation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[donation.status]}`}
            >
              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
            </span>
          </div>
        </div>
      )}

      <div className="p-5">
        {!donation.imageUrl && (
          <div className="mb-4 flex justify-between items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[donation.status]}`}
            >
              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
            </span>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2 truncate text-sage-800">{donation.title}</h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {donation.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Package className="w-4 h-4 mr-2 text-sage-500" />
            <span>{donation.quantity}</span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarIcon className="w-4 h-4 mr-2 text-sage-500" />
            <span>Expires: {formatDate(donation.expiryDate)}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-sage-500" />
            <span className="truncate">{donation.pickupAddress}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-sage-500" />
            <span>
              Pickup: {formatTime(donation.pickupTimeStart)} -{" "}
              {formatTime(donation.pickupTimeEnd)}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-sage-100 space-y-2">
          {isOrphanage && donation.status === "available" ? (
            <>
              <button 
                onClick={handleReserve}
                disabled={isReserving}
                className="w-full py-3 px-4 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors text-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isReserving ? "Reserving..." : "Reserve Donation"}
              </button>
              <button
                onClick={handleViewDetails}
                className="w-full py-2 px-4 bg-sage-50 text-sage-700 rounded-lg hover:bg-sage-100 transition-colors text-center text-sm font-medium"
              >
                View Details
              </button>
            </>
          ) : (
            <button
              onClick={handleViewDetails}
              className="w-full py-3 px-4 bg-sage-50 text-sage-700 rounded-lg hover:bg-sage-100 transition-colors text-center text-sm font-medium"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
