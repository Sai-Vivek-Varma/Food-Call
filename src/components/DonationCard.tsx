
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Package, Clock } from 'lucide-react';
import { Donation } from '@/lib/types';
import { format } from 'date-fns';

interface DonationCardProps {
  donation: Donation;
  onReserve?: (id: string) => void;
  isOrphanage?: boolean;
}

const DonationCard = ({ donation, onReserve, isOrphanage = false }: DonationCardProps) => {
  const [isReserving, setIsReserving] = useState(false);
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/donations/${donation.id}`);
  };
  
  const handleReserve = async () => {
    if (!onReserve) return;
    
    setIsReserving(true);
    try {
      await onReserve(donation.id);
    } catch (error) {
      console.error('Failed to reserve donation', error);
      // Show error toast
    } finally {
      setIsReserving(false);
    }
  };
  
  // Format dates for display
  const formattedExpiryDate = format(new Date(donation.expiryDate), 'MMM dd, yyyy');
  const formattedPickupStart = format(new Date(donation.pickupTimeStart), 'h:mm a');
  const formattedPickupEnd = format(new Date(donation.pickupTimeEnd), 'h:mm a');
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden card-hover border border-border h-full flex flex-col">
      {donation.imageUrl ? (
        <div className="h-48 overflow-hidden">
          <img 
            src={donation.imageUrl} 
            alt={donation.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      ) : (
        <div className="h-48 bg-sage-100 flex items-center justify-center">
          <Package className="h-16 w-16 text-sage-300" />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            donation.status === 'available' ? 'bg-green-100 text-green-800' :
            donation.status === 'reserved' ? 'bg-orange-100 text-orange-800' :
            donation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
          </span>
        </div>
        
        <h3 className="text-xl font-medium mb-2">{donation.title}</h3>
        
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {donation.description}
        </p>
        
        <div className="space-y-3 mt-auto">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{donation.pickupAddress}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Expires: {formattedExpiryDate}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Pickup: {formattedPickupStart} - {formattedPickupEnd}</span>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button 
            onClick={handleViewDetails}
            className="btn-outline text-center flex-1"
          >
            View Details
          </button>
          
          {isOrphanage && donation.status === 'available' && (
            <button 
              onClick={handleReserve}
              disabled={isReserving}
              className="btn-primary text-center flex-1"
            >
              {isReserving ? 'Reserving...' : 'Reserve'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
