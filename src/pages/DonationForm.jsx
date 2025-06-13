
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, MapPin, Clock, Package } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonationForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    location: '',
    expiryDate: '',
    type: 'Perishable',
    pickupTime: '',
    additionalNotes: '',
    image: ''
  });

  useEffect(() => {
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      navigate("/auth");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
      
      // Only donors should access this page
      if (parsedUser.role !== 'donor') {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/auth");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the data to your API
      console.log('Donation data:', formData);
      
      toast.success('Donation posted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating donation:', error);
      toast.error('Failed to post donation. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-xl text-sage-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-sage-600 hover:text-sage-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to dashboard
          </button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-4">
              Create New Donation
            </h1>
            <p className="text-xl text-gray-600">
              Share your surplus food with communities in need
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg border border-sage-100 p-8">
            <div className="space-y-8">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-lg font-semibold text-sage-800 mb-2">
                  Donation Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Fresh Vegetables & Fruits"
                  className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-sage-800 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your donation, its condition, and any special notes..."
                  className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg resize-none"
                />
              </div>

              {/* Quantity and Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quantity" className="block text-lg font-semibold text-sage-800 mb-2">
                    <Package className="inline w-5 h-5 mr-2" />
                    Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 50 servings, 20 kg"
                    className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-lg font-semibold text-sage-800 mb-2">
                    Food Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg appearance-none bg-white"
                  >
                    <option value="Perishable">Perishable</option>
                    <option value="Cooked Food">Cooked Food</option>
                    <option value="Bakery">Bakery Items</option>
                    <option value="Canned Goods">Canned Goods</option>
                    <option value="Dairy">Dairy Products</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-lg font-semibold text-sage-800 mb-2">
                  <MapPin className="inline w-5 h-5 mr-2" />
                  Pickup Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Full address or landmark for pickup"
                  className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg"
                />
              </div>

              {/* Expiry Date and Pickup Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expiryDate" className="block text-lg font-semibold text-sage-800 mb-2">
                    <Clock className="inline w-5 h-5 mr-2" />
                    Best Before Date *
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label htmlFor="pickupTime" className="block text-lg font-semibold text-sage-800 mb-2">
                    Pickup Time *
                  </label>
                  <input
                    type="text"
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Available 2:00 PM - 8:00 PM"
                    className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-lg font-semibold text-sage-800 mb-2">
                  <Upload className="inline w-5 h-5 mr-2" />
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="additionalNotes" className="block text-lg font-semibold text-sage-800 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any additional information, special instructions, or requirements..."
                  className="w-full p-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent text-lg resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-sage-600 text-white py-4 rounded-xl hover:bg-sage-700 transition-colors font-semibold text-lg"
                >
                  Post Donation
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 border-2 border-sage-600 text-sage-700 py-4 rounded-xl hover:bg-sage-50 transition-colors font-semibold text-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationForm;
