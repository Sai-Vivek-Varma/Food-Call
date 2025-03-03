
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PackageOpen, Users, Clock, CheckCircle, HeartHandshake } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-28 pb-20 px-4 md:pt-40 md:pb-32 bg-gradient-to-br from-sage-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-6">
                  Connecting Food Donors with Orphanages
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Reduce Food Waste, Feed <span className="text-sage-600">Hearts</span> in Need
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                  Food Call connects food donors with orphanages to eliminate food waste and ensure no child goes hungry. Start making a difference today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/donate" className="btn-primary">
                    Donate Food
                  </Link>
                  <Link to="/how-it-works" className="btn-outline">
                    How It Works
                  </Link>
                </div>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <img 
                  src="https://images.unsplash.com/photo-1581087247366-83f19a7ecf6e?q=80&w=2940&auto=format&fit=crop" 
                  alt="Children with food donation" 
                  className="rounded-2xl shadow-lg aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-md border border-sage-100 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium text-sm">Impact Stats</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">We've helped deliver:</p>
                  <p className="text-2xl font-bold text-sage-600">10,000+</p>
                  <p className="text-sm font-medium">Meals to children</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Food Call Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it easy to connect food donors with orphanages in need through a simple three-step process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border animate-fade-up">
                <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <PackageOpen className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Donors List Food</h3>
                <p className="text-muted-foreground text-center">
                  Restaurants, grocery stores, and individuals list their surplus food with details on quantity and pickup.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Orphanages Reserve</h3>
                <p className="text-muted-foreground text-center">
                  Orphanages browse available donations and reserve the food that meets their needs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Schedule Pickup</h3>
                <p className="text-muted-foreground text-center">
                  Donors and orphanages coordinate for food pickup, keeping the process simple and efficient.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/how-it-works" className="inline-flex items-center text-sage-600 hover:text-sage-700 font-medium">
                Learn more about how it works
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 px-4 bg-sage-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join Food Call?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers significant benefits to both food donors and orphanages.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-border animate-fade-up">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <HeartHandshake className="w-6 h-6 mr-2 text-sage-500" />
                  For Food Donors
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Reduce Food Waste</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Donate surplus food that would otherwise go to waste, reducing environmental impact.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Simple Process</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        List donations quickly and easily with a straightforward interface.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Make a Difference</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Help feed children in need and support local orphanages in your community.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/auth" className="btn-primary">
                    Register as a Donor
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-border animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-sage-500" />
                  For Orphanages
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Access to Free Food</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Receive quality food donations at no cost, helping to feed children in your care.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Browse Available Options</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        View and select donations that best match your specific needs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span>
                    <div>
                      <p className="font-medium">Community Connection</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Build relationships with local food donors and businesses in your area.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/auth" className="btn-primary">
                    Register as an Orphanage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-sage-50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join our community today and help reduce food waste while supporting children in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/donate" className="btn-primary">
                  Donate Food
                </Link>
                <Link to="/donations" className="btn-outline">
                  Browse Donations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
