
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonationsList = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();

  // Sample donations data
  const sampleDonations = [
    {
      id: 1,
      title: "Fresh Vegetables & Fruits",
      description: "Surplus organic vegetables and fruits from our restaurant",
      quantity: "50 servings",
      location: "Downtown Restaurant, Main Street",
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      type: "Perishable",
      donorName: "Green Garden Restaurant",
      status: "Available",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400"
    },
    {
      id: 2,
      title: "Cooked Meals - Rice & Curry",
      description: "Freshly cooked meals with rice, curry, and vegetables",
      quantity: "30 servings",
      location: "Community Center, Oak Avenue",
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      type: "Cooked Food",
      donorName: "Community Kitchen",
      status: "Available",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400"
    },
    {
      id: 3,
      title: "Bread & Bakery Items",
      description: "Fresh bread, pastries, and baked goods from our bakery",
      quantity: "100 items",
      location: "City Bakery, First Street",
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      type: "Bakery",
      donorName: "City Bakery",
      status: "Available",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
    }
  ];

  useEffect(() => {
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      navigate("/auth");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
      
      // Only orphanages should access this page
      if (parsedUser.role !== 'orphanage') {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/auth");
    }
  }, [navigate]);

  const filteredDonations = sampleDonations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || donation.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-4">
              Browse Available Donations
            </h1>
            <p className="text-xl text-gray-600">
              Find food donations perfect for your community's needs
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg border border-sage-100 p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                >
                  <option value="all">All Types</option>
                  <option value="Perishable">Perishable</option>
                  <option value="Cooked Food">Cooked Food</option>
                  <option value="Bakery">Bakery Items</option>
                  <option value="Canned Goods">Canned Goods</option>
                </select>
              </div>
            </div>
          </div>

          {/* Donations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDonations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-2xl shadow-lg border border-sage-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <img 
                  src={donation.image} 
                  alt={donation.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium">
                      {donation.type}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {donation.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-sage-800 mb-2">{donation.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{donation.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Package className="w-4 h-4 mr-2" />
                      <span className="text-sm">{donation.quantity}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{donation.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">Best before: {donation.expiryDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-sage-600 text-white py-3 rounded-xl hover:bg-sage-700 transition-colors font-semibold">
                      Reserve Now
                    </button>
                    <button className="px-4 py-3 border-2 border-sage-600 text-sage-700 rounded-xl hover:bg-sage-50 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDonations.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No donations found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationsList;
