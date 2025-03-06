import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Search, Filter, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';
import { getAllDonations } from '@/lib/api';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
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
    
    // Fetch donations from API
    const fetchDonations = async () => {
      try {
        const data = await getAllDonations();
        setDonations(data);
        setFilteredDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
        toast.error('Failed to load donations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
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
