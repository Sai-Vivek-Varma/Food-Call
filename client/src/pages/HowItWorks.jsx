import {
  ArrowRight,
  Package,
  Users,
  Heart,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-sage-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-sage-700 mb-6">
            How <span className="text-sage-500">FoodCall</span> Works
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our simple three-step process connects surplus food with orphanages,
            making food donation effortless and impactful.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
                <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs mr-2">
                  1
                </span>
                For Food Donors
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                List Your Surplus Food
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Restaurants, events, and individuals can easily create listings
                for surplus food. Simply provide details about the food type,
                quantity, pickup location, and available time slots.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-sage-500" />
                  <span className="text-gray-700">
                    Quick and easy listing process
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-sage-500" />
                  <span className="text-gray-700">
                    Upload photos to showcase your donation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-sage-500" />
                  <span className="text-gray-700">
                    Set flexible pickup times
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1710988006558-3e57da46f7c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpY2tpbmclMjBmb29kJTIwcGljdHVyZXN8ZW58MHwwfDB8fHww"
                  alt="Food preparation"
                  className="rounded-xl shadow-xl w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <div>
              <div className="relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661631378884-29d08edf0ef0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxob2xkaW5nJTIwcGhvbmV8ZW58MHwwfDB8fHww"
                  alt="Children receiving food"
                  className="rounded-xl shadow-xl w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2">
                  2
                </span>
                For Orphanages
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Browse & Reserve Donations
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Orphanages can browse available food donations, filter by
                location and food type, and reserve items that meet their needs
                with just a few clicks.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Real-time availability updates
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">
                    Filter by location and food type
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">
                    Instant reservation confirmation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-2">
                  3
                </span>
                Coordination & Impact
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Coordinate & Complete
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Both parties coordinate the pickup through our platform. The
                food gets delivered to those who need it, and everyone can track
                the positive impact they've made.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">
                    Seamless coordination tools
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">
                    Track your impact and contributions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">
                    Community feedback and ratings
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1628717341663-0007b0ee2597?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGZvb2QlMjBkZWxpdmVyeXxlbnwwfDB8MHx8fDA%3D"
                  alt="Food delivery"
                  className="rounded-xl shadow-xl w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Why Choose FoodCall?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with safety, efficiency, and impact in mind
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-sage-500" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Safety First
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rigorous verification process ensures food safety standards and
                donor authenticity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Real-Time Updates
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Instant notifications and updates keep everyone informed
                throughout the process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Measurable Impact
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Track the difference you're making with detailed analytics and
                community feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to Start Making a Difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our community today and help us create a world where no food
            goes to waste and no child goes hungry.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-3 bg-sage-500 text-white rounded-lg font-semibold hover:bg-sage-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Join FoodCall Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
