
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-sage-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-sage-700 mb-6">
              <span className="text-sage-500">Food</span>Call
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Connecting food donors with orphanages to reduce waste and feed those in need. 
              Join our community of changemakers making a difference, one meal at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="px-8 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors font-medium flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="px-8 py-3 border border-sage-500 text-sage-700 rounded-md hover:bg-sage-50 transition-colors font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-sage-200/30 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
              alt="Food donation" 
              className="rounded-xl shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How FoodCall Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to make a big difference in your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-border shadow-sm text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Share Surplus Food</h3>
              <p className="text-muted-foreground">
                Restaurants, events, and individuals can easily list surplus food instead of letting it go to waste.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-border shadow-sm text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect Communities</h3>
              <p className="text-muted-foreground">
                Orphanages and care facilities can browse and reserve food donations that meet their needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-border shadow-sm text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Reduce Waste</h3>
              <p className="text-muted-foreground">
                Make a positive environmental impact while ensuring nutritious meals reach those who need them most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 px-4 bg-sage-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Making a Real Impact</h2>
            <p className="text-muted-foreground">
              Together, we're creating positive change in our communities
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600 mb-2">1000+</div>
              <div className="text-muted-foreground">Meals Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600 mb-2">50+</div>
              <div className="text-muted-foreground">Partner Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600 mb-2">200+</div>
              <div className="text-muted-foreground">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600 mb-2">95%</div>
              <div className="text-muted-foreground">Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join FoodCall today and be part of a community that's working together to reduce food waste 
            and ensure everyone has access to nutritious meals.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors font-medium"
          >
            Join FoodCall <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
