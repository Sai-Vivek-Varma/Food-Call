
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Clock, BadgeCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:pt-40 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Connecting Surplus Food to
                <span className="text-sage-500"> Hungry Hearts</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                FoodCall helps donors share excess food with orphanages, reducing waste and making a difference in children's lives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donate" className="btn-primary">
                  Donate Food
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Link>
                <Link to="/how-it-works" className="btn-outline">
                  How It Works
                </Link>
              </div>
            </div>
            <div className="flex-1 relative animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute -top-4 -right-4 w-full h-full rounded-xl bg-sage-100 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                alt="Food donation" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-sage-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">How FoodCall Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform connects food donors with orphanages in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                <Utensils className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. List Your Donation</h3>
              <p className="text-gray-600">
                Sign up and list your surplus food, including quantity, expiry date, and pickup details.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Get Connected</h3>
              <p className="text-gray-600">
                Nearby orphanages receive notification and can reserve your food donation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                <BadgeCheck className="w-6 h-6 text-sage-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Complete the Donation</h3>
              <p className="text-gray-600">
                Coordinate pickup or delivery. Confirm when the donation is completed.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stories from Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from donors and orphanages who have made a difference together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                    alt="Donor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Restaurant Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "FoodCall has transformed how we handle excess food. Instead of throwing away perfectly good meals, we now connect with orphanages who can use them. It's simple, efficient, and makes us feel good about reducing waste."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                    alt="Recipient" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Michael Okonkwo</h4>
                  <p className="text-sm text-gray-500">Orphanage Director</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Our orphanage has limited resources, and food is a significant expense. Through FoodCall, we've been able to access quality meals for our children regularly. The platform is incredibly easy to use, and the donors are amazing."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-sage-500 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Whether you're a food business with extras or an orphanage in need, join our community today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth" className="px-6 py-3 bg-white text-sage-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
              Sign Up Now
            </Link>
            <Link to="/how-it-works" className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-sage-600 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
