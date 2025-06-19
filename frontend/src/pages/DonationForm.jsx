
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Upload, X, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationPicker from "@/components/LocationPicker";
import { createDonation } from "@/lib/api";

const DonationForm = () => {
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      toast.error("You must be logged in to create a donation");
      navigate("/auth");
      return;
    }

    try {
      const user = JSON.parse(userJson);
      if (user.role !== "donor") {
        toast.error("Only donors can create donations");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/auth");
    }

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const expiryInput = document.getElementById("expiryDate");
    if (expiryInput) {
      expiryInput.min = today;
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLocationSelect = (address) => {
    setFormData(prev => ({ ...prev, pickupAddress: address }));
    if (errors.pickupAddress) {
      setErrors(prev => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size must be less than 5MB");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    const imageInput = document.getElementById("image");
    if (imageInput) imageInput.value = "";
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.quantity.trim()) newErrors.quantity = "Quantity is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = "Pickup address is required";
    if (!formData.pickupTimeStart) newErrors.pickupTimeStart = "Pickup start time is required";
    if (!formData.pickupTimeEnd) newErrors.pickupTimeEnd = "Pickup end time is required";
    
    // Validate that end time is after start time
    if (formData.pickupTimeStart && formData.pickupTimeEnd) {
      if (formData.pickupTimeStart >= formData.pickupTimeEnd) {
        newErrors.pickupTimeEnd = "End time must be after start time";
      }
    }
    
    // Validate that expiry date is not in the past
    if (formData.expiryDate) {
      const today = new Date().toISOString().split('T')[0];
      if (formData.expiryDate < today) {
        newErrors.expiryDate = "Expiry date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const combineDateTime = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}:00Z`).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Use today's date for pickup times, expiry date for expiry
      const today = new Date().toISOString().split('T')[0];
      
      const submissionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        quantity: formData.quantity.trim(),
        expiryDate: new Date(formData.expiryDate + 'T23:59:59Z').toISOString(),
        pickupAddress: formData.pickupAddress.trim(),
        pickupTimeStart: combineDateTime(today, formData.pickupTimeStart),
        pickupTimeEnd: combineDateTime(today, formData.pickupTimeEnd),
        imageUrl: imagePreview || "",
      };

      console.log("Submitting donation data:", submissionData);

      await createDonation(submissionData);
      toast.success("Donation created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create donation:", error);
      toast.error(error.message || "Failed to create donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current time + 1 hour as default start time
  const getDefaultStartTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toTimeString().slice(0, 5);
  };

  // Get current time + 4 hours as default end time
  const getDefaultEndTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 4);
    return now.toTimeString().slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Surplus Food</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Help reduce food waste by donating your surplus food to orphanages and those in need. 
                Every donation makes a difference in fighting hunger.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Donation Title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Fresh Bread from Local Bakery, Cooked Rice for 50 people"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Describe the food in detail, including ingredients, preparation method, and any special notes"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., 20 loaves, 5kg rice, serves 30 people"
                  />
                  {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                </div>

                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Expiry Date *
                  </label>
                  <input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                  {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Address *
                  </label>
                  <LocationPicker
                    onLocationSelect={handleLocationSelect}
                    currentAddress={formData.pickupAddress}
                    setCurrentAddress={(address) => setFormData(prev => ({ ...prev, pickupAddress: address }))}
                  />
                  {errors.pickupAddress && <p className="mt-1 text-sm text-red-600">{errors.pickupAddress}</p>}
                </div>

                <div>
                  <label htmlFor="pickupTimeStart" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Pickup Start Time *
                  </label>
                  <input
                    id="pickupTimeStart"
                    name="pickupTimeStart"
                    type="time"
                    value={formData.pickupTimeStart || getDefaultStartTime()}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.pickupTimeStart && <p className="mt-1 text-sm text-red-600">{errors.pickupTimeStart}</p>}
                </div>

                <div>
                  <label htmlFor="pickupTimeEnd" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Pickup End Time *
                  </label>
                  <input
                    id="pickupTimeEnd"
                    name="pickupTimeEnd"
                    type="time"
                    value={formData.pickupTimeEnd || getDefaultEndTime()}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.pickupTimeEnd && <p className="mt-1 text-sm text-red-600">{errors.pickupTimeEnd}</p>}
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                    Food Image (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-400 transition-colors">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="mx-auto h-40 w-auto rounded-lg shadow-md" />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                              <span>Upload a photo</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Creating Donation...
                    </>
                  ) : (
                    "Create Donation & Help Feed The Hungry"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DonationForm;
