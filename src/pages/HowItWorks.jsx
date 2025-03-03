
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, User, Calendar, ArrowRight, MapPin, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-sage-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-6 animate-fade-in">
              Our Process
            </span>
            <h1 className="font-bold mb-6 animate-fade-up">
              How <span className="text-sage-500">Food Call</span> Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-in" style={{animationDelay: "200ms"}}>
              Our platform makes it easy to connect surplus food with orphanages in need.
              Just follow these simple steps to make a difference.
            </p>
          </div>
        </div>
      </section>
      
      {/* Step-by-Step Process */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 md:order-1">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Step 1
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Create Your Account</h2>
              <p className="text-muted-foreground mb-6">
                Sign up as either a Food Donor or an Orphanage. Food donors can be restaurants, 
                grocery stores, catering services, or anyone with surplus food to share. Orphanages can register 
                to access available donations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Quick, easy registration process</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Verification process for orphanages</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Personalized dashboard based on your role</span>
                </li>
              </ul>
              <Link to="/auth" className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                Create Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1616587226157-48e49175ee20?q=80&w=2070&auto=format&fit=crop" 
                  alt="Creating account" 
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-1">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Listing donation" 
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-2">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Step 2
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">List Your Donation</h2>
              <p className="text-muted-foreground mb-6">
                Food donors can easily create detailed listings for surplus food. Provide information
                about the type of food, quantity, expiration date, and pickup details to help orphanages
                determine if they can use your donation.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Simple form to complete with all necessary details</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Option to upload photos of the food</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Set pickup time windows that work for you</span>
                </li>
              </ul>
              <Link to="/donate" className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                Create Donation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 md:order-1">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Step 3
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse & Reserve Donations</h2>
              <p className="text-muted-foreground mb-6">
                Orphanages can browse all available donations in their area and reserve the ones that
                meet their needs. You'll see real-time availability, detailed information, and pickup instructions.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Search and filter donations by various criteria</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>One-click reservation process</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Get notifications for new donations that match your needs</span>
                </li>
              </ul>
              <Link to="/donations" className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                Browse Donations
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1563807894768-f28bee0d37b6?q=80&w=2070&auto=format&fit=crop" 
                  alt="Browsing donations" 
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-1">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd59a0c3015c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Pickup coordination" 
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-2">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Step 4
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Coordinate Pickup & Complete</h2>
              <p className="text-muted-foreground mb-6">
                Once a donation is reserved, both parties can coordinate the food pickup process through
                our platform. After the successful pickup, mark the donation as completed to track your impact.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>In-app messaging between donor and recipient</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Pickup confirmation system</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-sage-500 mr-3 mt-0.5" />
                  <span>Impact tracking and donation history</span>
                </li>
              </ul>
              <Link to="/dashboard" className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors">
                View Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 bg-sage-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Common Questions
            </span>
            <h2 className="font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find answers to the most common questions about using Food Call.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-2">Is there a cost to use Food Call?</h3>
              <p className="text-muted-foreground">
                No, Food Call is completely free for both food donors and orphanages. We're a nonprofit 
                platform dedicated to reducing food waste and helping those in need.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-2">What types of food can be donated?</h3>
              <p className="text-muted-foreground">
                Any type of edible, unexpired food can be donated. This includes prepared meals, fresh produce, 
                baked goods, canned foods, and packaged items. All food must meet local health and safety guidelines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-2">How is food safety ensured?</h3>
              <p className="text-muted-foreground">
                Donors are required to follow food safety guidelines and provide accurate information about 
                the food being donated, including preparation date and proper storage. Orphanages are encouraged 
                to inspect all donations upon pickup.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-2">Can individuals donate food?</h3>
              <p className="text-muted-foreground">
                Yes! While we work with many restaurants and grocery stores, individuals can also donate 
                surplus food. All donors must create an account and follow our guidelines for food safety.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/faq" className="inline-flex items-center px-6 py-3 border border-sage-200 text-sage-700 rounded-md hover:bg-sage-50 transition-colors">
              View All FAQs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-sage-500 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Join Food Call?
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Whether you're looking to donate food or access donations for your orphanage,
                  our platform makes it simple to get started. Join our community today!
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/auth" className="bg-white text-sage-500 px-6 py-3 rounded-md hover:bg-white/90 transition-all duration-300 font-medium text-center">
                    Create an Account
                  </Link>
                  <Link to="/contact" className="border border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-all duration-300 font-medium text-center">
                    Contact Support
                  </Link>
                </div>
              </div>
              
              <div className="relative h-60 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Happy children" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
