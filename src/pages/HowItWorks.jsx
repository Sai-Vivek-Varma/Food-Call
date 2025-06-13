
import { ArrowRight, CheckCircle, Users2, Heart, Package2, Target, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorks = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-sage-50 to-white'>
      <Navbar />
      <main className='flex-grow pt-32 pb-20'>
        <div className='container mx-auto max-w-7xl px-6'>
          <section className='mb-20'>
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-10 border border-sage-200 shadow-sm">
                <Target className="w-4 h-4 mr-2" />
                Step by Step Guide
              </div>
              <h1 className='text-5xl md:text-7xl font-bold text-sage-800 mb-8'>
                How FoodCall Works
              </h1>
              <p className='text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed'>
                Our platform creates a seamless connection between food donors and orphanages, 
                turning surplus food into community support through a simple, transparent process.
              </p>
            </div>
          </section>

          <div className='grid md:grid-cols-3 gap-10 lg:gap-12 mb-24'>
            <div className='bg-white p-10 rounded-3xl shadow-lg border-2 border-sage-100 hover:border-sage-300 hover:shadow-2xl transition-all duration-500 hover:scale-105'>
              <div className='w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg'>
                <span className='text-white text-3xl font-bold'>1</span>
              </div>
              <h3 className='text-3xl font-bold text-center mb-6 text-sage-800'>
                Register as a Donor
              </h3>
              <p className='text-gray-600 text-center leading-relaxed text-lg'>
                Create your account as a food donor and join our community of changemakers. 
                Verify your profile to start sharing surplus food with those who need it most.
              </p>
            </div>

            <div className='bg-white p-10 rounded-3xl shadow-lg border-2 border-sage-100 hover:border-sage-300 hover:shadow-2xl transition-all duration-500 hover:scale-105'>
              <div className='w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg'>
                <span className='text-white text-3xl font-bold'>2</span>
              </div>
              <h3 className='text-3xl font-bold text-center mb-6 text-sage-800'>
                List Available Food
              </h3>
              <p className='text-gray-600 text-center leading-relaxed text-lg'>
                Post detailed information about your surplus food including quantity, expiry date, 
                pickup location, and photos to help orphanages make informed decisions.
              </p>
            </div>

            <div className='bg-white p-10 rounded-3xl shadow-lg border-2 border-sage-100 hover:border-sage-300 hover:shadow-2xl transition-all duration-500 hover:scale-105'>
              <div className='w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg'>
                <span className='text-white text-3xl font-bold'>3</span>
              </div>
              <h3 className='text-3xl font-bold text-center mb-6 text-sage-800'>
                Orphanages Connect
              </h3>
              <p className='text-gray-600 text-center leading-relaxed text-lg'>
                Registered orphanages browse available donations, reserve items that match their needs, 
                and coordinate pickup times directly with donors.
              </p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-12 mb-24'>
            <div className='bg-gradient-to-br from-sage-50 to-white p-12 rounded-3xl shadow-lg border border-sage-200 hover:shadow-xl transition-all duration-300'>
              <div className="flex items-center mb-8">
                <Heart className="w-10 h-10 text-sage-600 mr-4" />
                <h3 className='text-3xl font-bold text-sage-800'>For Food Donors</h3>
              </div>
              <ul className='space-y-6'>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Register and complete your profile with accurate contact details and verification</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Create detailed donation listings with photos, quantities, and pickup information</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Coordinate pickup schedules with orphanages and ensure smooth handovers</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Track your impact and see how your donations make a real difference</p>
                </li>
              </ul>
            </div>

            <div className='bg-gradient-to-br from-sage-50 to-white p-12 rounded-3xl shadow-lg border border-sage-200 hover:shadow-xl transition-all duration-300'>
              <div className="flex items-center mb-8">
                <Users2 className="w-10 h-10 text-sage-600 mr-4" />
                <h3 className='text-3xl font-bold text-sage-800'>For Orphanages</h3>
              </div>
              <ul className='space-y-6'>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Register your organization and complete the verification process</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Browse and search available food donations filtered by location and type</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Reserve donations that meet your community's specific dietary requirements</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-8 h-8 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-gray-600 text-lg leading-relaxed">Manage pickup schedules and confirm successful food collections</p>
                </li>
              </ul>
            </div>
          </div>

          <section className='bg-gradient-to-r from-sage-600 to-sage-700 text-white p-16 rounded-3xl mb-20 shadow-2xl'>
            <div className="text-center">
              <Globe className="w-20 h-20 mx-auto mb-8 opacity-90" />
              <h2 className='text-4xl md:text-5xl font-bold mb-8'>Our Growing Impact</h2>
              <div className='grid md:grid-cols-3 gap-10'>
                <div className='text-center'>
                  <p className='text-5xl md:text-6xl font-bold mb-4'>15,000+</p>
                  <p className='text-xl opacity-90'>Meals Donated</p>
                </div>
                <div className='text-center'>
                  <p className='text-5xl md:text-6xl font-bold mb-4'>300+</p>
                  <p className='text-xl opacity-90'>Active Donors</p>
                </div>
                <div className='text-center'>
                  <p className='text-5xl md:text-6xl font-bold mb-4'>75+</p>
                  <p className='text-xl opacity-90'>Orphanages Supported</p>
                </div>
              </div>
            </div>
          </section>

          <div className='text-center bg-white rounded-3xl p-16 shadow-lg border border-sage-200'>
            <Package2 className="w-16 h-16 text-sage-600 mx-auto mb-8" />
            <h3 className='text-4xl font-bold mb-8 text-sage-800'>
              Ready to Join Our Mission?
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Every meal shared is a step toward a more sustainable and caring world. 
              Start your journey today and become part of the solution.
            </p>
            <div className='flex flex-col sm:flex-row gap-6 justify-center'>
              <a href='/auth' className='group inline-flex items-center px-10 py-5 bg-sage-600 text-white rounded-2xl hover:bg-sage-700 transition-all duration-300 font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-105'>
                Get Started <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href='/donations' className='inline-flex items-center px-10 py-5 border-2 border-sage-600 text-sage-700 rounded-2xl hover:bg-sage-50 transition-all duration-300 font-semibold text-xl'>
                Browse Donations
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
