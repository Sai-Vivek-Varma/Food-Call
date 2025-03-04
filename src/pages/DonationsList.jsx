
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Filter, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';

// Mock user data (in a real app, this would come from authentication)
const mockUser = {
  id: '456',
  name: 'Hope Children\'s Home',
  role: 'orphanage',
  email: 'contact@hopechildrenshome.org',
  createdAt: new Date('2023-01-15'),
};

// Mock donations data (in a real app, this would come from an API)
const mockDonations = [
  {
    id: '1',
    title: 'Leftover Wedding Catering',
    description: 'Food from a wedding ceremony. Includes rice, curry, and desserts.',
    quantity: '25 meal portions',
    expiryDate: new Date(Date.now() + 86400000), // tomorrow
    pickupAddress: '123 Main St, Anytown',
    pickupTimeStart: new Date(Date.now() + 3600000), // in 1 hour
    pickupTimeEnd: new Date(Date.now() + 7200000), // in 2 hours
    donorId: '123',
    donorName: 'John Doe',
    status: 'available',
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Restaurant Daily Surplus',
    description: 'End of day meals from our restaurant. Fresh and ready to serve.',
    quantity: '10 meal portions',
    expiryDate: new Date(Date.now() + 43200000), // 12 hours from now
    pickupAddress: '456 Oak Ave, Anytown',
    pickupTimeStart: new Date(Date.now() + 1800000), // in 30 minutes
    pickupTimeEnd: new Date(Date.now() + 5400000), // in 1.5 hours
    donorId: '123',
    donorName: 'John Doe',
    status: 'reserved',
    reservedBy: '456',
    reservedByName: 'Hope Children\'s Home',
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Bakery Unsold Goods',
    description: 'Various breads and pastries from today\'s baking.',
    quantity: '30 items',
    expiryDate: new Date(Date.now() + 172800000), // 2 days from now
    pickupAddress: '789 Pine St, Anytown',
    pickupTimeStart: new Date(Date.now() + 10800000), // in 3 hours
    pickupTimeEnd: new Date(Date.now() + 14400000), // in 4 hours
    donorId: '789',
    donorName: 'Sunshine Bakery',
    status: 'available',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Hotel Breakfast Buffet',
    description: 'Breakfast items from our hotel buffet. Includes pastries, fruits, and more.',
    quantity: '15 meal portions',
    expiryDate: new Date(Date.now() + 43200000), // 12 hours from now
    pickupAddress: '101 Hotel Blvd, Anytown',
    pickupTimeStart: new Date(Date.now() + 7200000), // in 2 hours
    pickupTimeEnd: new Date(Date.now() + 10800000), // in 3 hours
    donorId: '234',
    donorName: 'Grand Hotel',
    status: 'available',
    createdAt: new Date(Date.now() - 10800000), // 3 hours ago
    imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Grocery Store Produce',
    description: 'Fresh produce that needs to be used soon. Good condition.',
    quantity: '5kg mixed vegetables',
    expiryDate: new Date(Date.now() + 259200000), // 3 days from now
    pickupAddress: '567 Market St, Anytown',
    pickupTimeStart: new Date(Date.now() + 14400000), // in 4 hours
    pickupTimeEnd: new Date(Date.now() + 18000000), // in 5 hours
    donorId: '345',
    donorName: 'Fresh Market',
    status: 'available',
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'School Cafeteria Surplus',
    description: 'Unused lunch items from the school cafeteria.',
    quantity: '20 meal portions',
    expiryDate: new Date(Date.now() + 43200000), // 12 hours from now
    pickupAddress: '333 Education Dr, Anytown',
    pickupTimeStart: new Date(Date.now() + 10800000), // in 3 hours
    pickupTimeEnd: new Date(Date.now() + 14400000), // in 4 hours
    donorId: '456',
    donorName: 'Central School District',
    status: 'available',
    createdAt: new Date(Date.now() - 21600000), // 6 hours ago
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2067&auto=format&fit=crop'
  }
];

const DonationsList = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'expiringSoon', 'nearby'
  const navigate = useNavigate();
  
  // Simulate fetching user data and donations
  useEffect(() => {
    // In a real app, this would be an API call with proper authentication
    setTimeout(() => {
      setUser(mockUser);
      
      // Filter donations based on user role - for demo purposes only showing available
      const availableDonations = mockDonations.filter(donation => 
        donation.status === 'available' || 
        (donation.status === 'reserved' && donation.reservedBy === mockUser.id)
      );
      
      setDonations(availableDonations);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter and search donations
  const filteredDonations = donations.filter(donation => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Apply category filter
    if (selectedFilter === 'all') return true;
    
    if (selectedFilter === 'expiringSoon') {
      // Consider "expiring soon" as within 24 hours
      const expiresWithin24Hours = donation.expiryDate.getTime() - Date.now() < 86400000;
      return expiresWithin24Hours;
    }
    
    if (selectedFilter === 'nearby') {
      // In a real app, this would use geolocation
      // For demo purposes, just return some arbitrary results
      return ['123 Main St, Anytown', '456 Oak Ave, Anytown'].includes(donation.pickupAddress);
    }
    
    return true;
  });
  
  // Sort by newest first
  const sortedDonations = [...filteredDonations].sort((a, b) => b.createdAt - a.createdAt);
  
  // Handle authentication status
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 flex justify-center items-center">
          <div className="animate-pulse text-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-40 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // In a real app, might redirect if not authenticated or handle differently
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Available Donations</h1>
              <p className="text-muted-foreground">
                Browse and reserve food donations in your area
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Filter className="w-5 h-5 text-gray-400" />
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                <option value="all">All Donations</option>
                <option value="expiringSoon">Expiring Soon</option>
                <option value="nearby">Nearby</option>
              </select>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, description, or donor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>
          
          {/* Donations Grid */}
          {sortedDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDonations.map(donation => (
                <DonationCard 
                  key={donation.id} 
                  donation={donation} 
                  userRole={user.role} 
                  userId={user.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
              <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No donations found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "No donations match your search criteria" 
                  : "There are no available donations at the moment"}
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-sage-600 font-medium hover:text-sage-700"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DonationsList;

/* Note: In a real application, this would need to be connected to a backend API to handle:
1. User authentication and roles
2. Fetching actual donation data
3. Filtering based on real location data
4. Reservation functionality
*/
