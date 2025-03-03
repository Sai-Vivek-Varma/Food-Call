
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Search, Filter, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonationCard from '../components/DonationCard';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // Add scroll-to-top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated
    const userJson = localStorage.getItem('foodCallUser');
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
      const mockDonations = [
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
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Available Donations
            </span>
            <h1 className="text-3xl font-bold mb-2">Browse Food Donations</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find and reserve available food donations for your organization. All listings show 
              real-time availability and detailed information.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="w-full md:w-48">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-input appearance-none focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
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
                {searchTerm 
                  ? `No donations matching "${searchTerm}" were found.` 
                  : 'There are no donations available with the selected filters.'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="px-6 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map(donation => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                  isOrphanage={user?.role === 'orphanage'}
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

export default DonationsList;
