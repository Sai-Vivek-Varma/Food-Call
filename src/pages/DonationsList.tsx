
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Search, Filter, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';
import { Donation, User } from '@/lib/types';

const DonationsList = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'reserved'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Add scroll-to-top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated
    const userJson = localStorage.getItem('foodShareUser');
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
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
          donorId: 'donor-1',
          donorName: 'City Bakery',
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
          donorId: 'donor-2',
          donorName: 'Bella Restaurant',
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2670&auto=format&fit=crop',
        },
        {
          id: '3',
          title: 'Fresh Fruits and Vegetables',
          description: 'Surplus produce from our grocery store including apples, oranges, carrots, and lettuce. All fresh and in excellent condition.',
          quantity: 'Approximately 15kg assorted produce',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 3)),
          pickupAddress: '789 Market Street, Uptown',
          pickupTimeStart: new Date(new Date().setHours(10, 0)),
          pickupTimeEnd: new Date(new Date().setHours(12, 0)),
          donorId: 'donor-3',
          donorName: 'Fresh Market Grocery',
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop',
        },
        {
          id: '4',
          title: 'Canned Goods and Dry Foods',
          description: 'Assortment of canned vegetables, soups, and dry goods like pasta and rice with at least 3 months before expiry.',
          quantity: '40 cans, 10kg dry goods',
          expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          pickupAddress: '12 Storage Way, Industrial Park',
          pickupTimeStart: new Date(new Date().setHours(10, 0)),
          pickupTimeEnd: new Date(new Date().setHours(16, 0)),
          donorId: 'donor-4',
          donorName: 'Community Food Bank',
          status: 'reserved',
          reservedBy: 'orphanage-1',
          reservedByName: 'Hope Children\'s Home',
          createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
          imageUrl: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?q=80&w=2670&auto=format&fit=crop',
        },
        {
          id: '5',
          title: 'Dairy Products',
          description: 'Selection of yogurts, cheese, and milk products approaching best-before date but still fresh and safe.',
          quantity: '30 units of various dairy products',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
          pickupAddress: '56 Farm Road, Countryside',
          pickupTimeStart: new Date(new Date().setHours(8, 0)),
          pickupTimeEnd: new Date(new Date().setHours(11, 0)),
          donorId: 'donor-5',
          donorName: 'Local Dairy Co-op',
          status: 'available',
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          imageUrl: 'https://images.unsplash.com/photo-1628088062140-d4c3c540c1a3?q=80&w=2070&auto=format&fit=crop',
        },
      ];
      
      setDonations(mockDonations);
      setFilteredDonations(mockDonations);
      setIsLoading(false);
    }, 1500);
  }, [navigate]);
  
  useEffect(() => {
    // Filter donations based on search term and status filter
    let filtered = donations;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(donation => donation.status === statusFilter);
    }
    
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(donation => 
        donation.title.toLowerCase().includes(lowercaseSearchTerm) ||
        donation.description.toLowerCase().includes(lowercaseSearchTerm) ||
        donation.donorName.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    setFilteredDonations(filtered);
  }, [searchTerm, statusFilter, donations]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      <section className="py-5 mt-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-sage-100 text-sage-700 fw-medium mb-3">
              Available Donations
            </span>
            <h1 className="fw-bold mb-3">Browse Food Donations</h1>
            <p className="text-muted w-md-75 mx-auto">
              Find and reserve available food donations for your organization. All listings show 
              real-time availability and detailed information.
            </p>
          </div>
          
          <div className="row g-3 mb-4">
            <div className="col-md-9">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="input-group">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'available' | 'reserved')}
                  className="form-select"
                >
                  <option value="all">All Donations</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                </select>
                <span className="input-group-text bg-white">
                  <Filter size={18} className="text-muted" />
                </span>
              </div>
            </div>
          </div>
          
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
                {searchTerm 
                  ? `No donations matching "${searchTerm}" were found.` 
                  : 'There are no donations available with the selected filters.'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="btn btn-sage mx-auto"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredDonations.map(donation => (
                <div className="col-md-6 col-lg-4" key={donation.id}>
                  <DonationCard
                    donation={donation}
                    isOrphanage={user?.role === 'orphanage'}
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

export default DonationsList;
