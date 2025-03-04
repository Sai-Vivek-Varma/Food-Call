
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CalendarDays, Clock, MapPin, Package, User, Shield, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock user data (in a real app, this would come from authentication)
const mockUser = {
  id: '456',
  name: 'Hope Children\'s Home',
  role: 'orphanage',
  email: 'contact@hopechildrenshome.org',
  organization: 'Hope Children\'s Home',
  address: '789 Charity St, Anytown',
  phone: '555-123-4567',
  createdAt: new Date('2023-01-15'),
};

// Mock donations data (in a real app, this would come from an API)
const mockDonations = [
  {
    id: '1',
    title: 'Leftover Wedding Catering',
    description: 'Food from a wedding ceremony. Includes rice, curry, and desserts. All items were prepared following food safety guidelines and have been properly stored since the event ended. This donation is suitable for immediate consumption or can be refrigerated for up to 24 hours.',
    quantity: '25 meal portions',
    expiryDate: new Date(Date.now() + 86400000), // tomorrow
    pickupAddress: '123 Main St, Anytown',
    pickupTimeStart: new Date(Date.now() + 3600000), // in 1 hour
    pickupTimeEnd: new Date(Date.now() + 7200000), // in 2 hours
    donorId: '123',
    donorName: 'John Doe',
    donorPhone: '555-987-6543',
    status: 'available',
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Restaurant Daily Surplus',
    description: 'End of day meals from our restaurant. Fresh and ready to serve. These are high-quality meals prepared today and include a variety of options suitable for children and adults alike. All meals have been handled according to restaurant health standards.',
    quantity: '10 meal portions',
    expiryDate: new Date(Date.now() + 43200000), // 12 hours from now
    pickupAddress: '456 Oak Ave, Anytown',
    pickupTimeStart: new Date(Date.now() + 1800000), // in 30 minutes
    pickupTimeEnd: new Date(Date.now() + 5400000), // in 1.5 hours
    donorId: '123',
    donorName: 'John Doe',
    donorPhone: '555-987-6543',
    status: 'reserved',
    reservedBy: '456',
    reservedByName: 'Hope Children\'s Home',
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Bakery Unsold Goods',
    description: 'Various breads and pastries from today\'s baking. All items are freshly made this morning and include a variety of breads, rolls, and sweet pastries. These items are perfect for breakfast or as additions to meals.',
    quantity: '30 items',
    expiryDate: new Date(Date.now() + 172800000), // 2 days from now
    pickupAddress: '789 Pine St, Anytown',
    pickupTimeStart: new Date(Date.now() + 10800000), // in 3 hours
    pickupTimeEnd: new Date(Date.now() + 14400000), // in 4 hours
    donorId: '789',
    donorName: 'Sunshine Bakery',
    donorPhone: '555-456-7890',
    status: 'available',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop'
  }
];

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const DonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [completing, setCompleting] = useState(false);
  
  // Simulate fetching donation and user data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const foundDonation = mockDonations.find(d => d.id === id);
      
      if (!foundDonation) {
        navigate('/not-found');
        return;
      }
      
      setDonation(foundDonation);
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  }, [id, navigate]);
  
  // Handle reservation
  const handleReserve = async () => {
    if (!user) {
      toast.error("Please sign in to reserve donations");
      navigate('/auth');
      return;
    }
    
    if (user.role !== 'orphanage') {
      toast.error("Only orphanages can reserve donations");
      return;
    }
    
    setReserving(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setDonation({
        ...donation,
        status: 'reserved',
        reservedBy: user.id,
        reservedByName: user.organization || user.name
      });
      
      toast.success("Donation reserved successfully!");
    } catch (error) {
      toast.error("Failed to reserve donation. Please try again.");
      console.error(error);
    } finally {
      setReserving(false);
    }
  };
  
  // Handle completion
  const handleComplete = async () => {
    if (!user) {
      toast.error("Please sign in to complete donations");
      navigate('/auth');
      return;
    }
    
    setCompleting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setDonation({
        ...donation,
        status: 'completed'
      });
      
      toast.success("Donation marked as completed!");
    } catch (error) {
      toast.error("Failed to complete donation. Please try again.");
      console.error(error);
    } finally {
      setCompleting(false);
    }
  };
  
  // Handle cancellation
  const handleCancel = async () => {
    if (!user) {
      toast.error("Please sign in to cancel reservations");
      navigate('/auth');
      return;
    }
    
    if (donation.reservedBy !== user.id && donation.donorId !== user.id) {
      toast.error("You don't have permission to cancel this reservation");
      return;
    }
    
    // In a real app, this would show a confirmation dialog
    
    setReserving(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setDonation({
        ...donation,
        status: 'available',
        reservedBy: undefined,
        reservedByName: undefined
      });
      
      toast.success("Reservation cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel reservation. Please try again.");
      console.error(error);
    } finally {
      setReserving(false);
    }
  };
  
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
  
  if (!donation) {
    return null; // This should not happen as we navigate to NotFound if donation isn't found
  }
  
  const isExpired = new Date(donation.expiryDate) < new Date();
  const isAvailable = donation.status === 'available' && !isExpired;
  const isReserved = donation.status === 'reserved';
  const isCompleted = donation.status === 'completed';
  const isReservedByUser = isReserved && user && donation.reservedBy === user.id;
  const isDonatedByUser = user && donation.donorId === user.id;
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="text-sm">
              <Link to="/donations" className="text-gray-500 hover:text-sage-500">
                Donations
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{donation.title}</span>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
                  {donation.imageUrl ? (
                    <img 
                      src={donation.imageUrl} 
                      alt={donation.title} 
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="p-4">
                    {isExpired ? (
                      <div className="flex items-center text-red-500 mb-4">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        <span className="font-medium">Expired</span>
                      </div>
                    ) : isCompleted ? (
                      <div className="flex items-center text-green-600 mb-4">
                        <Shield className="w-5 h-5 mr-2" />
                        <span className="font-medium">Completed</span>
                      </div>
                    ) : isReserved ? (
                      <div className="flex items-center text-orange-500 mb-4">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="font-medium">Reserved</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-sage-600 mb-4">
                        <Package className="w-5 h-5 mr-2" />
                        <span className="font-medium">Available</span>
                      </div>
                    )}
                    
                    {/* Quick Info */}
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CalendarDays className="w-5 h-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-500">Expiry Date</div>
                          <div className={`font-medium ${isExpired ? 'text-red-500' : 'text-gray-900'}`}>
                            {formatDate(donation.expiryDate)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-500">Pickup Time</div>
                          <div className="font-medium text-gray-900">
                            {formatTime(donation.pickupTimeStart)} - {formatTime(donation.pickupTimeEnd)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-500">Pickup Location</div>
                          <div className="font-medium text-gray-900">
                            {donation.pickupAddress}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-500">Donor</div>
                          <div className="font-medium text-gray-900">
                            {donation.donorName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-8">
                <h1 className="text-3xl font-bold mb-4">{donation.title}</h1>
                
                <div className="mb-6">
                  <div className="font-medium text-gray-700 mb-2">Quantity</div>
                  <p className="text-lg">{donation.quantity}</p>
                </div>
                
                <div className="mb-6">
                  <div className="font-medium text-gray-700 mb-2">Description</div>
                  <p className="text-gray-600 whitespace-pre-line">
                    {donation.description}
                  </p>
                </div>
                
                {/* Reservation Status */}
                {isReserved && (
                  <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                    <div className="font-medium text-orange-700 mb-1">
                      Reserved by {donation.reservedByName}
                    </div>
                    <p className="text-orange-600 text-sm">
                      This donation has been reserved and is waiting for pickup
                    </p>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="pt-4 border-t">
                  {isAvailable && user && user.role === 'orphanage' && (
                    <button
                      onClick={handleReserve}
                      disabled={reserving}
                      className="w-full py-3 mb-3 bg-sage-500 text-white font-medium rounded-md hover:bg-sage-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {reserving ? 'Processing...' : 'Reserve Donation'}
                    </button>
                  )}
                  
                  {isReservedByUser && (
                    <>
                      <button
                        onClick={handleComplete}
                        disabled={completing}
                        className="w-full py-3 mb-3 bg-sage-500 text-white font-medium rounded-md hover:bg-sage-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {completing ? 'Processing...' : 'Mark as Picked Up'}
                      </button>
                      
                      <button
                        onClick={handleCancel}
                        disabled={reserving}
                        className="w-full py-3 border border-red-300 text-red-700 font-medium rounded-md hover:bg-red-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {reserving ? 'Processing...' : 'Cancel Reservation'}
                      </button>
                    </>
                  )}
                  
                  {isDonatedByUser && isReserved && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 mb-2">
                        Contact Information for Reserved Donation
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium">{donation.reservedByName}</div>
                        <div className="text-gray-600">{user.phone}</div>
                        <div className="text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  )}
                  
                  {isCompleted && (
                    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                      <div className="font-medium text-green-700 mb-1">
                        This donation has been completed
                      </div>
                      <p className="text-green-600 text-sm">
                        Thank you for contributing to reducing food waste and helping those in need!
                      </p>
                    </div>
                  )}
                  
                  {isExpired && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                      <div className="font-medium text-red-700 mb-1">
                        This donation has expired
                      </div>
                      <p className="text-red-600 text-sm">
                        The expiry date for this donation has passed. It is no longer available for reservation.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Related Donations (in a real app, this would be dynamically generated) */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Other Available Donations</h3>
                
                <div className="space-y-4">
                  {mockDonations
                    .filter(d => d.id !== donation.id && d.status === 'available')
                    .slice(0, 2)
                    .map(d => (
                      <Link 
                        key={d.id} 
                        to={`/donations/${d.id}`}
                        className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                          {d.imageUrl ? (
                            <img 
                              src={d.imageUrl} 
                              alt={d.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{d.title}</div>
                          <div className="text-sm text-gray-500">
                            Expires {formatDate(d.expiryDate)}
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Link to="/donations" className="text-sage-600 font-medium hover:text-sage-700">
                    View All Available Donations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DonationDetail;

/* Note: In a real application, this would need to be connected to a backend API to handle:
1. User authentication and roles
2. Fetching actual donation data by ID
3. Reservation functionality
4. Completion functionality
5. Direct messaging between donor and recipient
*/
