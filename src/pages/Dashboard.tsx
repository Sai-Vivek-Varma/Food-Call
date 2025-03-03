
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
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      <section className="py-5 mt-5">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">
            <div>
              <span className="badge bg-sage-100 text-sage-700 fw-medium mb-2">
                Dashboard
              </span>
              <h1 className="fw-bold mb-2">Welcome, {user.name}</h1>
              <p className="text-muted">
                {user.role === 'donor' 
                  ? 'Manage your food donations and see their status.' 
                  : 'View your reserved donations and manage pickups.'}
              </p>
            </div>
            
            <div className="mt-3 mt-md-0 d-flex gap-2">
              {user.role === 'donor' && (
                <Link to="/donate" className="btn btn-sage d-flex align-items-center">
                  <Plus size={18} className="me-1" />
                  <span>New Donation</span>
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="btn btn-outline-sage"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-sage-100 p-3 me-3">
                    <User size={24} className="text-sage-500" />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">Role</p>
                    <p className="fw-medium mb-0 text-capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-sage-100 p-3 me-3">
                    <Package size={24} className="text-sage-500" />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">Total Donations</p>
                    <p className="fw-medium mb-0">{donations.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                    <CheckCircle2 size={24} className="text-success" />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">Completed</p>
                    <p className="fw-medium mb-0">
                      {donations.filter(d => d.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                    <Clock size={24} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-muted small mb-0">
                      {user.role === 'donor' ? 'Active Listings' : 'Pending Pickups'}
                    </p>
                    <p className="fw-medium mb-0">
                      {donations.filter(d => d.status === 'available' || d.status === 'reserved').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Active Donations
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>
            </li>
          </ul>
          
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-sage-500 mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Loading donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="card border-0 shadow-sm p-5 text-center">
              <div className="mb-4">
                <Package size={48} className="text-sage-300" />
              </div>
              <h3 className="fw-medium mb-3">No Donations Found</h3>
              <p className="text-muted mb-4">
                {activeTab === 'active' 
                  ? 'You don\'t have any active donations. Create a new donation to get started!'
                  : 'You don\'t have any completed or expired donations yet.'}
              </p>
              {user.role === 'donor' && (
                <Link to="/donate" className="btn btn-sage mx-auto">
                  Create a Donation
                </Link>
              )}
            </div>
          ) : (
            <div className="row g-4">
              {filteredDonations.map(donation => (
                <div className="col-md-6 col-lg-4" key={donation.id}>
                  <DonationCard
                    donation={donation}
                    isOrphanage={false}
                  />
                </div>
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
