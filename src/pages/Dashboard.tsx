
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Package, User, CheckCircle2, Clock, XCircle, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';
import { User as UserType, Donation } from '@/lib/types';

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated
    const userJson = localStorage.getItem('foodShareUser');
    if (!userJson) {
      toast.error('You must be logged in to access your dashboard');
      navigate('/auth');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
      
      // Simulate fetching donations
      setTimeout(() => {
        // Mock donations data that would come from API
        const mockDonations: Donation[] = [
          {
            id: '1',
            title: 'Fresh Bread from Local Bakery',
            description: 'Assorted bread including sourdough, white, and whole grain loaves. Baked fresh this morning.',
            quantity: '20 loaves',
            expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
            pickupAddress: '123 Baker Street, City Center',
            pickupTimeStart: new Date(new Date().setHours(14, 0)),
            pickupTimeEnd: new Date(new Date().setHours(17, 0)),
            donorId: parsedUser.id,
            donorName: parsedUser.organization || parsedUser.name,
            status: 'available',
            createdAt: new Date(),
            imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2532&auto=format&fit=crop',
          },
          {
            id: '2',
            title: 'Rice and Pasta from Restaurant',
            description: 'Excess rice and pasta prepared for a catering event. Still in sealed containers and refrigerated.',
            quantity: '10kg of rice, 5kg of pasta',
            expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            pickupAddress: '45 Main St, Downtown',
            pickupTimeStart: new Date(new Date().setHours(19, 0)),
            pickupTimeEnd: new Date(new Date().setHours(21, 0)),
            donorId: parsedUser.id,
            donorName: parsedUser.organization || parsedUser.name,
            status: 'reserved',
            reservedBy: 'orphanage-1',
            reservedByName: 'Hope Children\'s Home',
            createdAt: new Date(),
            imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2670&auto=format&fit=crop',
          },
          {
            id: '3',
            title: 'Canned Goods and Dry Foods',
            description: 'Assortment of canned vegetables, soups, and dry goods like pasta and rice with at least 3 months before expiry.',
            quantity: '40 cans, 10kg dry goods',
            expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
            pickupAddress: '12 Storage Way, Industrial Park',
            pickupTimeStart: new Date(new Date().setHours(10, 0)),
            pickupTimeEnd: new Date(new Date().setHours(16, 0)),
            donorId: parsedUser.id,
            donorName: parsedUser.organization || parsedUser.name,
            status: 'completed',
            reservedBy: 'orphanage-2',
            reservedByName: 'Sunshine Orphanage',
            createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
            imageUrl: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?q=80&w=2670&auto=format&fit=crop',
          },
        ];
        
        setDonations(mockDonations);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error parsing user data:', error);
      toast.error('An error occurred. Please try logging in again.');
      navigate('/auth');
    }
  }, [navigate]);
  
  // Filter donations based on active tab
  const filteredDonations = donations.filter(donation => {
    if (activeTab === 'active') {
      return ['available', 'reserved'].includes(donation.status);
    }
    return ['completed', 'expired'].includes(donation.status);
  });
  
  const handleLogout = () => {
    localStorage.removeItem('foodShareUser');
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  if (!user) {
    return null; // User is being redirected
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Dashboard
              </span>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
              <p className="text-muted-foreground">
                {user.role === 'donor' 
                  ? 'Manage your food donations and see their status.' 
                  : 'View your reserved donations and manage pickups.'}
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex space-x-3">
              {user.role === 'donor' && (
                <Link to="/donate" className="btn-primary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Donation</span>
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="btn-outline"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-border flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <User className="w-6 h-6 text-sage-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Role</p>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-sage-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Donations</p>
                <p className="font-medium">{donations.length}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <p className="font-medium">
                  {donations.filter(d => d.status === 'completed').length}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {user.role === 'donor' ? 'Active Listings' : 'Pending Pickups'}
                </p>
                <p className="font-medium">
                  {donations.filter(d => d.status === 'available' || d.status === 'reserved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex border-b border-border">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'active' 
                    ? 'text-sage-500 border-b-2 border-sage-500' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('active')}
              >
                Active Donations
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'history' 
                    ? 'text-sage-500 border-b-2 border-sage-500' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mb-4"></div>
              <p className="text-muted-foreground">Loading donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16">
              <Package className="w-16 h-16 text-sage-200 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Donations Found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                {activeTab === 'active' 
                  ? 'You don\'t have any active donations. Create a new donation to get started!'
                  : 'You don\'t have any completed or expired donations yet.'}
              </p>
              {user.role === 'donor' && (
                <Link to="/donate" className="btn-primary">
                  Create a Donation
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map(donation => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                  isOrphanage={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
