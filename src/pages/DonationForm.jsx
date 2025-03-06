import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PlusCircle, Upload, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DonationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupTimeStart, setPickupTimeStart] = useState('');
  const [pickupTimeEnd, setPickupTimeEnd] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated (demo only)
    const user = localStorage.getItem('foodCallUser');
    if (!user) {
      toast.error('You must be logged in to create a donation');
      navigate('/auth');
    }
  }, [navigate]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Donation created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating donation:', error);
      toast.error('Failed to create donation');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Create a New Donation
            </span>
            <h1 className="text-3xl font-bold mb-2">Share Your Surplus</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below to list your food donation. Please provide accurate details 
              for a smooth pickup process.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground">
                  Donation Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm focus:ring-sage-500 focus:border-sage-500 block w-full sm:text-sm border-border rounded-md"
                    placeholder="e.g., Fresh Bread from Local Bakery"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="shadow-sm focus:ring-sage-500 focus:border-sage-500 block w-full sm:text-sm border-border rounded-md"
                    placeholder="Detailed description of the donation"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-foreground">
                  Quantity
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="shadow-sm focus:ring-sage-500 focus:border-sage-500 block w-full sm:text-sm border-border rounded-md"
                    placeholder="e.g., 20 loaves, 10kg"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground">
                  Expiry Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="shadow-sm focus:ring-sage-500 focus:border-sage-500 block w-full sm:text-sm border-border rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="pickupAddress" className="block text-sm font-medium text-foreground">
                  Pickup Address
                </label>
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    id="pickupAddress"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="shadow-sm focus:ring-sage-500 focus:border-sage-500 block w-full sm:text-sm border-border rounded-md pl-10"
                    placeholder="Full pickup address"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupTimeStart" className="block text-sm font-medium text-foreground">
                    Pickup Time Start
                  </label>
                  <div className="mt-1 relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="time"
                      id="pickupTimeStart"
                      value={pickupTimeStart}
                      onChange={(e) => setPickupTimeStart(e.target.value)}
                      className="shadow-sm focus:ring-sage-500 focus:border-sage-500 block w-full sm:text-sm border-border rounded-md pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="pickupTimeEnd" className="block text-sm font-medium text-foreground">
                    Pickup Time End
                  </label>
                  <div className="mt-1 relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="time"
                      id="pickupTimeEnd"
                      value={pickupTimeEnd}
                      onChange={(e) => setPickupTimeEnd(e.target.value)}
                      className="shadow-sm focus:ring-sage-500 focus:border-sage-500 block w-full sm:text-sm border-border rounded-md pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Image Upload
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {preview ? (
                      <img src={preview} alt="Preview" className="mx-auto h-24 w-24 rounded-md object-cover" />
                    ) : (
                      <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    )}
                    <div className="flex text-sm text-foreground">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-sage-500 hover:text-sage-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500">
                        <span>Upload a file</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-500 hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Create Donation
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DonationForm;
