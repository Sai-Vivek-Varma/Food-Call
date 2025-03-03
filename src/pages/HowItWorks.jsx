
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <section className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">How Food Call Works</h1>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Our platform connects food donors with orphanages to reduce food waste and help those in need.
              The process is simple, transparent, and effective.
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border animate-fade-up">
              <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-sage-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Register as a Donor</h3>
              <p className="text-muted-foreground text-center">
                Create an account as a food donor. This allows you to post food donations that would otherwise go to waste.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border animate-fade-up" style={{animationDelay: "0.2s"}}>
              <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-sage-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Post Available Food</h3>
              <p className="text-muted-foreground text-center">
                List the surplus food with details like quantity, expiry date, and pickup information for orphanages to view.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border animate-fade-up" style={{animationDelay: "0.4s"}}>
              <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-sage-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Orphanages Reserve</h3>
              <p className="text-muted-foreground text-center">
                Registered orphanages browse available donations and reserve food based on their needs.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border animate-fade-up">
              <h3 className="text-xl font-semibold mb-4">For Food Donors</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Register and complete your profile with contact details</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Post available food donations with all necessary details</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Coordinate pickup times with orphanages</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Confirm when donations are completed</p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-border animate-fade-up" style={{animationDelay: "0.2s"}}>
              <h3 className="text-xl font-semibold mb-4">For Orphanages</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Register and verify your organization</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Browse available food donations in your area</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Reserve food that meets your requirements</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-sage-100 text-sage-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                  <p>Arrange pickup and confirm receipt</p>
                </li>
              </ul>
            </div>
          </div>

          <section className="bg-sage-50 p-8 rounded-xl mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-sage-600 mb-2">10,000+</p>
                <p className="text-muted-foreground">Meals Donated</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-sage-600 mb-2">200+</p>
                <p className="text-muted-foreground">Active Donors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-sage-600 mb-2">50+</p>
                <p className="text-muted-foreground">Orphanages Supported</p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to Make a Difference?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/donate" className="btn-primary">Donate Food</a>
              <a href="/auth" className="btn-outline">Join as an Orphanage</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
