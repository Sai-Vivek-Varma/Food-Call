
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  MapPin,
  CalendarIcon,
  Package,
  ChevronLeft,
  Phone,
  Mail,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// This would come from your API in a real app
const getDonationById = (id) => {
  // Mock data for demonstration
  return {
    id,
    title: "Fresh Vegetables and Fruits",
    description:
      "Assorted fresh vegetables and fruits including apples, oranges, carrots, and potatoes. All items are fresh and in good condition. Perfect for preparing nutritious meals.",
    quantity: "20kg assorted items",
    category: "Produce",
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    status: "available",
    pickupAddress: "123 Main Street, City Center, Donorsville",
    pickupTimeStart: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    pickupTimeEnd: new Date(Date.now() + 28 * 60 * 60 * 1000), // Tomorrow + 4 hours
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "donor@example.com",
    donorName: "Green Grocers Co.",
    imageUrl:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  };
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DonationDetail = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userJson = localStorage.getItem("foodCallUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Fetch donation data
    setTimeout(() => {
      try {
        const donationData = getDonationById(id);
        setDonation(donationData);
      } catch (error) {
        console.error("Error fetching donation:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // Simulating API delay
  }, [id]);

  const handleReserveDonation = () => {
    if (!user) {
      // Redirect to auth page if not logged in
      window.location.href = "/auth";
      return;
    }

    alert(
      "Donation reserved successfully! Please check your dashboard for pickup details."
    );
    // In a real app, you would make an API call to reserve the donation
  };

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-grow pt-24 pb-16 flex items-center justify-center'>
          <div className='animate-pulse flex flex-col items-center'>
            <div className='h-8 w-64 bg-gray-200 rounded-md mb-4'></div>
            <div className='h-4 w-32 bg-gray-200 rounded-md'></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-grow pt-24 pb-16'>
          <div className='container mx-auto max-w-6xl px-4 text-center'>
            <h1 className='text-2xl font-bold mb-4'>Donation Not Found</h1>
            <p className='mb-6'>
              The donation you're looking for doesn't exist or has been removed.
            </p>
            <Link to='/donations' className='btn-primary'>
              Browse Available Donations
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isExpired = new Date(donation.expiryDate) < new Date();

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-grow pt-24 pb-16'>
        <div className='container mx-auto max-w-6xl px-4'>
          <div className='mb-6'>
            <Link
              to='/donations'
              className='inline-flex items-center text-sage-600 hover:text-sage-700 transition-colors'
            >
              <ChevronLeft className='w-4 h-4 mr-1' />
              Back to Donations
            </Link>
          </div>

          <div className='bg-white rounded-xl overflow-hidden border border-border shadow-sm animate-fade-up'>
            {donation.imageUrl && (
              <div className='relative h-64 md:h-80'>
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className='w-full h-full object-cover'
                />
                <div className='absolute top-4 right-4'>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isExpired
                        ? "bg-red-100 text-red-700"
                        : donation.status === "available"
                        ? "bg-green-100 text-green-700"
                        : donation.status === "reserved"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-sage-100 text-sage-700"
                    }`}
                  >
                    {isExpired && donation.status === "available"
                      ? "Expired"
                      : donation.status.charAt(0).toUpperCase() +
                        donation.status.slice(1)}
                  </span>
                </div>
              </div>
            )}

            <div className='p-6 md:p-8'>
              <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-6'>
                <div>
                  <h1 className='text-2xl md:text-3xl font-bold mb-2'>
                    {donation.title}
                  </h1>
                  <p className='text-muted-foreground'>
                    Posted by {donation.donorName} on{" "}
                    {formatDate(donation.createdAt)}
                  </p>
                </div>
                {!isExpired &&
                  donation.status === "available" &&
                  user &&
                  user.role === "orphanage" && (
                    <button
                      onClick={handleReserveDonation}
                      className='mt-4 md:mt-0 px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors font-medium'
                    >
                      Reserve Donation
                    </button>
                  )}
              </div>

              <div className='grid md:grid-cols-2 gap-8 mb-8'>
                <div>
                  <h2 className='text-xl font-semibold mb-4'>Details</h2>
                  <div className='space-y-4'>
                    <p className='text-foreground'>{donation.description}</p>

                    <div className='flex items-center text-sm'>
                      <Package className='w-5 h-5 mr-3 text-sage-500' />
                      <div>
                        <span className='font-medium'>Quantity: </span>
                        <span>{donation.quantity}</span>
                      </div>
                    </div>

                    <div className='flex items-center text-sm'>
                      <CalendarIcon className='w-5 h-5 mr-3 text-sage-500' />
                      <div>
                        <span className='font-medium'>Expiry Date: </span>
                        <span>{formatDate(donation.expiryDate)}</span>
                      </div>
                    </div>

                    {donation.category && (
                      <div className='mt-4'>
                        <span className='bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm'>
                          {donation.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className='text-xl font-semibold mb-4'>
                    Pickup Information
                  </h2>
                  <div className='bg-sage-50 p-4 rounded-lg space-y-4'>
                    <div className='flex items-start'>
                      <MapPin className='w-5 h-5 mr-3 text-sage-500 mt-0.5' />
                      <div>
                        <span className='font-medium block'>Address:</span>
                        <span>{donation.pickupAddress}</span>
                      </div>
                    </div>

                    <div className='flex items-start'>
                      <Clock className='w-5 h-5 mr-3 text-sage-500 mt-0.5' />
                      <div>
                        <span className='font-medium block'>Pickup Hours:</span>
                        <span>
                          {formatDate(donation.pickupTimeStart)} from{" "}
                          {formatTime(donation.pickupTimeStart)} to{" "}
                          {formatTime(donation.pickupTimeEnd)}
                        </span>
                      </div>
                    </div>

                    <div className='border-t border-sage-200 my-4 pt-4'>
                      <h3 className='font-medium mb-2'>Contact Information:</h3>
                      <div className='space-y-2'>
                        <div className='flex items-center'>
                          <Phone className='w-4 h-4 mr-2 text-sage-500' />
                          <a
                            href={`tel:${donation.contactPhone}`}
                            className='text-sage-600 hover:underline'
                          >
                            {donation.contactPhone}
                          </a>
                        </div>
                        <div className='flex items-center'>
                          <Mail className='w-4 h-4 mr-2 text-sage-500' />
                          <a
                            href={`mailto:${donation.contactEmail}`}
                            className='text-sage-600 hover:underline'
                          >
                            {donation.contactEmail}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isExpired && (
                <div className='bg-red-50 text-red-700 p-4 rounded-lg mb-6'>
                  <p className='font-medium'>
                    This donation has expired and is no longer available.
                  </p>
                </div>
              )}

              {donation.status === "reserved" && (
                <div className='bg-blue-50 text-blue-700 p-4 rounded-lg mb-6'>
                  <p className='font-medium'>
                    This donation has been reserved and is pending pickup.
                  </p>
                </div>
              )}

              {!user && donation.status === "available" && !isExpired && (
                <div className='bg-sage-50 p-6 rounded-lg text-center'>
                  <h3 className='text-lg font-medium mb-2'>
                    Want to reserve this donation?
                  </h3>
                  <p className='mb-4'>
                    You need to be registered as an orphanage to reserve food
                    donations.
                  </p>
                  <Link to='/auth' className='btn-primary'>
                    Sign In / Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationDetail;
