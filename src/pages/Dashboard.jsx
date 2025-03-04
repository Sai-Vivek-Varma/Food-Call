
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, Heart, History, Settings, BarChart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';

// Mock user data (in a real app, this would come from authentication)
const mockUser = {
  id: '123',
  name: 'John Doe',
  role: 'donor', // 'donor', 'orphanage', or 'admin'
  email: 'john.doe@example.com',
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
  }
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Simulate fetching user data and donations
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setUser(mockUser);
      
      // Filter donations based on user role
      let filteredDonations;
      if (mockUser.role === 'donor') {
        // Donors see their own donations
        filteredDonations = mockDonations.filter(donation => donation.donorId === mockUser.id);
      } else if (mockUser.role === 'orphanage') {
        // Orphanages see available donations and ones they've reserved
        filteredDonations = mockDonations.filter(
          donation => donation.status === 'available' || donation.reservedBy === mockUser.id
        );
      } else {
        // Admins see all donations
        filteredDonations = mockDonations;
      }
      
      setDonations(filteredDonations);
      setLoading(false);
    }, 1000);
  }, []);
  
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
  
  // In a real app, redirect if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 sticky top-28">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 text-2xl font-bold mx-auto mb-3">
                    {user.name.charAt(0)}
                  </div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                </div>
                
                <nav className="space-y-1">
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md bg-sage-50 text-sage-700 font-medium">
                    <BarChart className="w-4 h-4" />
                    Dashboard
                  </a>
                  
                  {user.role === 'donor' && (
                    <Link to="/donate" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700">
                      <Plus className="w-4 h-4" />
                      Create Donation
                    </Link>
                  )}
                  
                  <Link to="/donations" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700">
                    <Package className="w-4 h-4" />
                    {user.role === 'donor' ? 'My Donations' : 'Available Donations'}
                  </Link>
                  
                  {user.role === 'orphanage' && (
                    <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700">
                      <Heart className="w-4 h-4" />
                      Reserved Donations
                    </a>
                  )}
                  
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700">
                    <History className="w-4 h-4" />
                    History
                  </a>
                  
                  {user.role === 'admin' && (
                    <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700">
                      <Users className="w-4 h-4" />
                      Manage Users
                    </a>
                  )}
                  
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 text-gray-700">
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h3 className="text-muted-foreground mb-1">
                    {user.role === 'donor' ? 'My Donations' : 'Received Donations'}
                  </h3>
                  <p className="text-3xl font-bold">{donations.length}</p>
                </div>
                
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h3 className="text-muted-foreground mb-1">
                    {user.role === 'donor' ? 'Reserved' : 'Active Reservations'}
                  </h3>
                  <p className="text-3xl font-bold">
                    {donations.filter(d => d.status === 'reserved').length}
                  </p>
                </div>
                
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h3 className="text-muted-foreground mb-1">
                    {user.role === 'donor' ? 'Completed' : 'Completed Pickups'}
                  </h3>
                  <p className="text-3xl font-bold">
                    {donations.filter(d => d.status === 'completed').length}
                  </p>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                
                {donations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {donations.map(donation => (
                      <DonationCard 
                        key={donation.id} 
                        donation={donation} 
                        userRole={user.role} 
                        userId={user.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No recent donations found</p>
                    {user.role === 'donor' && (
                      <Link to="/donate" className="btn-primary">
                        Create Your First Donation
                      </Link>
                    )}
                    {user.role === 'orphanage' && (
                      <Link to="/donations" className="btn-primary">
                        Browse Available Donations
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
