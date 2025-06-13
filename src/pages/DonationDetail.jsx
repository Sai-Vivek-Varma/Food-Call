
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Package, User, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Sample donation data - in real app this would come from API
  const donation = {
    id: 1,
    title: "Fresh Vegetables & Fruits",
    description: "We have a surplus of organic vegetables and fruits from today's delivery. All items are fresh and in excellent condition. Perfect for preparing nutritious meals for communities in need.",
    quantity: "50 servings",
    location: "Downtown Restaurant, 123 Main Street",
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    type: "Perishable",
    donorName: "Green Garden Restaurant",
    donorContact: "contact@greengardenrestaurant.com",
    status: "Available",
    createdAt: new Date().toLocaleDateString(),
    pickupTime: "Available from 2:00 PM to 8:00 PM",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    additionalNotes: "Please bring your own containers for transportation. We can provide basic packaging if needed."
  };

  useEffect(() => {
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      navigate("/auth");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/auth");
    }
  }, [navigate]);

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
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sage-600 hover:text-sage-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to donations
          </button>

          <div className="bg-white rounded-3xl shadow-lg border border-sage-100 overflow-hidden">
            {/* Image */}
            <img 
              src={donation.image} 
              alt={donation.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            
            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium">
                      {donation.type}
                    </span>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {donation.status}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-sage-800 mb-2">
                    {donation.title}
                  </h1>
                  <p className="text-gray-600 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Donated by {donation.donorName}
                  </p>
                </div>
                
                {user.role === 'orphanage' && (
                  <button className="bg-sage-600 text-white px-8 py-4 rounded-xl hover:bg-sage-700 transition-colors font-semibold text-lg whitespace-nowrap">
                    Reserve This Donation
                  </button>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-sage-800 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {donation.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-sage-800">Donation Details</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Package className="w-5 h-5 text-sage-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-sage-800">Quantity</p>
                        <p className="text-gray-600">{donation.quantity}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-sage-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-sage-800">Best Before</p>
                        <p className="text-gray-600">{donation.expiryDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-sage-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-sage-800">Pickup Time</p>
                        <p className="text-gray-600">{donation.pickupTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-sage-800">Location & Contact</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-sage-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-sage-800">Pickup Location</p>
                        <p className="text-gray-600">{donation.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <User className="w-5 h-5 text-sage-600 mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-sage-800">Contact</p>
                        <p className="text-gray-600">{donation.donorContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {donation.additionalNotes && (
                <div className="bg-sage-50 p-6 rounded-xl border border-sage-200">
                  <h3 className="font-bold text-sage-800 mb-2">Additional Notes</h3>
                  <p className="text-gray-700">{donation.additionalNotes}</p>
                </div>
              )}

              {/* Action Buttons */}
              {user.role === 'orphanage' && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-sage-200">
                  <button className="flex-1 bg-sage-600 text-white py-4 rounded-xl hover:bg-sage-700 transition-colors font-semibold text-lg">
                    Reserve This Donation
                  </button>
                  <button className="flex-1 border-2 border-sage-600 text-sage-700 py-4 rounded-xl hover:bg-sage-50 transition-colors font-semibold text-lg">
                    Contact Donor
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationDetail;
