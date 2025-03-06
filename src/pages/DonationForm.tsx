import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Package, Upload, Calendar, Clock, MapPin, Info, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface DonationFormData {
  title: string;
  description: string;
  quantity: string;
  expiryDate: string;
  pickupAddress: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  image?: File;
}

const DonationForm = () => {
  const [formData, setFormData] = useState<DonationFormData>({
    title: '',
    description: '',
    quantity: '',
    expiryDate: '',
    pickupAddress: '',
    pickupTimeStart: '',
    pickupTimeEnd: '',
  });
  const [errors, setErrors] = useState<Partial<DonationFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const user = localStorage.getItem('foodShareUser');
    if (!user) {
      toast.error('You must be logged in to create a donation');
      navigate('/auth');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof DonationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<DonationFormData> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.pickupAddress) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.pickupTimeStart) newErrors.pickupTimeStart = 'Pickup start time is required';
    if (!formData.pickupTimeEnd) newErrors.pickupTimeEnd = 'Pickup end time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Combine time string with today's date to create a valid ISO date string.
  const combineTimeWithToday = (timeString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return new Date(`${today}T${timeString}:00Z`).toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const submissionData = {
        title: formData.title,
        description: formData.description,
        quantity: formData.quantity,
        expiryDate: new Date(formData.expiryDate).toISOString(),
        pickupAddress: formData.pickupAddress,
        pickupTimeStart: combineTimeWithToday(formData.pickupTimeStart),
        pickupTimeEnd: combineTimeWithToday(formData.pickupTimeEnd),
        imageUrl: imagePreview || ''
      };

      const response = await axios.post('http://localhost:5000/api/donations', submissionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('foodShareToken')}`
        }
      });

      console.log('Donation data submitted:', response.data);
      toast.success('Donation created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Failed to create donation:', error.response?.data || error.message);
      toast.error('Failed to create donation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Create Donation
            </span>
            <h1 className="text-3xl font-bold mb-2">Share Your Surplus Food</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Provide details about the food you'd like to donate. Be as specific as possible to help orphanages determine if they can use your donation.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-8 animate-fade-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields for title, description, quantity, expiry date, pickup address, pickup times, image */}
              {/* ... (Use your existing JSX for the form fields) */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button type="button" onClick={() => navigate(-1)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? 'Creating Donation...' : 'Create Donation'}
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
