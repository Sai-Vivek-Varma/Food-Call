
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonationForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    category: 'produce',
    expiryDate: '',
    pickupAddress: '',
    pickupDate: '',
    pickupTimeStart: '',
    pickupTimeEnd: '',
    contactPhone: '',
    contactEmail: '',
    imageUrl: ''
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const userJson = localStorage.getItem('foodCallUser');
    if (!userJson) {
      toast.error('You must be logged in to create a donation.');
      navigate('/auth');
      return;
    }
    
    try {
      const userData = JSON.parse(userJson);
      if (userData.role !== 'donor') {
        toast.error('Only donors can create food donations.');
        navigate('/dashboard');
        return;
      }
      
      setUser(userData);
      
      // Pre-fill contact details if available
      setFormData(prev => ({
        ...prev,
        contactEmail: userData.email || ''
      }));
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/auth');
    }
  }, [navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.quantity || 
        !formData.expiryDate || !formData.pickupAddress || !formData.pickupDate || 
        !formData.pickupTimeStart || !formData.pickupTimeEnd) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call to create donation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to create the donation
      
      toast.success('Donation posted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating donation:', error);
      toast.error('Failed to create donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const foodCategories = [
    { value: 'produce', label: 'Fresh Produce' },
    { value: 'bakery', label: 'Bread & Bakery' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'meat', label: 'Meat & Poultry' },
    { value: 'prepared', label: 'Prepared Meals' },
    { value: 'dry', label: 'Dry Goods & Canned Items' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'other', label: 'Other' },
  ];
  
  // Set minimum date for expiry and pickup to today
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Donate Food</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your excess food with orphanages in need. Fill out the form below with details about your donation.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Donation Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="E.g. Fresh Vegetables from Local Market"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Food Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      required
                    >
                      {foodCategories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide details about the food items, condition, etc."
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                      Quantity*
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="E.g. 5kg, 10 loaves, 20 meals"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                      Expiry Date*
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="pickupAddress" className="block text-sm font-medium mb-1">
                    Pickup Address*
                  </label>
                  <input
                    type="text"
                    id="pickupAddress"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                    placeholder="Full address where the food can be picked up"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium mb-1">
                      Pickup Date*
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pickupTimeStart" className="block text-sm font-medium mb-1">
                      Pickup Time Start*
                    </label>
                    <input
                      type="time"
                      id="pickupTimeStart"
                      name="pickupTimeStart"
                      value={formData.pickupTimeStart}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pickupTimeEnd" className="block text-sm font-medium mb-1">
                      Pickup Time End*
                    </label>
                    <input
                      type="time"
                      id="pickupTimeEnd"
                      name="pickupTimeEnd"
                      value={formData.pickupTimeEnd}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="Phone number for pickup coordination"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="Email address for pickup coordination"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="URL to an image of the food (if available)"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Adding an image helps orphanages identify your donation.
                  </p>
                </div>
                
                <div className="border-t border-border pt-6">
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="px-6 py-2 border border-input rounded-md hover:bg-gray-50 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors disabled:opacity-70"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Post Donation'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationForm;
