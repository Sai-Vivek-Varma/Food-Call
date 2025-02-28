
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, Search, Package, Loader } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationCard from '@/components/DonationCard';
import { Donation } from '@/lib/types';

const DonationsList = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('available');
  const [userType, setUserType] = useState<'donor' | 'orphanage' | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated and set user type
    try {
      const userJson = localStorage.getItem('foodShareUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        setUserType(user.role);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    
    // Simulate fetching donations
    setTimeout(() => {
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
          donorName: 'Taste of Italy Restaurant',
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2670&auto=format&fit=crop',
        },
        {
          id: '3',
          title: 'Fresh Fruits and Vegetables',
          description: 'Assorted fresh produce including apples, oranges, carrots, and potatoes. All in good condition.',
          quantity: 'Approximately 15kg',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 4)),
          pickupAddress: '78 Green Lane, Market District',
          pickupTimeStart: new Date(new Date().setHours(9, 0)),
          pickupTimeEnd: new Date(new Date().setHours(12, 0)),
          donorId: 'donor-3',
          donorName: 'Farmer\'s Market Collective',
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop',
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
          createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
          imageUrl: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?q=80&w=2670&auto=format&fit=crop',
        },
        {
          id: '5',
          title: 'Dairy Products',
          description: 'Fresh milk, yogurt, and cheese. All properly refrigerated and sealed.',
          quantity: '20 liters of milk, 5kg of cheese, 30 yogurt cups',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          pickupAddress: '56 Dairy Road, Farm District',
          pickupTimeStart: new Date(new Date().setHours(8, 0)),
          pickupTimeEnd: new Date(new Date().setHours(10, 0)),
          donorId: 'donor-5',
          donorName: 'Countryside Dairy',
          status: 'completed',
          reservedBy: 'orphanage-2',
          reservedByName: 'Sunshine Orphanage',
          createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
          imageUrl: 'https://images.unsplash.com/photo-1628088062856-d1c6c15368f3?q=80&w=2670&auto=format&fit=crop',
        },
        {
          id: '6',
          title: 'Packaged Meals from Hotel Event',
          description: 'Prepared but unused packaged meals from a conference. Includes chicken, rice, and vegetables.',
          quantity: '35 individual meals',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          pickupAddress: '100 Grand Avenue, Hotel District',
          pickupTimeStart: new Date(new Date().setHours(20, 0)),
          pickupTimeEnd: new Date(new Date().setHours(22, 0)),
          donorId: 'donor-6',
          donorName: 'Grand Hotel & Conference Center',
          status: 'available',
          createdAt: new Date(new Date().setHours(new Date().getHours() - 5)),
          imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2564&auto=format&fit=crop',
        },
      ];
      
      setDonations(mockDonations);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Apply filters and search whenever donations, searchTerm, or filterStatus changes
  useEffect(() => {
    let filtered = [...donations];
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(donation => donation.status === filterStatus);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        donation => 
          donation.title.toLowerCase().includes(term) ||
          donation.description.toLowerCase().includes(term) ||
          donation.donorName.toLowerCase().includes(term)
      );
    }
    
    setFilteredDonations(filtered);
  }, [donations, searchTerm, filterStatus]);
  
  const handleReserveDonation = async (donationId: string) => {
    // Check if user is authenticated
    const userJson = localStorage.getItem('foodShareUser');
    if (!userJson) {
      toast.error('You must be logged in to reserve a donation');
      navigate('/auth');
      return;
    }
    
    // Ensure the user is an orphanage
    const user = JSON.parse(userJson);
    if (user.role !== 'orphanage') {
      toast.error('Only orphanages can reserve donations');
      return;
    }
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Update the local state to reflect the reservation
          setDonations(prevDonations => 
            prevDonations.map(donation => 
              donation.id === donationId 
                ? {
                    ...donation,
                    status: 'reserved',
                    reservedBy: user.id,
                    reservedByName: user.organization || user.name,
                  }
                : donation
            )
          );
          
          toast.success('Donation reserved successfully! The donor has been notified.');
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
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
              Discover available food donations from various donors. Reserve what your orphanage needs or 
              see what's already been claimed.
            </p>
          </div>
          
          <div className="mb-8 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <div className="relative md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search donations by title, description, or donor"
                className="pl-10 w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Filter className="text-muted-foreground w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              >
                <option value="available">Available Only</option>
                <option value="reserved">Reserved Only</option>
                <option value="completed">Completed Only</option>
                <option value="all">All Donations</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader className="w-10 h-10 text-sage-500 animate-spin mb-4" />
              <p className="text-muted-foreground">Loading donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16">
              <Package className="w-16 h-16 text-sage-200 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Donations Found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                {searchTerm 
                  ? 'No donations match your search criteria. Try different keywords or clear your search.' 
                  : filterStatus !== 'all'
                    ? `No ${filterStatus} donations at the moment. Try a different filter or check back later.`
                    : 'There are no donations available at the moment. Please check back later.'}
              </p>
              {userType === 'donor' && (
                <Link to="/donate" className="btn-primary">
                  Create a Donation
                </Link>
              )}
            </div>
          ) : (
            <>
              {userType === 'donor' && (
                <div className="flex justify-end mb-6">
                  <Link to="/donate" className="btn-primary">
                    Create a Donation
                  </Link>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonations.map((donation) => (
                  <DonationCard
                    key={donation.id}
                    donation={donation}
                    onReserve={handleReserveDonation}
                    isOrphanage={userType === 'orphanage'}
                  />
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
