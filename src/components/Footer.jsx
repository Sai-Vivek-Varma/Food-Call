
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border pt-12 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-sage-700">Food<span className="text-sage-500">Call</span></span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Connecting food donors with orphanages to reduce waste and feed children in need.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-sage-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-sage-600 text-sm">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/donations" className="text-muted-foreground hover:text-sage-600 text-sm">
                  Browse Donations
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-sage-600 text-sm">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-sage-600 text-sm">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-sage-600 text-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-sage-600 text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">
                Email: info@foodcall.org
              </li>
              <li className="text-muted-foreground text-sm">
                Phone: (123) 456-7890
              </li>
              <li className="text-muted-foreground text-sm">
                Address: 123 Food St, City, Country
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Food Call. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-sage-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-sage-600 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-sage-600 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
