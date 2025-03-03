
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, Package, User, Phone, Mail, ArrowLeft, MessageCircle, Share, HeartHandshake } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DonationDetail = () => {
  const [donation, setDonation] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);
  const { id } = useParams();
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
    
    // Fetch donation data
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock donation data that would come from API
      const mockDonation = {
        id: id,
        title: 'Fresh Bread from Local Bakery',
        description: 'Assorted bread including sourdough, white, and whole grain loaves. Baked fresh this morning. Perfect for serving with meals or making sandwiches. All breads are wrapped individually and in excellent condition.',
        quantity: '20 loaves',
        expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        pickupAddress: '123 Baker Street, City Center',
        pickupTimeStart: new Date(new Date().setHours(14, 0)),
        pickupTimeEnd: new Date(new Date().setHours(17, 0)),
        donorId: 'donor-1',
        donorName: 'City Bakery',
        donorPhone: '+1 (555) 123-4567',
        donorEmail: 'citybakery@example.com',
        status: 'available',
        createdAt: new Date(),
        imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2532&auto=format&fit=crop',
        additionalNotes: 'Please bring your own boxes or bags for carrying the bread. The back entrance is preferable for pickup - there will be a sign.'
      };
      
      setDonation(mockDonation);
      setIsLoading(false);
    }, 1000);
  }, [id, navigate]);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleReservation = () => {
    if (!user) {
      toast.error('Please sign in to reserve this donation');
      navigate('/auth');
      return;
    }
    
    if (user.role !== 'orphanage') {
      toast.error('Only orphanages can reserve donations');
      return;
    }
    
    setIsReserving(true);
    
    // Simulate API call to reserve donation
    setTimeout(() => {
      toast.success('Donation reserved successfully!');
      
      // Update local donation data
      setDonation(prev => ({
        ...prev,
        status: 'reserved',
        reservedBy: user.id,
        reservedByName: user.organization || user.name
      }));
      
      setIsReserving(false);
    }, 1500);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Food Call - ${donation.title}`,
        text: `Check out this food donation: ${donation.title}`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mb-4"></div>
              <p className="text-muted-foreground">Loading donation details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!donation) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-xl border border-border shadow-sm p-12 animate-fade-up text-center">
              <h1 className="text-3xl font-bold text-red-500 mb-4">Donation Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The donation you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/donations" className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Donations
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const isExpired = new Date(donation.expiryDate) < new Date();
  const canReserve = donation.status === 'available' && !isExpired && user?.role === 'orphanage';
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link to="/donations" className="inline-flex items-center text-sage-600 hover:text-sage-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Donations
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate-fade-up">
            {donation.imageUrl && (
              <div className="w-full h-80 relative">
                <img 
                  src={donation.imageUrl} 
                  alt={donation.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    donation.status === 'available' 
                      ? 'bg-green-100 text-green-700' 
                      : donation.status === 'reserved' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">{donation.title}</h1>
                <div className="flex space-x-2">
                  <button
                    onClick={handleShare}
                    className="p-2 text-sage-500 border border-sage-200 rounded-md hover:bg-sage-50"
                    aria-label="Share this donation"
                  >
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                  <div className="prose max-w-none mb-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{donation.description}</p>
                  </div>
                  
                  {donation.additionalNotes && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
                      <p className="text-muted-foreground">{donation.additionalNotes}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Donation Details</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm">
                        <Package className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <span className="block text-muted-foreground">Quantity</span>
                          <span className="font-medium">{donation.quantity}</span>
                        </div>
                      </li>
                      <li className="flex items-center text-sm">
                        <Calendar className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <span className="block text-muted-foreground">Expiry Date</span>
                          <span className={`font-medium ${isExpired ? 'text-red-500' : ''}`}>
                            {formatDate(donation.expiryDate)}
                            {isExpired && ' (Expired)'}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center text-sm">
                        <Clock className="w-5 h-5 mr-3 text-sage-500" />
                        <div>
                          <span className="block text-muted-foreground">Pickup Time</span>
                          <span className="font-medium">
                            {formatTime(donation.pickupTimeStart)} - {formatTime(donation.pickupTimeEnd)}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start text-sm">
                        <MapPin className="w-5 h-5 mr-3 mt-0.5 text-sage-500" />
                        <div>
                          <span className="block text-muted-foreground">Pickup Address</span>
                          <span className="font-medium">{donation.pickupAddress}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Donor Information</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm">
                        <User className="w-5 h-5 mr-3 text-sage-500" />
                        <span>{donation.donorName}</span>
                      </li>
                      {donation.status === 'reserved' && user?.id === donation.reservedBy && (
                        <>
                          <li className="flex items-center text-sm">
                            <Phone className="w-5 h-5 mr-3 text-sage-500" />
                            <a href={`tel:${donation.donorPhone}`} className="text-sage-600 hover:underline">
                              {donation.donorPhone}
                            </a>
                          </li>
                          <li className="flex items-center text-sm">
                            <Mail className="w-5 h-5 mr-3 text-sage-500" />
                            <a href={`mailto:${donation.donorEmail}`} className="text-sage-600 hover:underline">
                              {donation.donorEmail}
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Reservation Section */}
              {donation.status === 'available' && !isExpired ? (
                <div className="border-t border-border pt-6 mt-6">
                  <div className="bg-sage-50 p-6 rounded-lg mb-6">
                    <div className="flex items-start">
                      <HeartHandshake className="w-6 h-6 text-sage-500 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">This donation is available</h3>
                        <p className="text-muted-foreground text-sm">
                          As an orphanage, you can reserve this donation for pickup. 
                          Once reserved, you'll receive contact information to coordinate with the donor.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    {user ? (
                      <>
                        <button
                          onClick={handleReservation}
                          disabled={!canReserve || isReserving}
                          className={`flex-1 py-3 px-6 rounded-md text-white font-medium flex items-center justify-center ${
                            canReserve 
                              ? 'bg-sage-500 hover:bg-sage-600' 
                              : 'bg-gray-300 cursor-not-allowed'
                          }`}
                        >
                          {isReserving ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              Processing...
                            </>
                          ) : (
                            'Reserve This Donation'
                          )}
                        </button>
                        {user.role !== 'orphanage' && (
                          <div className="text-sm text-red-500 mt-2 sm:mt-0 sm:self-center">
                            Only orphanages can reserve donations
                          </div>
                        )}
                        <button
                          className="py-3 px-6 border border-sage-200 rounded-md text-sage-700 hover:bg-sage-50 font-medium flex items-center justify-center"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Contact Donor
                        </button>
                      </>
                    ) : (
                      <Link 
                        to="/auth" 
                        className="flex-1 py-3 px-6 bg-sage-500 rounded-md text-white hover:bg-sage-600 font-medium text-center"
                      >
                        Sign In to Reserve
                      </Link>
                    )}
                  </div>
                </div>
              ) : donation.status === 'reserved' ? (
                <div className="border-t border-border pt-6 mt-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-start">
                      <HeartHandshake className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">
                          {user?.id === donation.reservedBy 
                            ? 'You have reserved this donation' 
                            : `Reserved by ${donation.reservedByName}`}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {user?.id === donation.reservedBy 
                            ? 'Please contact the donor to arrange pickup using the contact information provided.' 
                            : 'This donation has already been reserved by another orphanage.'}
                        </p>
                        
                        {user?.id === donation.reservedBy && (
                          <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <button className="py-2 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 text-sm font-medium">
                              Confirm Pickup
                            </button>
                            <button className="py-2 px-4 border border-red-300 text-red-600 rounded-md hover:bg-red-50 text-sm font-medium">
                              Cancel Reservation
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t border-border pt-6 mt-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <div className="flex items-start">
                      <Calendar className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">This donation has expired</h3>
                        <p className="text-muted-foreground text-sm">
                          The expiration date for this food has passed. Check other available donations.
                        </p>
                        
                        <div className="mt-4">
                          <Link 
                            to="/donations" 
                            className="py-2 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 inline-block text-sm font-medium"
                          >
                            Browse Other Donations
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Similar Donations - Can be implemented later */}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DonationDetail;
