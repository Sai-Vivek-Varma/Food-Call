
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sage-900 text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="text-decoration-none d-inline-block mb-3">
              <span className="h3 fw-bold">
                <span className="text-sage-300">Food</span>Share
              </span>
            </Link>
            <p className="text-sage-300 mb-4">
              Connecting surplus food with those who need it most. Together, we can reduce waste and fight hunger.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-sage-300 hover-text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-sage-300 hover-text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-sage-300 hover-text-white">
                <Instagram size={20} />
              </a>
              <a href="mailto:contact@foodshare.org" className="text-sage-300 hover-text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-sage-300 text-decoration-none hover-text-white">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-sage-300 text-decoration-none hover-text-white">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/how-it-works" className="text-sage-300 text-decoration-none hover-text-white">
                  How It Works
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donations" className="text-sage-300 text-decoration-none hover-text-white">
                  Browse Donations
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">For Users</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/auth" className="text-sage-300 text-decoration-none hover-text-white">
                  Sign In / Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donate" className="text-sage-300 text-decoration-none hover-text-white">
                  Donate Food
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-sage-300 text-decoration-none hover-text-white">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-sage-300 text-decoration-none hover-text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li className="text-sage-300 mb-2">
                123 Community Lane,<br />
                Food District, FD 12345
              </li>
              <li className="mb-2">
                <a href="tel:+15551234567" className="text-sage-300 text-decoration-none hover-text-white">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="mb-2">
                <a href="mailto:contact@foodshare.org" className="text-sage-300 text-decoration-none hover-text-white">
                  contact@foodshare.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-top border-sage-700 mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-sage-400 small mb-3 mb-md-0">
            &copy; {new Date().getFullYear()} FoodShare. All rights reserved.
          </p>
          <div className="d-flex gap-4">
            <Link to="/terms" className="text-sage-400 small text-decoration-none hover-text-white">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sage-400 small text-decoration-none hover-text-white">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-sage-400 small text-decoration-none hover-text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
