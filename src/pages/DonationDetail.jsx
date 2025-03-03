
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  CalendarIcon, 
  Package, 
  Building, 
  ArrowLeft, 
  Share2, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DonationDetail = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarDonations, setSimilarDonations] = useState([]);
  
  useEffect(() => {
    // Add scroll-to-top when the page loads
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
    
    // Simulate fetching donation details
    setTimeout(() => {
      // Mock donation data that would come from API based on the ID
      const mockDonations = [
        {
          id: '1',
          title: 'Fresh Bread from Local Bakery',
          description: 'Assorted bread including sourdough, white, and whole grain loaves. Baked fresh this morning. Perfect for breakfast or sandwiches. All items are properly packaged and maintained in clean conditions.',
          quantity: '20 loaves',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
          pickupAddress: '123 Baker Street, City Center',
          pickupInstructions: 'Enter through the side door and ask for John at the reception desk. Please bring your own bags or containers.',
          pickupTimeStart: new Date(new Date().setHours(14, 0)),
          pickupTimeEnd: new Date(new Date().setHours(17, 0)),
          donorId: 'donor-1',
          donorName: 'City Bakery',
          donorPhone: '(555) 123-4567',
          donorAddress: '123 Baker Street, City Center',
          donorDescription: 'Local bakery specializing in artisanal breads and pastries. We\'ve been operating in the community for over 15 years.',
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2532&auto=format&fit=crop',
        },
        {
          id: '2',
          title: 'Rice and Pasta from Restaurant',
          description: 'Excess rice and pasta prepared for a catering event. Still in sealed containers and refrigerated. Food was prepared today and has been kept at the appropriate temperature. Includes white rice, brown rice, and various pasta shapes.',
          quantity: '10kg of rice, 5kg of pasta',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          pickupAddress: '45 Main St, Downtown',
          pickupInstructions: 'Please come to the back entrance marked "Deliveries". Ring the bell and someone will assist you.',
          pickupTimeStart: new Date(new Date().setHours(19, 0)),
          pickupTimeEnd: new Date(new Date().setHours(21, 0)),
          donorId: 'donor-2',
          donorName: 'Bella Restaurant',
          donorPhone: '(555) 987-6543',
          donorAddress: '45 Main St, Downtown',
          donorDescription: 'Italian restaurant serving authentic dishes since 2010. We focus on using fresh ingredients and traditional recipes.',
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2670&auto=format&fit=crop',
        },
        {
          id: '3',
          title: 'Fresh Fruits and Vegetables',
          description: 'Surplus produce from our grocery store including apples, oranges, carrots, and lettuce. All fresh and in excellent condition. These items are overstock and would otherwise be discarded. Everything has been inspected for quality.',
          quantity: 'Approximately 15kg assorted produce',
          expiryDate: new Date(new Date().setDate(new Date().getDate() + 3)),
          pickupAddress: '789 Market Street, Uptown',
          pickupInstructions: 'Come to the customer service desk and ask for the manager on duty. Please bring your own boxes or bags.',
          pickupTimeStart: new Date(new Date().setHours(10, 0)),
          pickupTimeEnd: new Date(new Date().setHours(12, 0)),
          donorId: 'donor-3',
          donorName: 'Fresh Market Grocery',
          donorPhone: '(555) 456-7890',
          donorAddress: '789 Market Street, Uptown',
          donorDescription: 'Local grocery store specializing in fresh produce and organic foods. We work directly with local farmers to provide the best quality.',
          status: 'available',
          createdAt: new Date(),
          imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop',
        },
      ];
      
      const foundDonation = mockDonations.find(d => d.id === id);
      setDonation(foundDonation || mockDonations[0]); // Default to first donation if ID not found
      
      // Get similar donations (other donations not matching the current one)
      const otherDonations = mockDonations.filter(d => d.id !== (foundDonation?.id || mockDonations[0].id));
      setSimilarDonations(otherDonations.slice(0, 2)); // Get up to 2 similar donations
      
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const isExpired = donation && new Date(donation.expiryDate) < new Date();
  const isOrphanage = user?.role === 'orphanage';
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-6xl flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
  
  if (!donation) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
              <AlertTriangle className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
              <h1 className="text-3xl font-bold mb-4">Donation Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The donation you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/donations" className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Donations
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4 animate__animated animate__fadeIn">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <Link to="/donations" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Donations
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Donation Images */}
              <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden mb-8">
                {donation.imageUrl ? (
                  <div className="h-80 w-full">
                    <img 
                      src={donation.imageUrl} 
                      alt={donation.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-80 w-full bg-secondary flex items-center justify-center">
                    <Package className="w-20 h-20 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {/* Donation Details */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-8 mb-8">
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold">{donation.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isExpired ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {isExpired ? 'Expired' : 'Available'}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {donation.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Donation Details</h2>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Package className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Quantity</p>
                          <p className="font-medium">{donation.quantity}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Expiry Date</p>
                          <p className="font-medium">{formatDate(donation.expiryDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Building className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Donated By</p>
                          <p className="font-medium">{donation.donorName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Pickup Information</h2>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">{donation.pickupAddress}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pickup Time</p>
                          <p className="font-medium">
                            {formatTime(donation.pickupTimeStart)} - {formatTime(donation.pickupTimeEnd)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {donation.pickupInstructions && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Pickup Instructions</h2>
                    <p className="text-muted-foreground bg-secondary p-4 rounded-md">
                      {donation.pickupInstructions}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  {isOrphanage && !isExpired && (
                    <button className="px-6 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                      Reserve Donation
                    </button>
                  )}
                </div>
              </div>
              
              {/* Donor Information */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-8">
                <h2 className="text-xl font-semibold mb-4">About the Donor</h2>
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-sage-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{donation.donorName}</h3>
                    <p className="text-sm text-muted-foreground">{donation.donorAddress}</p>
                  </div>
                </div>
                
                {donation.donorDescription && (
                  <p className="text-muted-foreground mb-4">
                    {donation.donorDescription}
                  </p>
                )}
                
                <div className="p-4 bg-sage-50 rounded-md flex items-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-sage-500 mr-3" />
                  <p className="text-sm">
                    This donor has been verified and is a trusted member of our platform.
                  </p>
                </div>
                
                {isOrphanage && (
                  <div>
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <p className="text-sm mb-4">
                      <span className="text-muted-foreground">Phone: </span>
                      {donation.donorPhone}
                    </p>
                    <button className="w-full py-2 px-4 border border-sage-500 text-sage-700 rounded-md hover:bg-sage-50 transition-colors text-center text-sm font-medium">
                      Message Donor
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar Column */}
            <div>
              {/* Action Card */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-8 sticky top-28">
                <h2 className="text-xl font-semibold mb-4">Donation Status</h2>
                
                {isExpired ? (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <h3 className="font-medium">This donation has expired</h3>
                    </div>
                    <p className="text-sm">
                      This donation is no longer available for reservation as it has passed its expiry date.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-green-50 text-green-700 rounded-md mb-4">
                      <p className="font-medium">Available for Reservation</p>
                    </div>
                    
                    {isOrphanage ? (
                      <button className="w-full py-3 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-center font-medium mb-4">
                        Reserve Donation
                      </button>
                    ) : (
                      <Link to="/auth" className="block w-full py-3 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-center font-medium mb-4">
                        Sign In to Reserve
                      </Link>
                    )}
                  </>
                )}
                
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    <span className="font-medium">Listed on:</span> {formatDate(donation.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium">Reference ID:</span> {donation.id}
                  </p>
                </div>
              </div>
              
              {/* Similar Donations */}
              {similarDonations.length > 0 && (
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Similar Donations</h2>
                  
                  <div className="space-y-4">
                    {similarDonations.map(similar => (
                      <Link 
                        key={similar.id} 
                        to={`/donations/${similar.id}`}
                        className="block group"
                      >
                        <div className="flex space-x-3 p-3 rounded-md hover:bg-secondary transition-colors">
                          {similar.imageUrl ? (
                            <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={similar.imageUrl} 
                                alt={similar.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-16 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                              <Package className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm mb-1 truncate group-hover:text-sage-600 transition-colors">
                              {similar.title}
                            </h3>
                            <p className="text-xs text-muted-foreground truncate">
                              {similar.donorName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Expires: {formatDate(similar.expiryDate)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    <Link 
                      to="/donations" 
                      className="block text-center text-sm text-sage-600 hover:text-sage-700 font-medium mt-2"
                    >
                      View All Donations
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DonationDetail;
