import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { createDonationThunk } from "../slices/donationsSlice";

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
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.donations);

  // Scroll to top on mount and verify that a user is logged in.
  useEffect(() => {
    window.scrollTo(0, 0);
    const userJson = localStorage.getItem("foodcalluser");
    if (!userJson) {
      toast.error("You must be logged in to create a donation");
      navigate("/auth");
    }
  }, [navigate]);

  // Handle input changes for text and textarea fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle image file selection and create a preview URL
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Basic client-side validation
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.pickupAddress)
      newErrors.pickupAddress = "Pickup address is required";
    if (!formData.pickupTimeStart)
      newErrors.pickupTimeStart = "Pickup start time is required";
    if (!formData.pickupTimeEnd)
      newErrors.pickupTimeEnd = "Pickup end time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Combine a time string (HH:MM) with today's date to create a full ISO datetime string.
  const combineTimeWithToday = (timeString) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    // Construct full datetime (assumes timeString is in HH:MM format)
    return new Date(`${today}T${timeString}:00Z`).toISOString();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
      await dispatch(createDonationThunk(submissionData));
      toast.success("Donation created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create donation. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Share Your Surplus Food</h1>
          <p className="text-muted-foreground mb-8">
            Provide details about the food you'd like to donate.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 p-2">
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
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                placeholder="Describe the food in detail"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-1"
              >
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
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium mb-1"
                >
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
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="pickupAddress"
                  className="block text-sm font-medium mb-1"
                >
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
                {errors.pickupAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pickupAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="pickupTimeStart"
                  className="block text-sm font-medium mb-1"
                >
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
                {errors.pickupTimeStart && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pickupTimeStart}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="pickupTimeEnd"
                  className="block text-sm font-medium mb-1"
                >
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
                {errors.pickupTimeEnd && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pickupTimeEnd}
                  </p>
                )}
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
                <div className="mt-2 relative w-full h-48 rounded-md overflow-hidden border border-input">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, image: undefined }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-500 text-white py-2 rounded-md hover:bg-sage-600 transition-all mt-6 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Creating Donation...
                </>
              ) : (
                "Create Donation"
              )}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DonationForm;
