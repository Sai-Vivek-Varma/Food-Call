import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';
import SearchBar from '@/components/donations/SearchBar';
import StatusFilter from '@/components/donations/StatusFilter';
import LoadingState from '@/components/donations/LoadingState';
import EmptyState from '@/components/donations/EmptyState';
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
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
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
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            <StatusFilter 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
            />
          </div>
          
          {isLoading ? (
            <LoadingState />
          ) : filteredDonations.length === 0 ? (
            <EmptyState 
              searchTerm={searchTerm} 
              onClearFilters={handleClearFilters}
            />
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
