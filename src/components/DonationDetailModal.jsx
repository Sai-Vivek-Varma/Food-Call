
import { X, Clock, MapPin, CalendarIcon, Package, User } from "lucide-react";

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
  if (!isOpen || !donation) return null;

  const statusClasses = {
    available: "bg-green-100 text-green-700",
    reserved: "bg-blue-100 text-blue-700",
    completed: "bg-sage-100 text-sage-700",
    expired: "bg-red-100 text-red-700",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Donation Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1"
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
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Status Badge */}
          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[donation.status]}`}
            >
              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
            </span>
          </div>

          {/* Title and Description */}
          <h3 className="text-2xl font-bold mb-4">{donation.title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{donation.description}</p>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-sage-500" />
                <div>
                  <div className="text-sm text-gray-500">Quantity</div>
                  <div className="font-medium">{donation.quantity}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-sage-500" />
                <div>
                  <div className="text-sm text-gray-500">Expiry Date</div>
                  <div className="font-medium">{formatDate(donation.expiryDate)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-sage-500" />
                <div>
                  <div className="text-sm text-gray-500">Pickup Time</div>
                  <div className="font-medium">
                    {formatTime(donation.pickupTimeStart)} - {formatTime(donation.pickupTimeEnd)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sage-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Pickup Address</div>
                  <div className="font-medium">{donation.pickupAddress}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-sage-500" />
                <div>
                  <div className="text-sm text-gray-500">
                    {userRole === 'donor' ? 'Reserved By' : 'Donor'}
                  </div>
                  <div className="font-medium">
                    {userRole === 'donor' 
                      ? (donation.reservedByName || 'Not reserved yet')
                      : donation.donorName
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-border">
            {userRole === 'orphanage' && donation.status === 'available' ? (
              <button className="w-full py-3 px-4 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors font-medium">
                Reserve This Donation
              </button>
            ) : (
              <div className="text-center text-gray-500 py-3">
                {donation.status === 'reserved' && 'This donation has been reserved'}
                {donation.status === 'completed' && 'This donation has been completed'}
                {donation.status === 'expired' && 'This donation has expired'}
                {userRole === 'donor' && 'You are the donor of this item'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailModal;
