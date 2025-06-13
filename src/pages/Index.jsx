
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Package, Sparkles, Target, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-100/20 to-transparent"></div>
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Reducing Food Waste • Feeding Communities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-sage-800 mb-8 leading-tight">
              <span className="text-sage-600">Food</span>Call
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Bridge the gap between surplus food and hungry communities. Connect donors with orphanages 
              to create a sustainable ecosystem of care and compassion.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/auth"
                className="px-10 py-4 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Journey <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
              <Link
                to="/how-it-works"
                className="px-10 py-4 border-2 border-sage-600 text-sage-700 rounded-xl hover:bg-sage-50 transition-all duration-300 font-semibold text-lg"
              >
                Learn How It Works
              </Link>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-sage-200 to-sage-300 rounded-2xl opacity-30 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                alt="Food donation making a difference" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sage-800">How FoodCall Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to transform surplus food into community support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group">
              <div className="bg-gradient-to-br from-sage-50 to-white p-8 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:border-sage-300">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-sage-800">Share Surplus Food</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Restaurants, events, and individuals list their excess food with detailed information, 
                  ensuring nothing goes to waste.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-sage-50 to-white p-8 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:border-sage-300">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-sage-800">Connect Communities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Orphanages and care facilities browse available donations and reserve 
                  items that perfectly match their needs.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-sage-50 to-white p-8 rounded-2xl border-2 border-sage-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center group-hover:border-sage-300">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-sage-800">Create Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every donation creates a ripple effect of positive change, 
                  reducing waste while nourishing communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-sage-600 to-sage-700 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Creating Real Impact</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Together, we're building a movement that transforms communities one meal at a time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">5,000+</div>
              <div className="text-lg opacity-90">Meals Shared</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">150+</div>
              <div className="text-lg opacity-90">Partner Organizations</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-lg opacity-90">Active Donors</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-lg opacity-90">Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-sage-50 to-white">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-sage-200">
            <Target className="w-16 h-16 text-sage-600 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-sage-800">Ready to Make a Difference?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of changemakers who are already using FoodCall to create positive impact. 
              Whether you're sharing surplus food or helping feed communities, every action matters.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-sage-600 to-sage-700 text-white text-xl font-semibold rounded-xl hover:from-sage-700 hover:to-sage-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Join FoodCall Today <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
