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
} from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";

const Index = React.memo(function Index() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6 py-8 sm:py-12 order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-sage-100 rounded-full text-sage-700 text-sm font-medium mx-auto md:mx-0">
                <Heart className="w-4 h-4 mr-2" />
                Reducing Waste • Fighting Hunger
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                Turn Surplus Food into
                <span className="block text-sage-500 mt-2">Hope & Meals</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                Connect surplus food with orphanages in need. Our platform makes
                food donation simple, efficient, and impactful for everyone
                involved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center md:justify-start">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-8 py-3 bg-sage-500 text-white rounded-lg font-semibold hover:bg-sage-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Start Sharing Food
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-sage-200 text-sage-700 rounded-lg font-semibold hover:bg-sage-50 transition-all duration-300 w-full sm:w-auto">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pt-6 justify-center md:justify-start">
                <div>
                  <div className="text-2xl font-bold text-sage-600">
                    <AnimatedNumber value={1000} start={0} duration={1200} />+
                  </div>
                  <div className="text-sm text-gray-500">Meals Shared</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sage-600">
                    <AnimatedNumber value={50} start={0} duration={1200} />+
                  </div>
                  <div className="text-sm text-gray-500">Organizations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sage-600">
                    <AnimatedNumber value={95} start={0} duration={1200} />%
                  </div>
                  <div className="text-sm text-gray-500">Waste Reduced</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative order-1 md:order-2 w-full max-w-md mx-auto md:mx-0">
              <div className="py-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                  alt="Food donation"
                  className="rounded-xl shadow-xl w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </div>
              <div className="absolute top-4 right-4 w-full h-full border-2 border-sage-200 rounded-xl -z-10 hidden sm:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-sage-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              Stories of Impact
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Real stories from our community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                "FoodCall has transformed how we handle surplus food at our
                restaurant. Instead of waste, we now create hope and meals for
                children in need."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-sage-600 text-sm">
                    MS
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Maria Santos</div>
                  <div className="text-xs text-gray-500">Restaurant Owner</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                "With the support from donors on this app, our children no
                longer go to bed hungry. They now enjoy warm, healthy meals
                every day. It’s brought joy and energy back into their lives."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-sage-600 text-sm">
                    VV
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Vijay Varma</div>
                  <div className="text-xs text-gray-500">Orphanage Head</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                "I started donating through this app a few months ago, and
                seeing how my small contributions help provide fresh meals to
                hungry children is incredibly rewarding. Knowing I’m making a
                real impact keeps me coming back."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-sage-600 text-sm">
                    JD
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">John Davis</div>
                  <div className="text-xs text-gray-500">
                    Orphanage Director
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    style={{ fill: "#facc15", stroke: "#facc15" }}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                "The children at our orphanage now have access to fresh,
                nutritious meals thanks to the generous donors on this platform.
                It's truly life-changing."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-sage-600 text-sm">
                    MS
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Murai Sharma</div>
                  <div className="text-xs text-gray-500">Cafe Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Built for Real Impact
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform connects the dots between food waste and hunger,
                creating meaningful change in communities.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-sage-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">
                      Real-time Matching
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Instant notifications when donations match orphanage needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-sage-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">
                      Quality Assured
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Verification system ensures food safety and quality
                      standards
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-sage-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">
                      Impact Tracking
                    </h4>
                    <p className="text-gray-600 text-sm">
                      See the real difference you're making with detailed
                      analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src="https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.webp?a=1&b=1&s=612x612&w=0&k=20&c=WIKBpmpSbwZBW5EEk6ZbXPaji47EUrfhmS5uBxBu9jA="
                alt="Community impact"
                className="rounded-xl shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three easy steps to turn food waste into community support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-sage-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-sage-200 transition-colors duration-300">
                  <Package className="w-8 h-8 text-sage-500" />
                </div>
                <div className="absolute top-2 -left-2 w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                List Your Donation
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Upload details about your surplus food including quantity,
                pickup time, and location.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-sage-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-sage-200 transition-colors duration-300">
                  <Users className="w-8 h-8 text-sage-500" />
                </div>
                <div className="absolute top-2 -left-2 w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Get Matched
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Orphanages in need can browse and reserve donations that match
                their requirements.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-sage-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-sage-200 transition-colors duration-300">
                  <Heart className="w-8 h-8 text-sage-500" />
                </div>
                <div className="absolute top-2 -left-2 w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Make Impact
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Coordinate pickup and delivery to ensure fresh food reaches
                those who need it most.
              </p>
            </div>
          </div>
          <div className="py-12 container mx-auto max-w-4xl text-center">
            <Link
              to="/auth"
              className="inline-flex items-center border-2 border-sage-600 px-8 py-3 bg-white text-sage-600 rounded-lg font-semibold shadow-lg hover:bg-sage-50 transition-colors"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Index;
