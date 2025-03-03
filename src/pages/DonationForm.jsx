
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Package, Upload, Calendar, Clock, MapPin, Info, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiryDate: '',
    pickupAddress: '',
    pickupTimeStart: '',
    pickupTimeEnd: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  
  // Add scroll-to-top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated (demo only)
    const user = localStorage.getItem('foodShareUser');
    if (!user) {
      toast.error('You must be logged in to create a donation');
      navigate('/auth');
    }
  }, [navigate]);
  
  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    
    if (!formData.pickupAddress) {
      newErrors.pickupAddress = 'Pickup address is required';
    }
    
    if (!formData.pickupTimeStart) {
      newErrors.pickupTimeStart = 'Pickup start time is required';
    }
    
    if (!formData.pickupTimeEnd) {
      newErrors.pickupTimeEnd = 'Pickup end time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // For demo purposes, just simulate API call
    setTimeout(() => {
      try {
        console.log('Donation data submitted:', formData);
        
        toast.success('Donation created successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to create donation:', error);
        toast.error('Failed to create donation');
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Create Donation
            </span>
            <h1 className="text-3xl font-bold mb-2">Share Your Surplus Food</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Provide details about the food you'd like to donate. Be as specific as possible 
              to help orphanages determine if they can use your donation.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-8 animate-fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="title" 
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Donation Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                  placeholder="e.g., Fresh Bread from Local Bakery"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="description" 
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                  placeholder="Describe the food - include details like ingredients, dietary information, etc."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="quantity" 
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                  placeholder="e.g., 20 loaves, 5kg of rice, etc."
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="expiryDate" 
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="image" 
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Image (Optional)
                  </label>
                  <div className="relative">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="image"
                      className="w-full cursor-pointer px-4 py-2 rounded-md border border-dashed border-input bg-secondary/30 flex items-center justify-center hover:bg-secondary transition-all"
                    >
                      {imagePreview ? (
                        <div className="w-full h-10 flex items-center justify-between">
                          <span className="truncate text-sm">Image selected</span>
                          <Upload className="w-5 h-5 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Upload className="w-5 h-5 mr-2 text-muted-foreground" />
                          <span>Upload Image</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              
              {imagePreview && (
                <div className="mt-2">
                  <div className="relative w-full h-48 rounded-md overflow-hidden border border-input">
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
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              <div>
                <label 
                  htmlFor="pickupAddress" 
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Pickup Address
                </label>
                <div className="relative">
                  <input
                    id="pickupAddress"
                    name="pickupAddress"
                    type="text"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pl-10 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                    placeholder="Enter the address for food pickup"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                {errors.pickupAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.pickupAddress}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="pickupTimeStart" 
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Pickup Time - Start
                  </label>
                  <div className="relative">
                    <input
                      id="pickupTimeStart"
                      name="pickupTimeStart"
                      type="time"
                      value={formData.pickupTimeStart}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                    />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.pickupTimeStart && (
                    <p className="mt-1 text-sm text-red-600">{errors.pickupTimeStart}</p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="pickupTimeEnd" 
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Pickup Time - End
                  </label>
                  <div className="relative">
                    <input
                      id="pickupTimeEnd"
                      name="pickupTimeEnd"
                      type="time"
                      value={formData.pickupTimeEnd}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                    />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.pickupTimeEnd && (
                    <p className="mt-1 text-sm text-red-600">{errors.pickupTimeEnd}</p>
                  )}
                </div>
              </div>
              
              <div className="bg-sage-50 p-4 rounded-md flex items-start space-x-3 mt-6">
                <Info className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  By submitting this form, you confirm that the food is safe for consumption and meets all 
                  local health guidelines. You'll be notified when an orphanage reserves your donation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Creating Donation...' : 'Create Donation'}
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
