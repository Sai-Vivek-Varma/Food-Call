
import { ArrowRight, Package, Users, Heart, CheckCircle, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-sage-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-sage-700 mb-6">
            How <span className="text-sage-500">FoodCall</span> Works
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our simple three-step process connects surplus food with orphanages, 
            making food donation effortless and impactful.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-3 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors font-medium"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
                <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                For Food Donors
              </div>
              <h2 className="text-3xl font-bold mb-6">List Your Surplus Food</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Restaurants, events, and individuals can easily create listings for surplus food. 
                Simply provide details about the food type, quantity, pickup location, and available time slots.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-sage-500" />
                  <span>Quick and easy listing process</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-sage-500" />
                  <span>Upload photos to showcase your donation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-sage-500" />
                  <span>Set flexible pickup times</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop" 
                  alt="Food preparation" 
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-sage-500" />
                    <div>
                      <div className="font-semibold">Easy Listing</div>
                      <div className="text-sm text-gray-500">3 minutes setup</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop" 
                  alt="Children receiving food" 
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-sage-500" />
                    <div>
                      <div className="font-semibold">Smart Matching</div>
                      <div className="text-sm text-gray-500">Instant notifications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                For Orphanages
              </div>
              <h2 className="text-3xl font-bold mb-6">Browse & Reserve Donations</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Orphanages can browse available food donations, filter by location and food type, 
                and reserve items that meet their needs with just a few clicks.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>Real-time availability updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>Filter by location and food type</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>Instant reservation confirmation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
                Coordination & Impact
              </div>
              <h2 className="text-3xl font-bold mb-6">Coordinate & Complete</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Both parties coordinate the pickup through our platform. The food gets delivered to those who need it, 
                and everyone can track the positive impact they've made.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span>Seamless coordination tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span>Track your impact and contributions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span>Community feedback and ratings</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Food delivery" 
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-purple-500" />
                    <div>
                      <div className="font-semibold">Real Impact</div>
                      <div className="text-sm text-gray-500">Lives changed daily</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FoodCall?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with safety, efficiency, and impact in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Safety First</h3>
              <p className="text-gray-600">
                Rigorous verification process ensures food safety standards and donor authenticity.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
              <p className="text-gray-600">
                Instant notifications and updates keep everyone informed throughout the process.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Measurable Impact</h3>
              <p className="text-gray-600">
                Track the difference you're making with detailed analytics and community feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Making a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community today and help us create a world where no food goes to waste 
            and no child goes hungry.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-sage-500 text-white rounded-xl font-semibold hover:bg-sage-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Join FoodCall Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
