
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  Package, 
  Calendar, 
  MapPin, 
  Check,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    expiryRange: 'all',
  });
  
  // Add scroll-to-top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
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
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?q=80&w=2670&auto=format&fit=crop',
        },
        {
          id: '5',
          title: 'Dairy Products',
          description: 'Yogurt, milk, and cheese that are still fresh but approaching their sell-by date. All items properly refrigerated.',
          quantity: '30 units of various dairy products',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 4)),
          pickupAddress: '567 Grocery Ave, Eastside',
          pickupTimeStart: new Date(new Date().setHours(15, 0)),
          pickupTimeEnd: new Date(new Date().setHours(18, 0)),
          donorId: 'donor-5',
          donorName: 'Daily Dairy Store',
          status: 'reserved',
          reservedBy: 'orphanage-1',
          reservedByName: 'Hope Children\'s Home',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2070&auto=format&fit=crop',
        },
        {
          id: '6',
          title: 'Prepared Meals',
          description: 'Boxed lunches prepared for an event that was canceled. Includes sandwiches, salads, and fruit cups.',
          quantity: '25 boxed meals',
          expiryDate: new Date(new Date().setDate(new Date().getDate())),
          pickupAddress: '789 Conference Center, Downtown',
          pickupTimeStart: new Date(new Date().setHours(11, 0)),
          pickupTimeEnd: new Date(new Date().setHours(13, 0)),
          donorId: 'donor-6',
          donorName: 'Corporate Catering Co.',
          status: 'completed',
          reservedBy: 'orphanage-2',
          reservedByName: 'Sunshine Orphanage',
          createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
          imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2071&auto=format&fit=crop',
        },
      ];
      
      setDonations(mockDonations);
      setFilteredDonations(mockDonations);
      setIsLoading(false);
    }, 1500);
  }, []);
  
  // Apply filters when they change
  useEffect(() => {
    let result = [...donations];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(donation => 
        donation.title.toLowerCase().includes(query) || 
        donation.description.toLowerCase().includes(query) ||
        donation.donorName.toLowerCase().includes(query) ||
        donation.pickupAddress.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(donation => donation.status === filters.status);
    }
    
    // Apply expiry range filter
    if (filters.expiryRange !== 'all') {
      const today = new Date();
      
      switch (filters.expiryRange) {
        case 'today':
          result = result.filter(donation => {
            const expiryDate = new Date(donation.expiryDate);
            return expiryDate.toDateString() === today.toDateString();
          });
          break;
        case 'week':
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          
          result = result.filter(donation => {
            const expiryDate = new Date(donation.expiryDate);
            return expiryDate >= today && expiryDate <= nextWeek;
          });
          break;
        case 'month':
          const nextMonth = new Date(today);
          nextMonth.setMonth(today.getMonth() + 1);
          
          result = result.filter(donation => {
            const expiryDate = new Date(donation.expiryDate);
            return expiryDate >= today && expiryDate <= nextMonth;
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredDonations(result);
  }, [searchQuery, filters, donations]);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      status: 'all',
      expiryRange: 'all',
    });
    toast.success('Filters cleared');
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Available Donations</h1>
            <p className="text-muted-foreground">
              Browse all available food donations and find what you need for your orphanage.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-4 md:p-6 mb-8 animate__animated animate__fadeIn">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search donations..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative min-w-[180px]">
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                
                <div className="relative min-w-[180px]">
                  <select
                    value={filters.expiryRange}
                    onChange={(e) => handleFilterChange('expiryRange', e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Expiry Dates</option>
                    <option value="today">Expires Today</option>
                    <option value="week">Within a Week</option>
                    <option value="month">Within a Month</option>
                  </select>
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-input rounded-md hover:bg-secondary transition-colors text-sm text-muted-foreground"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Results */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-sage-500 mb-4" />
              <p className="text-muted-foreground">Loading donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16 animate__animated animate__fadeIn">
              <Package className="w-16 h-16 text-sage-200 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Donations Found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                We couldn't find any donations matching your search criteria. Try adjusting your filters or check back later.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                Showing {filteredDonations.length} {filteredDonations.length === 1 ? 'donation' : 'donations'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonations.map((donation, index) => (
                  <div 
                    key={donation.id}
                    className="animate__animated animate__fadeIn"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <DonationCard 
                      donation={donation} 
                      isOrphanage={false}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DonationsList;
