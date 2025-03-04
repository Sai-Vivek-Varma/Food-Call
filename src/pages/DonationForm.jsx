
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Calendar, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// In a real application, this would use form libraries like react-hook-form
// and proper validation with zod or yup

const DonationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiryDate: '',
    pickupAddress: '',
    pickupTimeStart: '',
    pickupTimeEnd: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.quantity || 
        !formData.expiryDate || !formData.pickupAddress || 
        !formData.pickupTimeStart || !formData.pickupTimeEnd) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would be an API call to create the donation
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Donation created successfully!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Failed to create donation. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-xl border border-border shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6">Create Donation</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="E.g., Restaurant Daily Surplus, Catering Leftovers"
                  required
                />
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="Describe the type of food, condition, etc."
                  required
                />
              </div>
              
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity*
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="E.g., 20 meal portions, 5kg of rice"
                  required
                />
              </div>
              
              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 pl-10"
                    required
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
              
              {/* Pickup Address */}
              <div>
                <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Address*
                </label>
                <input
                  type="text"
                  id="pickupAddress"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="Full address where the food can be picked up"
                  required
                />
              </div>
              
              {/* Pickup Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupTimeStart" className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Time (Start)*
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="pickupTimeStart"
                      name="pickupTimeStart"
                      value={formData.pickupTimeStart}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 pl-10"
                      required
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="pickupTimeEnd" className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Time (End)*
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="pickupTimeEnd"
                      name="pickupTimeEnd"
                      value={formData.pickupTimeEnd}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 pl-10"
                      required
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image (Optional)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                </div>
                {previewUrl && (
                  <div className="mt-3">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="h-32 w-auto object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-sage-500 text-white font-medium rounded-md hover:bg-sage-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Donation...' : 'Create Donation'}
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

/* Note: In a real application, this would need to be connected to a backend API to handle:
1. Form validation
2. Image upload
3. Database storage
4. Authentication validation to ensure only logged-in donors can create donations
*/
