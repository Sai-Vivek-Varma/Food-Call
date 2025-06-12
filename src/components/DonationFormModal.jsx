
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";

const DonationFormModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expiryDate: "",
    pickupAddress: "",
    pickupTimeStart: "",
    pickupTimeEnd: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.pickupAddress) newErrors.pickupAddress = "Pickup address is required";
    if (!formData.pickupTimeStart) newErrors.pickupTimeStart = "Pickup start time is required";
    if (!formData.pickupTimeEnd) newErrors.pickupTimeEnd = "Pickup end time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const combineTimeWithToday = (timeString) => {
    const today = new Date().toISOString().split("T")[0];
    return new Date(`${today}T${timeString}:00Z`).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const submissionData = {
        title: formData.title,
        description: formData.description,
        quantity: formData.quantity,
        expiryDate: new Date(formData.expiryDate).toISOString(),
        pickupAddress: formData.pickupAddress,
        pickupTimeStart: combineTimeWithToday(formData.pickupTimeStart),
        pickupTimeEnd: combineTimeWithToday(formData.pickupTimeEnd),
        imageUrl: imagePreview || "",
      };

      const token = localStorage.getItem("foodShareToken");
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      await axios.post("http://localhost:5000/api/donations", submissionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Donation created successfully!");
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        quantity: "",
        expiryDate: "",
        pickupAddress: "",
        pickupTimeStart: "",
        pickupTimeEnd: "",
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to create donation:", error.response?.data || error.message);
      toast.error("Failed to create donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Share Your Surplus Food</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Donation Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                placeholder="e.g., Fresh Bread from Local Bakery"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                placeholder="Describe the food in detail"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="text"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                placeholder="e.g., 20 loaves, 5kg of rice"
              />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                />
                {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
              </div>
              
              <div>
                <label htmlFor="pickupAddress" className="block text-sm font-medium mb-1">
                  Pickup Address
                </label>
                <input
                  id="pickupAddress"
                  name="pickupAddress"
                  type="text"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                  placeholder="Enter the address for pickup"
                />
                {errors.pickupAddress && <p className="mt-1 text-sm text-red-600">{errors.pickupAddress}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickupTimeStart" className="block text-sm font-medium mb-1">
                  Pickup Time - Start
                </label>
                <input
                  id="pickupTimeStart"
                  name="pickupTimeStart"
                  type="time"
                  value={formData.pickupTimeStart}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                />
                {errors.pickupTimeStart && <p className="mt-1 text-sm text-red-600">{errors.pickupTimeStart}</p>}
              </div>
              
              <div>
                <label htmlFor="pickupTimeEnd" className="block text-sm font-medium mb-1">
                  Pickup Time - End
                </label>
                <input
                  id="pickupTimeEnd"
                  name="pickupTimeEnd"
                  type="time"
                  value={formData.pickupTimeEnd}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                />
                {errors.pickupTimeEnd && <p className="mt-1 text-sm text-red-600">{errors.pickupTimeEnd}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image (Optional)
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full"
              />
              {imagePreview && (
                <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border border-input">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, image: undefined }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sage-500 text-white py-2 rounded-md hover:bg-sage-600 transition-all mt-6 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Donation...
                </>
              ) : (
                "Create Donation"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationFormModal;
