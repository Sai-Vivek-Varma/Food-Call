
import { Link } from 'react-router-dom';
import { CheckCircle, Coffee, Utensils, Truck, Heart, Users, Clock, Package, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-sage-50">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            How FoodCall Works
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Our platform connects food donors with orphanages in a simple, efficient process.
            Here's everything you need to know to get started.
          </p>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The FoodCall Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We've designed FoodCall to be straightforward for both donors and recipients.
              Here's how donations flow from surplus to those who need it.
            </p>
          </div>
          
          <div className="relative">
            {/* Process Steps */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-sage-100 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mx-auto mb-4">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">List Donation</h3>
                <p className="text-gray-600">
                  Donors list their surplus food with details about quantity, pickup times, and expiry date.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mx-auto mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Reserve Food</h3>
                <p className="text-gray-600">
                  Orphanages browse available donations and reserve what they need for their facility.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mx-auto mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Coordinate Pickup</h3>
                <p className="text-gray-600">
                  Both parties connect to arrange the pickup or delivery of the food donation.
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mx-auto mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Complete Donation</h3>
                <p className="text-gray-600">
                  The donation is marked as completed once it's been successfully transferred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Donors Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">For Food Donors</h2>
              <p className="text-gray-600 mb-8">
                Whether you're a restaurant with surplus meals, a caterer with event leftovers, or a grocery store with excess stock, FoodCall helps you connect your food surplus with orphanages in need.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-sage-100 rounded-full p-1 mr-4 shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Reduce Food Waste</h3>
                    <p className="text-gray-600">
                      Instead of throwing away good food, give it purpose by donating it to those who need it.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-sage-100 rounded-full p-1 mr-4 shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Simple Process</h3>
                    <p className="text-gray-600">
                      Our platform makes it easy to list donations and connect with local orphanages.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-sage-100 rounded-full p-1 mr-4 shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Make a Difference</h3>
                    <p className="text-gray-600">
                      Your donation directly impacts the lives of children in need in your community.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/auth" className="btn-primary">
                  Sign Up as a Donor
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop" 
                alt="Restaurant chef preparing food" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* For Orphanages Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -bottom-6 -left-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                alt="Children at an orphanage" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">For Orphanages</h2>
              <p className="text-gray-600 mb-8">
                FoodCall connects your orphanage with generous food donors in your community, helping you access nutritious meals for the children in your care.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-sage-100 rounded-full p-1 mr-4 shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Access Quality Food</h3>
                    <p className="text-gray-600">
                      Receive high-quality, nutritious food donations from restaurants, caterers, and food businesses.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-sage-100 rounded-full p-1 mr-4 shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Reduce Food Costs</h3>
                    <p className="text-gray-600">
                      Decrease your food budget by accessing surplus food that would otherwise go to waste.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-sage-100 rounded-full p-1 mr-4 shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Build Community Connections</h3>
                    <p className="text-gray-600">
                      Create meaningful relationships with local businesses and donors who care about your cause.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/auth" className="btn-primary">
                  Sign Up as an Orphanage
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about how FoodCall works? Find answers to common questions below.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-border shadow-sm divide-y">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">What types of food can be donated?</h3>
              <p className="text-gray-600">
                Most prepared foods, packaged foods, and fresh produce can be donated. The food should be unused, unexpired, and handled according to food safety guidelines. It's important that all donated food is in good condition and safe for consumption.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">How is food safety ensured?</h3>
              <p className="text-gray-600">
                Donors are required to provide information about the food's preparation, storage, and expiry date. Recipients should check the food upon receipt to ensure quality. All users agree to follow proper food handling guidelines when using our platform.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Who handles transportation of donated food?</h3>
              <p className="text-gray-600">
                Typically, the recipient orphanage arranges pickup of the donated food. However, some donors may offer delivery. The logistics are arranged between the donor and recipient after a reservation is made.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Is there a cost to use FoodCall?</h3>
              <p className="text-gray-600">
                FoodCall is completely free for both donors and orphanages. Our mission is to reduce food waste and help those in need, so we don't charge any fees for using our platform.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">How are orphanages verified?</h3>
              <p className="text-gray-600">
                We verify all orphanages on our platform to ensure they are legitimate organizations. This includes checking registration documents and conducting basic background research before approving accounts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-sage-500 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Whether you're looking to donate surplus food or access donations for your orphanage, FoodCall makes it easy to connect and make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth" className="px-6 py-3 bg-white text-sage-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
              Create an Account
            </Link>
            <Link to="/donations" className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-sage-600 transition-colors">
              Browse Available Donations
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
