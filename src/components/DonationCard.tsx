
import { Clock, MapPin, CalendarIcon, Package, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Donation } from '@/lib/types';

interface DonationCardProps {
  donation: Donation;
  isOrphanage?: boolean;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const DonationCard = ({ donation, isOrphanage = false }: DonationCardProps) => {
  const isExpired = new Date(donation.expiryDate) < new Date();
  const statusClasses = {
    available: 'bg-success text-white',
    reserved: 'bg-primary text-white',
    completed: 'bg-sage-500 text-white',
    expired: 'bg-danger text-white',
  };

  return (
    <div className={`card border-0 shadow-sm h-100 ${isExpired && donation.status !== 'completed' ? 'opacity-75' : ''}`}>
      {donation.imageUrl && (
        <div className="position-relative">
          <img 
            src={donation.imageUrl} 
            alt={donation.title} 
            className="card-img-top"
            style={{height: "200px", objectFit: "cover"}}
          />
          <div className="position-absolute top-0 end-0 m-3">
            <span className={`badge ${statusClasses[donation.status]}`}>
              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
            </span>
          </div>
        </div>
      )}

      <div className="card-body d-flex flex-column">
        {!donation.imageUrl && (
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <span className={`badge ${statusClasses[donation.status]}`}>
              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
            </span>
          </div>
        )}
        
        <h5 className="card-title fw-bold text-truncate">{donation.title}</h5>
        
        <p className="card-text text-muted small mb-3" style={{display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"}}>
          {donation.description}
        </p>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2 small">
            <Package size={16} className="text-sage-500 me-2" />
            <span>{donation.quantity}</span>
          </div>
          
          <div className="d-flex align-items-center mb-2 small">
            <CalendarIcon size={16} className="text-sage-500 me-2" />
            <span>Expires: {formatDate(donation.expiryDate)}</span>
          </div>
          
          <div className="d-flex align-items-center mb-2 small">
            <MapPin size={16} className="text-sage-500 me-2" />
            <span className="text-truncate">{donation.pickupAddress}</span>
          </div>
          
          <div className="d-flex align-items-center small">
            <Clock size={16} className="text-sage-500 me-2" />
            <span>
              Pickup: {formatTime(donation.pickupTimeStart)} - {formatTime(donation.pickupTimeEnd)}
            </span>
          </div>
        </div>
        
        <div className="pt-3 border-top mt-auto">
          {isOrphanage && donation.status === 'available' ? (
            <button className="btn btn-sage w-100">
              Reserve Donation
            </button>
          ) : donation.status === 'reserved' ? (
            <div>
              <p className="small text-muted mb-2">
                {isOrphanage 
                  ? 'You have reserved this donation.' 
                  : `Reserved by: ${donation.reservedByName}`}
              </p>
              <div className="d-flex gap-2">
                <button className="btn btn-sage flex-grow-1 py-1">
                  {isOrphanage ? 'Confirm Pickup' : 'Mark as Completed'}
                </button>
                <button className="btn btn-outline-danger py-1">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <Link to={`/donations/${donation.id}`} className="btn btn-outline-secondary w-100">
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
