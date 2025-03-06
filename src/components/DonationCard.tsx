import { Clock, MapPin, CalendarIcon, Package, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Donation } from "@/lib/types";

interface DonationCardProps {
  donation: Donation;
  isOrphanage?: boolean;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DonationCard: React.FC<DonationCardProps> = ({ donation, isOrphanage = false }) => {
  // Check if the donation is expired (if the expiry date is before now)
  const isExpired = new Date(donation.expiryDate) < new Date();

  // Define classes for different statuses
  const statusClasses: { [key: string]: string } = {
    available: "bg-green-100 text-green-700",
    reserved: "bg-blue-100 text-blue-700",
    completed: "bg-sage-100 text-sage-700",
    expired: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`bg-white rounded-xl border border-border shadow-sm transition-all hover:shadow-md ${
        isExpired && donation.status !== "completed" ? "opacity-70" : ""
      }`}
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

        <h3 className="text-lg font-semibold mb-2 truncate">{donation.title}</h3>

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

        <div className="mt-4 pt-4 border-t border-border">
          {isOrphanage && donation.status === "available" ? (
            <button className="w-full py-2 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-center text-sm font-medium">
              Reserve Donation
            </button>
          ) : (
            <Link
              to={`/donations/${donation._id || donation.id}`}
              className="block w-full py-2 px-4 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors text-center text-sm font-medium"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
