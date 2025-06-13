
import { useState } from "react";
import { X, Upload, Calendar, Clock, MapPin, Package2, FileText } from "lucide-react";
import { toast } from "sonner";
import { createDonation } from "../lib/api";

const DonationFormModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expiryDate: "",
    pickupAddress: "",
    pickupTimeStart: "",
    pickupTimeEnd: "",
    imageUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("foodShareToken");
      if (!token) {
        toast.error("Please log in to create donations");
        return;
      }

      await createDonation(formData, token);
      toast.success("Donation created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        quantity: "",
        expiryDate: "",
        pickupAddress: "",
        pickupTimeStart: "",
        pickupTimeEnd: "",
        imageUrl: ""
      });
      
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating donation:", error);
      toast.error(error.message || "Failed to create donation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sage-100 bg-gradient-to-r from-sage-50 to-white">
          <div className="flex items-center">
            <Package2 className="w-6 h-6 text-sage-600 mr-3" />
            <h2 className="text-2xl font-bold text-sage-800">Create New Donation</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-sage-700 p-2 hover:bg-sage-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Donation Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Fresh vegetables from restaurant surplus"
                required
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed information about the food items, condition, and any special instructions..."
                rows={4}
                required
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Quantity and Expiry Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                  <Package2 className="w-4 h-4 mr-2" />
                  Quantity *
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 50 meals, 20kg rice"
                  required
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Expiry Date *
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Pickup Address */}
            <div>
              <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Pickup Address *
              </label>
              <textarea
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleInputChange}
                placeholder="Full address including street, city, state, and any specific pickup instructions..."
                rows={3}
                required
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Pickup Time Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Pickup Start Time *
                </label>
                <input
                  type="datetime-local"
                  name="pickupTimeStart"
                  value={formData.pickupTimeStart}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Pickup End Time *
                </label>
                <input
                  type="datetime-local"
                  name="pickupTimeEnd"
                  value={formData.pickupTimeEnd}
                  onChange={handleInputChange}
                  min={formData.pickupTimeStart || new Date().toISOString().slice(0, 16)}
                  required
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center text-sm font-semibold text-sage-800 mb-2">
                <Upload className="w-4 h-4 mr-2" />
                Image URL (Optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add a photo URL to help orphanages better understand your donation
              </p>
            </div>
          </form>
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-sage-100 p-6 bg-gradient-to-r from-sage-50 to-white">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-sage-200 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                "Create Donation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationFormModal;
