
import { useState } from "react";
import { X, Truck, User, Clock, MapPin } from "lucide-react";

const DeliveryOptionsModal = ({ isOpen, onClose, donation, onReserve }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isReserving, setIsReserving] = useState(false);

  if (!isOpen) return null;

  const deliveryOptions = [
    {
      id: "self_pickup",
      name: "Self Pickup",
      icon: User,
      description: "Collect the food directly from the donor",
      time: "Immediate",
      cost: "Free"
    },
    {
      id: "swiggy",
      name: "Swiggy Delivery",
      icon: Truck,
      description: "Professional food delivery service",
      time: "30-45 mins",
      cost: "₹50-100"
    },
    {
      id: "dunzo",
      name: "Dunzo Delivery",
      icon: Truck,
      description: "Quick hyperlocal delivery",
      time: "20-30 mins",
      cost: "₹40-80"
    },
    {
      id: "porter",
      name: "Porter Delivery",
      icon: Truck,
      description: "Reliable logistics partner",
      time: "25-40 mins",
      cost: "₹60-120"
    }
  ];

  const handleReserve = async () => {
    if (!selectedOption) return;
    
    setIsReserving(true);
    try {
      await onReserve(selectedOption);
      onClose();
    } catch (error) {
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
            <h2 className="text-xl font-semibold text-slate-900">Choose Delivery Option</h2>
            <p className="text-slate-600 text-sm mt-1">How would you like to receive this donation?</p>
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
            <h3 className="font-medium text-slate-900 mb-2">{donation.title}</h3>
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="w-4 h-4 mr-1" />
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
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedOption === option.id ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{option.name}</h4>
                        <p className="text-sm text-slate-600">{option.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-slate-600 mb-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{option.time}</span>
                      </div>
                      <div className="text-sm font-medium text-slate-900">{option.cost}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={handleReserve}
              disabled={!selectedOption || isReserving}
              className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isReserving ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Reserving...
                </div>
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
