import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationFormFields from "./DonationFormFields";
import ImageUploadField from "./ImageUploadField";
import LocationPicker from "./LocationPicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createDonationThunk,
  updateDonationThunk,
  deleteDonationThunk,
} from "@/slices/donationsSlice";

const DonationFormModal = ({ isOpen, onClose, onSuccess, donation }) => {
  const isEdit = !!donation;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expiryDate: "",
    pickupAddress: "",
    pickupTimeStart: "",
    pickupTimeEnd: "",
    ...donation,
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.donations);

  useEffect(() => {
    if (donation) {
      setFormData({
        title: donation.title || "",
        description: donation.description || "",
        quantity: donation.quantity || "",
        expiryDate: donation.expiryDate
          ? donation.expiryDate.split("T")[0]
          : "",
        pickupAddress: donation.pickupAddress || "",
        pickupTimeStart: donation.pickupTimeStart
          ? donation.pickupTimeStart.slice(11, 16)
          : "",
        pickupTimeEnd: donation.pickupTimeEnd
          ? donation.pickupTimeEnd.slice(11, 16)
          : "",
        imageUrl: donation.imageUrl || "",
      });
      setImagePreview(donation.imageUrl || null);
    } else {
      setFormData({
        title: "",
        description: "",
        quantity: "",
        expiryDate: "",
        pickupAddress: "",
        pickupTimeStart: "",
        pickupTimeEnd: "",
        imageUrl: "",
      });
      setImagePreview(null);
    }
    window.scrollTo(0, 0);
    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0];
    const expiryInput = document.getElementById("expiryDate");
    if (expiryInput) {
      expiryInput.min = today;
    }
  }, [donation]);

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
    try {
      let imageUrl = formData.imageUrl;
      // NOTE: Image upload should be handled by a thunk if needed for full Reduxization
      if (imageFile) {
        // ...existing code for uploadDonationImage...
        // You may want to move this to a thunk for full Redux
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
      if (isEdit) {
        await dispatch(
          updateDonationThunk({
            id: donation._id || donation.id,
            updateData: submissionData,
          })
        );
        toast.success("Donation updated successfully!");
      } else {
        await dispatch(createDonationThunk(submissionData));
        toast.success("Donation created successfully!");
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.message ||
          (isEdit
            ? "Failed to update donation."
            : "Failed to create donation. Please try again.")
      );
    }
  };

  const handleDelete = async () => {
    if (!donation) return;
    try {
      await dispatch(deleteDonationThunk(donation._id || donation.id));
      toast.success("Donation deleted successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to delete donation.");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative border border-sage-200 animate-fade-in mx-2"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: "auto" }}
      >
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
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                removeImage={removeImage}
              />
              <div className="pt-6 border-t  border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary bg-sage-600 hover:bg-sage-700 py-2 text-base font-semibold"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      {isEdit ? "Saving..." : "Creating Donation..."}
                    </>
                  ) : isEdit ? (
                    "Save Changes"
                  ) : (
                    "Create Donation & Help Feed The Hungry"
                  )}
                </button>
                {isEdit && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={loading}
                      className="w-full mt-2 py-2 text-base font-semibold border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      {loading ? "Deleting..." : "Delete Donation"}
                    </button>
                    {showDeleteConfirm && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white rounded-lg shadow-xl p-6 max-w-xs w-full border border-red-200">
                          <div className="text-lg font-semibold mb-4 text-red-700">
                            Delete Donation?
                          </div>
                          <div className="mb-6 text-gray-700 text-sm">
                            Are you sure you want to delete this donation? This
                            action cannot be undone.
                          </div>
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
                              onClick={() => setShowDeleteConfirm(false)}
                              disabled={loading}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="px-3 py-1.5 rounded border border-red-600 text-white bg-red-600 hover:bg-red-700 text-sm"
                              onClick={handleDelete}
                              disabled={loading}
                            >
                              {loading ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DonationFormModal;
