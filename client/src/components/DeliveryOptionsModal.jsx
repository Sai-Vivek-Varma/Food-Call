import { useState, memo } from "react";
import { X, Truck, User, Clock, MapPin as MapPinIcon } from "lucide-react";
import apiClient from "../lib/apiClient";

const MemoMapPin = memo((props) => <MapPinIcon {...props} />);

const DeliveryOptionsModal = ({ isOpen, onClose, donation, onReserve }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [ondcStatus, setOndcStatus] = useState(null);

  if (!isOpen) return null;

  const deliveryOptions = [
    {
      id: "self_pickup",
      name: "Self Pickup",
      icon: User,
      description: "Collect the food directly from the donor",
      time: "Immediate",
      cost: "Free",
    },
    {
      id: "ondc",
      name: "ONDC Delivery",
      icon: Truck,
      description: "Book delivery via ONDC open network",
      time: "30-60 mins",
      cost: "Calculated at booking",
    },
  ];

  const handleReserve = async () => {
    if (!selectedOption) return;

    setIsReserving(true);
    try {
      if (selectedOption === "ondc") {
        // Call backend ONDC booking endpoint
        const res = await apiClient.post("/api/ondc/book", {
          donationId: donation._id || donation.id,
          pickupAddress: donation.pickupAddress,
          // Add more fields as needed (drop address, user info, etc.)
        });
        setOndcStatus(res.data.status || "Delivery booked via ONDC");
      } else {
        await onReserve(selectedOption);
        onClose();
      }
    } catch (error) {
      setOndcStatus("ONDC delivery booking failed");
      console.error("Reservation failed:", error);
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Choose Delivery Option
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              How would you like to receive this donation?
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-medium text-slate-900 mb-2">
              {donation.title}
            </h3>
            <div className="flex items-center text-sm text-slate-600">
              <MemoMapPin className="w-7 h-7 mr-2" />
              <span>{donation.pickupAddress}</span>
            </div>
          </div>

          <div className="space-y-3">
            {deliveryOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedOption === option.id
                      ? "border-sage-500 bg-sage-50"
                      : "border-slate-200 hover:border-sage-300 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedOption === option.id
                            ? "bg-sage-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {option.name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-slate-600 mb-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{option.time}</span>
                      </div>
                      <div className="text-sm font-medium text-slate-900">
                        {option.cost}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            {ondcStatus && (
              <div className="mb-4 text-center text-sage-700 font-medium">
                {ondcStatus}
              </div>
            )}
            <button
              onClick={handleReserve}
              disabled={!selectedOption || isReserving}
              className="w-full py-3 px-4 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isReserving ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Reserving...
                </div>
              ) : selectedOption === "ondc" ? (
                "Book ONDC Delivery"
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptionsModal;
