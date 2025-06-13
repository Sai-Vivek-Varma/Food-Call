
import React from "react";
import { ArrowRight, CheckCircle, Users2, Heart, Package2, Target, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorks = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-sage-50 to-white'>
      <Navbar />
      <main className='flex-grow pt-28 pb-16'>
        <div className='container mx-auto max-w-7xl px-4'>
          <section className='mb-16'>
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-sage-100 text-sage-700 font-medium text-sm mb-8">
                <Target className="w-4 h-4 mr-2" />
                Step by Step Guide
              </div>
              <h1 className='text-4xl md:text-6xl font-bold text-sage-800 mb-6'>
                How FoodCall Works
              </h1>
              <p className='text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed'>
                Our platform creates a seamless connection between food donors and orphanages, 
                turning surplus food into community support through a simple, transparent process.
              </p>
            </div>
          </section>

          <div className='grid md:grid-cols-3 gap-8 lg:gap-12 mb-20'>
            <div className='bg-white p-8 rounded-2xl shadow-lg border-2 border-sage-100 hover:border-sage-300 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 mx-auto'>
                <span className='text-white text-2xl font-bold'>1</span>
              </div>
              <h3 className='text-2xl font-bold text-center mb-4 text-sage-800'>
                Register as a Donor
              </h3>
              <p className='text-muted-foreground text-center leading-relaxed'>
                Create your account as a food donor and join our community of changemakers. 
                Verify your profile to start sharing surplus food with those who need it most.
              </p>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-lg border-2 border-sage-100 hover:border-sage-300 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 mx-auto'>
                <span className='text-white text-2xl font-bold'>2</span>
              </div>
              <h3 className='text-2xl font-bold text-center mb-4 text-sage-800'>
                List Available Food
              </h3>
              <p className='text-muted-foreground text-center leading-relaxed'>
                Post detailed information about your surplus food including quantity, expiry date, 
                pickup location, and photos to help orphanages make informed decisions.
              </p>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-lg border-2 border-sage-100 hover:border-sage-300 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 mx-auto'>
                <span className='text-white text-2xl font-bold'>3</span>
              </div>
              <h3 className='text-2xl font-bold text-center mb-4 text-sage-800'>
                Orphanages Connect
              </h3>
              <p className='text-muted-foreground text-center leading-relaxed'>
                Registered orphanages browse available donations, reserve items that match their needs, 
                and coordinate pickup times directly with donors.
              </p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-12 mb-20'>
            <div className='bg-gradient-to-br from-sage-50 to-white p-10 rounded-2xl shadow-lg border border-sage-200'>
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-sage-600 mr-3" />
                <h3 className='text-2xl font-bold text-sage-800'>For Food Donors</h3>
              </div>
              <ul className='space-y-4'>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Register and complete your profile with accurate contact details and verification</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Create detailed donation listings with photos, quantities, and pickup information</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Coordinate pickup schedules with orphanages and ensure smooth handovers</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Track your impact and see how your donations make a real difference</p>
                </li>
              </ul>
            </div>

            <div className='bg-gradient-to-br from-sage-50 to-white p-10 rounded-2xl shadow-lg border border-sage-200'>
              <div className="flex items-center mb-6">
                <Users2 className="w-8 h-8 text-sage-600 mr-3" />
                <h3 className='text-2xl font-bold text-sage-800'>For Orphanages</h3>
              </div>
              <ul className='space-y-4'>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Register your organization and complete the verification process</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Browse and search available food donations filtered by location and type</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Reserve donations that meet your community's specific dietary requirements</p>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='text-sage-600 rounded-full w-6 h-6 mr-4 mt-1 flex-shrink-0' />
                  <p className="text-muted-foreground">Manage pickup schedules and confirm successful food collections</p>
                </li>
              </ul>
            </div>
          </div>

          <section className='bg-gradient-to-r from-sage-600 to-sage-700 text-white p-12 rounded-3xl mb-16 shadow-2xl'>
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>Our Growing Impact</h2>
              <div className='grid md:grid-cols-3 gap-8'>
                <div className='text-center'>
                  <p className='text-4xl md:text-5xl font-bold mb-3'>15,000+</p>
                  <p className='text-lg opacity-90'>Meals Donated</p>
                </div>
                <div className='text-center'>
                  <p className='text-4xl md:text-5xl font-bold mb-3'>300+</p>
                  <p className='text-lg opacity-90'>Active Donors</p>
                </div>
                <div className='text-center'>
                  <p className='text-4xl md:text-5xl font-bold mb-3'>75+</p>
                  <p className='text-lg opacity-90'>Orphanages Supported</p>
                </div>
              </div>
            </div>
          </section>

          <div className='text-center bg-white rounded-2xl p-12 shadow-lg border border-sage-200'>
            <Package2 className="w-12 h-12 text-sage-600 mx-auto mb-6" />
            <h3 className='text-3xl font-bold mb-6 text-sage-800'>
              Ready to Join Our Mission?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every meal shared is a step toward a more sustainable and caring world. 
              Start your journey today and become part of the solution.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a href='/auth' className='inline-flex items-center px-8 py-4 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors font-semibold text-lg'>
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href='/donations' className='px-8 py-4 border-2 border-sage-600 text-sage-700 rounded-xl hover:bg-sage-50 transition-colors font-semibold text-lg'>
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
