
import { X, Calendar, Clock, MapPin, Package, User, CheckCircle } from "lucide-react";

const DonationDetailModal = ({ isOpen, onClose, donation, user, onReserve, isReserving }) => {
  if (!isOpen || !donation) return null;

  const canReserve = user && user.role === "orphanage" && donation.status === "available";
  const isOwner = user && user.role === "donor" && donation.donorId === user.id;

  const handleReserve = () => {
    if (onReserve) {
      onReserve(donation._id || donation.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sage-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-2xl font-bold text-sage-800">Donation Details</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-sage-700 p-2 hover:bg-sage-50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Donation Image */}
          {donation.imageUrl && (
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
              <img
                src={donation.imageUrl}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              donation.status === "available" 
                ? "bg-green-100 text-green-800"
                : donation.status === "reserved"
                ? "bg-orange-100 text-orange-800"
                : donation.status === "completed"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}>
              {donation.status === "available" && <CheckCircle className="w-4 h-4 mr-2" />}
              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
            </span>
            
            {isOwner && (
              <span className="text-sm text-muted-foreground bg-sage-50 px-3 py-1 rounded-full">
                Your Donation
              </span>
            )}
          </div>

          {/* Title and Description */}
          <h3 className="text-2xl font-bold mb-4 text-sage-800">{donation.title}</h3>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2 text-sage-700">Description</h4>
            <p className="text-muted-foreground leading-relaxed">{donation.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-sage-50 rounded-lg">
                <Package className="w-5 h-5 text-sage-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sage-800">Quantity</p>
                  <p className="text-muted-foreground">{donation.quantity}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-sage-50 rounded-lg">
                <Calendar className="w-5 h-5 text-sage-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sage-800">Expiry Date</p>
                  <p className="text-muted-foreground">
                    {new Date(donation.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-sage-50 rounded-lg">
                <User className="w-5 h-5 text-sage-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sage-800">Donor</p>
                  <p className="text-muted-foreground">{donation.donorName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-sage-50 rounded-lg">
                <MapPin className="w-5 h-5 text-sage-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sage-800">Pickup Address</p>
                  <p className="text-muted-foreground">{donation.pickupAddress}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-sage-50 rounded-lg">
                <Clock className="w-5 h-5 text-sage-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sage-800">Pickup Time</p>
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
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <User className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-800">Reserved By</p>
                    <p className="text-orange-700">{donation.reservedByName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {canReserve && (
            <div className="border-t border-sage-100 pt-6">
              <button
                onClick={handleReserve}
                disabled={isReserving}
                className="w-full bg-sage-600 text-white px-6 py-4 rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold text-lg"
              >
                {isReserving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Reserving...
                  </>
                ) : (
                  "Reserve This Donation"
                )}
              </button>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                By reserving, you confirm your organization will pick up this donation within the specified time frame.
              </p>
            </div>
          )}

          {donation.status === "reserved" && !isOwner && user?.role === "orphanage" && (
            <div className="border-t border-sage-100 pt-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 font-semibold">This donation is already reserved</p>
                <p className="text-orange-700 text-sm mt-1">
                  This donation has been reserved by another organization.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDetailModal;
