
import { useState, useEffect } from 'react';
import { CheckCircle, ListTodo, UserCog, Building, UserCheck, PlayCircle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  useEffect(() => {
    // Add scroll-to-top when the page loads
    window.scrollTo(0, 0);
  }, []);

  const donorSteps = [
    {
      title: 'Create an Account',
      description: 'Register as a food donor by providing your organization details and contact information.',
      icon: UserCog,
    },
    {
      title: 'Add Donation Details',
      description: 'Fill in all the necessary information about your surplus food, including quantity, expiry date, and pickup instructions.',
      icon: ListTodo,
    },
    {
      title: 'Schedule Pickup',
      description: 'Set a convenient time window when orphanages can come to collect the food donation.',
      icon: Clock,
    },
    {
      title: 'Complete Donation',
      description: 'Meet the orphanage representative at the scheduled time and mark the donation as completed.',
      icon: CheckCircle,
    },
  ];

  const orphanageSteps = [
    {
      title: 'Register Your Orphanage',
      description: 'Create an account and verify your orphanage details to gain access to available donations.',
      icon: Building,
    },
    {
      title: 'Browse Available Donations',
      description: 'View all active food donations in your area and filter by location, food type, or pickup time.',
      icon: ListTodo,
    },
    {
      title: 'Reserve Food Donations',
      description: 'Reserve the donations that meet your needs and coordinate pickup with the donor.',
      icon: UserCheck,
    },
    {
      title: 'Collect and Confirm',
      description: 'Collect the food at the scheduled time and confirm the successful pickup in the app.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4 animate__animated animate__fadeIn">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Our Process
            </span>
            <h1 className="text-4xl font-bold mb-4">How Food Call Works</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Food Call connects food donors with orphanages to reduce food waste and help feed children in need.
              Our platform makes it easy to donate and receive surplus food.
            </p>
            <div className="flex justify-center">
              <button className="flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Video Tutorial
              </button>
            </div>
          </div>
          
          {/* For Donors Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">For Food Donors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {donorSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl border border-border shadow-sm p-6 transition-transform hover:-translate-y-1 animate__animated animate__fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 flex items-center justify-center bg-sage-100 text-sage-600 rounded-full mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* For Orphanages Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">For Orphanages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {orphanageSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl border border-border shadow-sm p-6 transition-transform hover:-translate-y-1 animate__animated animate__fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 flex items-center justify-center bg-sage-100 text-sage-600 rounded-full mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 transition-all hover:border-sage-500 animate__animated animate__fadeIn">
                <h3 className="text-xl font-semibold mb-3">What types of food can be donated?</h3>
                <p className="text-muted-foreground">
                  Any edible surplus food that is still safe to consume can be donated. This includes fresh produce, baked goods, dairy products with valid expiry dates, canned foods, and prepared meals that have been properly stored.
                </p>
              </div>
              
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 transition-all hover:border-sage-500 animate__animated animate__fadeIn" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-semibold mb-3">How is food safety ensured?</h3>
                <p className="text-muted-foreground">
                  Donors are required to follow proper food handling and storage guidelines. All donations must include accurate expiry information, and orphanages are encouraged to inspect food upon pickup to ensure quality and safety.
                </p>
              </div>
              
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 transition-all hover:border-sage-500 animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-semibold mb-3">Is there a minimum donation amount?</h3>
                <p className="text-muted-foreground">
                  No, there's no minimum requirement. Whether you have a small amount of surplus food or a large quantity, all donations are welcome as they all contribute to reducing food waste and helping those in need.
                </p>
              </div>
              
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 transition-all hover:border-sage-500 animate__animated animate__fadeIn" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-semibold mb-3">How can I verify an orphanage's authenticity?</h3>
                <p className="text-muted-foreground">
                  All orphanages on our platform undergo a verification process before being approved. Donors can view orphanage profiles, which include official registration information, contact details, and ratings from previous donations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-sage-50 rounded-2xl p-10 text-center animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our community of food donors and orphanages working together to reduce food waste and feed children in need.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                Register as a Donor
              </button>
              <button className="px-6 py-3 border border-sage-500 text-sage-700 rounded-md hover:bg-sage-100 transition-colors">
                Register as an Orphanage
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
