
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Package, Sparkles, Target, Globe, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-100/30 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-8 border border-sage-200 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Reducing Food Waste • Feeding Communities
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-sage-800 mb-8 leading-tight">
              <span className="text-sage-600">Food</span>Call
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed px-4">
              Bridge the gap between surplus food and hungry communities. Connect donors with orphanages 
              to create a sustainable ecosystem of care and compassion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/auth"
                className="group inline-flex items-center px-10 py-5 bg-sage-600 text-white rounded-2xl hover:bg-sage-700 transition-all duration-300 font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[240px] justify-center"
              >
                Start Your Journey 
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="group inline-flex items-center px-10 py-5 border-2 border-sage-600 text-sage-700 rounded-2xl hover:bg-sage-50 transition-all duration-300 font-semibold text-xl min-w-[240px] justify-center"
              >
                Learn How It Works
                <Target className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-sage-200 to-sage-300 rounded-3xl opacity-30 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                alt="Food donation making a difference" 
                className="relative rounded-3xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sage-800">How FoodCall Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform surplus food into community support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-sage-50 to-white p-10 rounded-3xl border-2 border-sage-100 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-sage-300 h-full group-hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-sage-800">Share Surplus Food</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Restaurants, events, and individuals list their excess food with detailed information, 
                  ensuring nothing goes to waste.
                </p>
              </div>
            </div>

            <div className="group text-center">
              <div className="bg-gradient-to-br from-sage-50 to-white p-10 rounded-3xl border-2 border-sage-100 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-sage-300 h-full group-hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-sage-800">Connect Communities</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Orphanages and care facilities browse available donations and reserve 
                  items that perfectly match their needs.
                </p>
              </div>
            </div>

            <div className="group text-center">
              <div className="bg-gradient-to-br from-sage-50 to-white p-10 rounded-3xl border-2 border-sage-100 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-sage-300 h-full group-hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-sage-800">Create Impact</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Every donation creates a ripple effect of positive change, 
                  reducing waste while nourishing communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-sage-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sage-800">Why Choose FoodCall?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with care to make food sharing simple, safe, and impactful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="font-bold mb-4 text-sage-800 text-lg">Verified Partners</h3>
              <p className="text-gray-600 leading-relaxed">All organizations are verified for safety and reliability</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="font-bold mb-4 text-sage-800 text-lg">Real-time Updates</h3>
              <p className="text-gray-600 leading-relaxed">Live notifications for donations and reservations</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="font-bold mb-4 text-sage-800 text-lg">Easy Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Monitor your donations and their impact effortlessly</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="font-bold mb-4 text-sage-800 text-lg">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">Built by the community, for the community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-sage-600 to-sage-700 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Creating Real Impact</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Together, we're building a movement that transforms communities one meal at a time
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">5,000+</div>
              <div className="text-xl opacity-90">Meals Shared</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">150+</div>
              <div className="text-xl opacity-90">Partner Organizations</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-xl opacity-90">Active Donors</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-xl opacity-90">Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-sage-50 to-white">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-sage-200">
            <div className="w-20 h-20 bg-sage-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Target className="w-10 h-10 text-sage-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sage-800">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of changemakers who are already using FoodCall to create positive impact. 
              Whether you're sharing surplus food or helping feed communities, every action matters.
            </p>
            <Link
              to="/auth"
              className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-sage-600 to-sage-700 text-white text-xl font-semibold rounded-2xl hover:from-sage-700 hover:to-sage-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Join FoodCall Today 
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
