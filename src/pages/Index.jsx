
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Utensils, 
  CalendarCheck, 
  Clock, 
  Check 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [stats] = useState([
    { number: '500+', label: 'Food Donors', icon: Utensils },
    { number: '150+', label: 'Orphanages', icon: Users },
    { number: '2,000+', label: 'Donations Completed', icon: CalendarCheck },
  ]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 animate__animated animate__fadeIn">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Food Waste Reduction Platform
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Connect Surplus Food with Children in Need
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Food Call connects restaurants, grocery stores, and food businesses with
                orphanages to reduce food waste and help feed children in need.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/donate" 
                  className="btn-primary"
                >
                  Donate Food
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="btn-outline"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="relative animate__animated animate__fadeInRight">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1617391258031-f8d80b22fb37?q=80&w=2070&auto=format&fit=crop" 
                alt="Food distribution" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 bg-sage-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-center space-x-6 animate__animated animate__fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-sage-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl font-bold mb-4">How Food Call Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to donate surplus food to children in need through a simple,
              transparent process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm animate__animated animate__fadeIn">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. List Surplus Food</h3>
              <p className="text-muted-foreground mb-4">
                Food donors list their surplus food, specifying quantity, type, pickup time, and location.
              </p>
              <Link to="/how-it-works" className="text-sage-500 hover:text-sage-600 inline-flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm animate__animated animate__fadeIn" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                <CalendarCheck className="w-6 h-6 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Orphanages Reserve</h3>
              <p className="text-muted-foreground mb-4">
                Orphanages browse available donations and reserve the ones that match their needs.
              </p>
              <Link to="/how-it-works" className="text-sage-500 hover:text-sage-600 inline-flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm animate__animated animate__fadeIn" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Pickup & Confirmation</h3>
              <p className="text-muted-foreground mb-4">
                Orphanages pick up the food at the scheduled time and confirm the successful donation.
              </p>
              <Link to="/how-it-works" className="text-sage-500 hover:text-sage-600 inline-flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Donations Section */}
      <section className="py-16 px-4 bg-sage-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
                Available Now
              </span>
              <h2 className="text-3xl font-bold">Featured Donations</h2>
            </div>
            <Link 
              to="/donations"
              className="mt-4 md:mt-0 text-sage-500 hover:text-sage-600 font-medium inline-flex items-center"
            >
              View all donations <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate__animated animate__fadeIn">
              <div className="h-48">
                <img 
                  src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2532&auto=format&fit=crop" 
                  alt="Fresh bread" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Available
                  </span>
                  <span className="text-xs text-muted-foreground">2 days left</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Fresh Bread from Local Bakery</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Assorted bread including sourdough, white, and whole grain loaves. Baked fresh this morning.
                </p>
                <div className="flex items-center text-sm mb-4">
                  <Clock className="w-4 h-4 mr-2 text-sage-500" />
                  <span>Pickup: 2:00 PM - 5:00 PM</span>
                </div>
                <Link 
                  to="/donations/1" 
                  className="block w-full py-2 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate__animated animate__fadeIn" style={{ animationDelay: "0.1s" }}>
              <div className="h-48">
                <img 
                  src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2670&auto=format&fit=crop" 
                  alt="Rice and Pasta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Available
                  </span>
                  <span className="text-xs text-muted-foreground">1 day left</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Rice and Pasta from Restaurant</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Excess rice and pasta prepared for a catering event. Still in sealed containers and refrigerated.
                </p>
                <div className="flex items-center text-sm mb-4">
                  <Clock className="w-4 h-4 mr-2 text-sage-500" />
                  <span>Pickup: 7:00 PM - 9:00 PM</span>
                </div>
                <Link 
                  to="/donations/2" 
                  className="block w-full py-2 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden animate__animated animate__fadeIn" style={{ animationDelay: "0.2s" }}>
              <div className="h-48">
                <img 
                  src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Fresh Fruits and Vegetables" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Available
                  </span>
                  <span className="text-xs text-muted-foreground">3 days left</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Fresh Fruits and Vegetables</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  Surplus produce from our grocery store including apples, oranges, carrots, and lettuce. All fresh.
                </p>
                <div className="flex items-center text-sm mb-4">
                  <Clock className="w-4 h-4 mr-2 text-sage-500" />
                  <span>Pickup: 10:00 AM - 12:00 PM</span>
                </div>
                <Link 
                  to="/donations/3" 
                  className="block w-full py-2 px-4 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-sage-600 text-white rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16">
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="mb-6 text-sage-100">
                  Join our platform today to help reduce food waste and provide meals for children in orphanages.
                  Whether you're a food business or an orphanage, we have the tools to help you make a positive impact.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/auth" 
                    className="px-6 py-3 bg-white text-sage-700 rounded-md hover:bg-sage-100 transition-colors text-center"
                  >
                    Sign Up Now
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="px-6 py-3 border border-sage-100 text-sage-100 rounded-md hover:bg-sage-700 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Children eating food" 
                  className="absolute inset-0 w-full h-full object-cover"
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

export default Index;
