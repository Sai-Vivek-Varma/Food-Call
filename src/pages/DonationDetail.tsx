import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Donation } from "@/lib/types";

const DonationDetail: React.FC = () => {
  // Extract the donation id from the URL parameters.
  const { id } = useParams<{ id: string }>();

  // Local state for the donation details and loading status.
  const [donation, setDonation] = useState<Donation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Function to fetch donation details from the backend.
    const fetchDonation = async () => {
      try {
        // Make a GET request to your backend. This endpoint is public.
        const response = await axios.get<Donation>(
          `https://food-call.onrender.com/api/donations/${id}`
        );
        setDonation(response.data);
      } catch (error: any) {
        console.error("Error fetching donation details:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch donation details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    // If an id is provided, fetch the donation details.
    if (id) {
      fetchDonation();
    }
  }, [id]);

  // While loading, display a loading message.
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <p>Loading donation details...</p>
      </div>
    );
  }

  // If no donation was found, display an error message.
  if (!donation) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <p>Donation not found.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-4'>
      <div className='container mx-auto max-w-4xl'>
        {/* Back link */}
        <Link to='/dashboard' className='text-sage-500 hover:underline'>
          &larr; Back to Dashboard
        </Link>

        {/* Donation Title */}
        <h1 className='text-3xl font-bold mt-4'>{donation.title}</h1>

        {/* Donation Image */}
        {donation.imageUrl && (
          <img
            src={donation.imageUrl}
            alt={donation.title}
            className='w-full h-64 object-cover rounded-md my-4'
          />
        )}

        {/* Donation Description */}
        <p className='text-lg text-gray-700'>{donation.description}</p>

        {/* Donation Quantity */}
        <div className='mt-4'>
          <p className='font-semibold'>Quantity:</p>
          <p>{donation.quantity}</p>
        </div>

        {/* Expiry Date */}
        <div className='mt-4'>
          <p className='font-semibold'>Expiry Date:</p>
          <p>{new Date(donation.expiryDate).toLocaleDateString()}</p>
        </div>

        {/* Pickup Address */}
        <div className='mt-4'>
          <p className='font-semibold'>Pickup Address:</p>
          <p>{donation.pickupAddress}</p>
        </div>

        {/* Pickup Time */}
        <div className='mt-4'>
          <p className='font-semibold'>Pickup Time:</p>
          <p>
            {new Date(donation.pickupTimeStart).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(donation.pickupTimeEnd).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Donation Status */}
        <div className='mt-4'>
          <p className='font-semibold'>Status:</p>
          <p>{donation.status}</p>
        </div>

        {/* Donor Name */}
        <div className='mt-4'>
          <p className='font-semibold'>Donor Name:</p>
          <p>{donation.donorName}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
