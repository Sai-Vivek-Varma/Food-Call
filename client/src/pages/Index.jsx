import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Users,
  Package,
  Star,
  Check,
  Play,
  Sparkles,
  Globe,
  Shield,
} from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";

const Index = React.memo(function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 sm:pt-24 sm:pb-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-sage-100 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-100 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-sage-100 to-emerald-100 rounded-full opacity-10 float"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center fade-in">
            {/* Left Content */}
            <div className="space-y-6 py-8 sm:py-12 order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sage-100 to-emerald-100 rounded-full text-sage-700 text-sm font-semibold mx-auto md:mx-0 shadow-lg border border-sage-200">
                <Sparkles className="w-4 h-4 mr-2 text-sage-500" />
                Reducing Waste • Fighting Hunger
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Turn Surplus Food into
                <span className="block gradient-text mt-2">Hope & Meals</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
                Connect surplus food with orphanages in need. Our platform makes
                food donation simple, efficient, and impactful for everyone
                involved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center md:justify-start">
                <Link
                  to="/auth"
                  className="btn-primary group w-full sm:w-auto"
                >
                  Start Sharing Food
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-outline group w-full sm:w-auto">
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-row items-center gap-6 sm:gap-8 pt-8 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">
                    <AnimatedNumber value={1000} start={0} duration={1200} />+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Meals Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">
                    <AnimatedNumber value={50} start={0} duration={1200} />+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Organizations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">
                    <AnimatedNumber value={95} start={0} duration={1200} />%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Waste Reduced</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative order-1 md:order-2 w-full max-w-md mx-auto md:mx-0 scale-in">
              <div className="relative group">
                {/* Floating background elements */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-sage-200 to-emerald-200 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 float"></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-tl from-sage-100 to-emerald-100 rounded-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500 float" style={{animationDelay: '2s'}}></div>
                
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                  alt="Food donation"
                  className="relative rounded-2xl shadow-2xl w-full h-64 sm:h-80 md:h-96 object-cover group-hover:shadow-3xl transition-all duration-500 border-4 border-white"
                />
                
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-sage-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-semibold text-sage-700">Live Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-sage-50 via-white to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16 fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sage-100 to-emerald-100 rounded-full text-sage-700 text-sm font-semibold mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Community Stories
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Stories of Impact
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from our community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 slide-up">
            <div className="card-enhanced p-8 group">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    style={{transitionDelay: `${i * 100}ms`}}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                "FoodCall has transformed how we handle surplus food at our
                restaurant. Instead of waste, we now create hope and meals for
                children in need."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md">
                  <span className="font-bold text-sage-600">
                    MS
                  </span>
                </div>
                <div>
                  <div className="font-semibold">Maria Santos</div>
                  <div className="text-sm text-gray-500">Restaurant Owner</div>
                </div>
              </div>
            </div>

            <div className="card-enhanced p-8 group">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    style={{transitionDelay: `${i * 100}ms`}}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                "With the support from donors on this app, our children no
                longer go to bed hungry. They now enjoy warm, healthy meals
                every day. It’s brought joy and energy back into their lives."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md">
                  <span className="font-bold text-sage-600">
                    VV
                  </span>
                </div>
                <div>
                  <div className="font-semibold">Vijay Varma</div>
                  <div className="text-sm text-gray-500">Orphanage Head</div>
                </div>
              </div>
            </div>

            <div className="card-enhanced p-8 group">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    style={{transitionDelay: `${i * 100}ms`}}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                "I started donating through this app a few months ago, and
                seeing how my small contributions help provide fresh meals to
                hungry children is incredibly rewarding. Knowing I’m making a
                real impact keeps me coming back."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md">
                  <span className="font-bold text-sage-600">
                    JD
                  </span>
                </div>
                <div>
                  <div className="font-semibold">John Davis</div>
                  <div className="text-sm text-gray-500">
                    Orphanage Director
                  </div>
                </div>
              </div>
            </div>

            <div className="card-enhanced p-8 group">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    style={{transitionDelay: `${i * 100}ms`}}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                "The children at our orphanage now have access to fresh,
                nutritious meals thanks to the generous donors on this platform.
                It's truly life-changing."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-full flex items-center justify-center shadow-md">
                  <span className="font-bold text-sage-600">
                    MS
                  </span>
                </div>
                <div>
                  <div className="font-semibold">Murai Sharma</div>
                  <div className="text-sm text-gray-500">Cafe Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sage-100 to-emerald-100 rounded-full text-sage-700 text-sm font-semibold mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Platform Features
              </div>
              <h2 className="text-4xl font-bold mb-8 text-gray-900">
                Built for Real Impact
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Our platform connects the dots between food waste and hunger,
                creating meaningful change in communities.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Check className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-900 text-lg">
                      Real-time Matching
                    </h4>
                    <p className="text-gray-600">
                      Instant notifications when donations match orphanage needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Check className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-900 text-lg">
                      Quality Assured
                    </h4>
                    <p className="text-gray-600">
                      Verification system ensures food safety and quality
                      standards
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Check className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-900 text-lg">
                      Impact Tracking
                    </h4>
                    <p className="text-gray-600">
                      See the real difference you're making with detailed
                      analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-2xl transform rotate-3 opacity-20"></div>
              <img
                src="https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.webp?a=1&b=1&s=612x612&w=0&k=20&c=WIKBpmpSbwZBW5EEk6ZbXPaji47EUrfhmS5uBxBu9jA="
                alt="Community impact"
                className="relative rounded-2xl shadow-2xl w-full h-80 object-cover border-4 border-white hover:shadow-3xl transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-sage-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sage-100 to-emerald-100 rounded-full text-sage-700 text-sm font-semibold mb-6">
              <Package className="w-4 h-4 mr-2" />
              How It Works
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three easy steps to turn food waste into community support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 slide-up">
            <div className="text-center group relative">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Package className="w-10 h-10 text-sage-600" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-sage-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                List Your Donation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload details about your surplus food including quantity,
                pickup time, and location.
              </p>
            </div>

            <div className="text-center group relative">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Users className="w-10 h-10 text-sage-600" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-sage-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Get Matched
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Orphanages in need can browse and reserve donations that match
                their requirements.
              </p>
            </div>

            <div className="text-center group relative">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Heart className="w-10 h-10 text-sage-600" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-sage-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Make Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Coordinate pickup and delivery to ensure fresh food reaches
                those who need it most.
              </p>
            </div>
          </div>
          
          <div className="py-16 container mx-auto max-w-4xl text-center fade-in">
            <Link
              to="/auth"
              className="btn-outline group text-lg px-10 py-4"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Index;
