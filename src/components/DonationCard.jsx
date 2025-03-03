
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const DonationCard = ({ donation, isOrphanage }) => {
  const isExpired = new Date(donation.expiryDate) < new Date();
  const isAvailable = donation.status === 'available' && !isExpired;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-border shadow-sm card-hover animate-fade-up">
      {donation.imageUrl && (
        <div className="h-48 relative">
          <img
            src={donation.imageUrl}
            alt={donation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isExpired && donation.status === 'available'
                  ? 'bg-red-100 text-red-700'
                  : donation.status === 'available'
                  ? 'bg-green-100 text-green-700'
                  : donation.status === 'reserved'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-sage-100 text-sage-700'
              }`}
            >
              {isExpired && donation.status === 'available'
                ? 'Expired'
                : donation.status.charAt(0).toUpperCase() +
                  donation.status.slice(1)}
            </span>
          </div>
        </div>
      )}

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{donation.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
          {donation.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-sage-500" />
            <span>
              Expires: <span className="font-medium">{formatDate(donation.expiryDate)}</span>
            </span>
          </div>

          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-sage-500" />
            <span className="truncate">{donation.pickupAddress}</span>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-sage-500" />
            <span>
              Pickup: {formatTime(donation.pickupTimeStart)} - {formatTime(donation.pickupTimeEnd)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-sm font-medium text-sage-700">
            By {donation.donorName}
          </div>
          <Link
            to={`/donations/${donation.id}`}
            className="inline-flex items-center text-sage-600 hover:text-sage-700 transition-colors text-sm font-medium"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
