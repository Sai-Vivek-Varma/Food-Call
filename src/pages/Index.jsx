
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package, User, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  // Add scroll-to-top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 bg-gradient-to-b from-sage-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 text-center md:text-left">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-6 animate-fade-in">
                Reducing Waste. Fighting Hunger.
              </span>
              <h1 className="mb-6 animate-fade-up">
                Connect Surplus Food with <span className="text-sage-500">Those in Need</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 animate-slide-in" style={{animationDelay: "200ms"}}>
                Our platform connects food donors with orphanages to reduce food waste and 
                ensure no child goes hungry. Simple, efficient, and impactful.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-up" style={{animationDelay: "400ms"}}>
                <Link to="/auth" className="btn-primary">
                  Get Started
                </Link>
                <Link to="/how-it-works" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in" style={{animationDelay: "300ms"}}>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1541802645635-11f2286a7482?q=80&w=2070&auto=format&fit=crop" 
                  alt="Food donation" 
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground font-medium text-sm mb-4">
              Simple Process
            </span>
            <h2 className="font-bold mb-6">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to connect surplus food with orphanages in need.
              Just three simple steps to make a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl border border-border flex flex-col items-center text-center card-hover">
              <div className="w-16 h-16 mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                <Package className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-xl font-medium mb-4">List Your Donation</h3>
              <p className="text-muted-foreground">
                Food donors can easily create listings for surplus food, 
                including details like quantity, pickup time, and expiration date.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl border border-border flex flex-col items-center text-center card-hover">
              <div className="w-16 h-16 mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                <User className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-xl font-medium mb-4">Reserve Food</h3>
              <p className="text-muted-foreground">
                Orphanages can browse available donations and reserve the ones that meet 
                their needs with just a few clicks.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl border border-border flex flex-col items-center text-center card-hover">
              <div className="w-16 h-16 mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-xl font-medium mb-4">Coordinate Pickup</h3>
              <p className="text-muted-foreground">
                Once reserved, both parties can coordinate the food pickup process 
                through our platform, ensuring a smooth handover.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/how-it-works" className="btn-outline">
              Learn More About the Process
            </Link>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-16 md:py-24 px-4 bg-sage-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-4">
              Our Impact
            </span>
            <h2 className="font-bold mb-6">Making a Difference Together</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together with our community of donors and recipients, we've created a meaningful impact 
              in reducing food waste and fighting hunger.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl border border-border text-center">
              <p className="text-5xl font-bold text-sage-500 mb-2">1,240+</p>
              <p className="text-muted-foreground">Successful Donations</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-border text-center">
              <p className="text-5xl font-bold text-sage-500 mb-2">85+</p>
              <p className="text-muted-foreground">Orphanages Served</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-border text-center">
              <p className="text-5xl font-bold text-sage-500 mb-2">7,500+</p>
              <p className="text-muted-foreground">Meals Provided</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-border text-center">
              <p className="text-5xl font-bold text-sage-500 mb-2">4.2T</p>
              <p className="text-muted-foreground">Food Waste Reduced</p>
            </div>
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
                  Ready to Make a Difference?
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Join our community today and help us connect surplus food with those who need it most.
                  Every donation counts.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/auth" className="bg-white text-sage-500 px-6 py-3 rounded-md hover:bg-white/90 transition-all duration-300 font-medium text-center">
                    Sign Up Now
                  </Link>
                  <Link to="/donations" className="border border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-all duration-300 font-medium text-center">
                    Browse Donations
                  </Link>
                </div>
              </div>
              
              <div className="relative h-60 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=2071&auto=format&fit=crop" 
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

export default Index;
