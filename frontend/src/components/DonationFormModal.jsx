import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createDonation, uploadDonationImage } from "@/lib/api";
import DonationFormFields from "./DonationFormFields";
import ImageUploadField from "./ImageUploadField";
import LocationPicker from "./LocationPicker";

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      toast.error("You must be logged in to create a donation");
      return;
    }
    try {
      const user = JSON.parse(userJson);
      if (user.role !== "donor") {
        toast.error("Only donors can create donations");
      }
    } catch (error) {
      toast.error("Error with user data");
    }
    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0];
    const expiryInput = document.getElementById("expiryDate");
    if (expiryInput) {
      expiryInput.min = today;
    }
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLocationSelect = (address) => {
    setFormData((prev) => ({ ...prev, pickupAddress: address }));
    if (errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
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
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.quantity.trim()) newErrors.quantity = "Quantity is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.pickupAddress.trim())
      newErrors.pickupAddress = "Pickup address is required";
    if (!formData.pickupTimeStart)
      newErrors.pickupTimeStart = "Pickup start time is required";
    if (!formData.pickupTimeEnd)
      newErrors.pickupTimeEnd = "Pickup end time is required";
    if (formData.pickupTimeStart && formData.pickupTimeEnd) {
      if (formData.pickupTimeStart >= formData.pickupTimeEnd) {
        newErrors.pickupTimeEnd = "End time must be after start time";
      }
    }
    if (formData.expiryDate) {
      const today = new Date().toISOString().split("T")[0];
      if (formData.expiryDate < today) {
        newErrors.expiryDate = "Expiry date cannot be in the past";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const istToUtcIso = (dateString, timeString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const [hour, minute] = timeString.split(":").map(Number);
    const utcDate = new Date(
      Date.UTC(year, month - 1, day, hour - 5, minute - 30)
    );
    return utcDate.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadDonationImage(imageFile);
      }
      const submissionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        quantity: formData.quantity.trim(),
        expiryDate: istToUtcIso(formData.expiryDate, "23:59"),
        pickupAddress: formData.pickupAddress.trim(),
        pickupTimeStart: istToUtcIso(
          formData.expiryDate,
          formData.pickupTimeStart
        ),
        pickupTimeEnd: istToUtcIso(formData.expiryDate, formData.pickupTimeEnd),
        imageUrl,
      };
      await createDonation(submissionData);
      toast.success("Donation created successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(
        error.message || "Failed to create donation. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg p-4 max-w-2xl w-full mx-auto overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <section className="pt-8 pb-4 px-0">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Share Your Surplus Food
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Help reduce food waste by donating your surplus food to
                orphanages and those in need. Every donation makes a difference
                in fighting hunger.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <DonationFormFields
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleLocationSelect={handleLocationSelect}
                LocationPicker={LocationPicker}
              />
              <ImageUploadField
                imageFile={imageFile}
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                onRemoveImage={removeImage}
              />
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
        </section>
      </div>
    </div>
  );
};

export default DonationFormModal;
