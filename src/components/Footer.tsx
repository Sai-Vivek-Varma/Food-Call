import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className='bg-sage-900 text-white'>
      <div className='container mx-auto max-w-6xl px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <Link to='/' className='text-2xl font-bold inline-block'>
              <span className='text-sage-300'>Food</span>Call
            </Link>
            <p className='text-sage-300'>
              Connecting surplus food with those who need it most. Together, we
              can reduce waste and fight hunger.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-sage-300 hover:text-white transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='text-sage-300 hover:text-white transition-colors'
              >
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='text-sage-300 hover:text-white transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='mailto:contact@foodcall.org'
                className='text-sage-300 hover:text-white transition-colors'
              >
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to='/how-it-works'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to='/donations'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  Browse Donations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>For Users</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/auth'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link
                  to='/donate'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  Donate Food
                </Link>
              </li>
              <li>
                <Link
                  to='/dashboard'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to='/faq'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li className='text-sage-300'>
                123 Community Lane,
                <br />
                Food District, FD 12345
              </li>
              <li>
                <a
                  href='tel:+15551234567'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href='mailto:contact@foodcall.org'
                  className='text-sage-300 hover:text-white transition-colors'
                >
                  contact@foodcall.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-sage-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-sage-400 text-sm'>
            &copy; {new Date().getFullYear()} FoodCall. All rights reserved.
          </p>
          <div className='mt-4 md:mt-0 flex space-x-6'>
            <Link
              to='/terms'
              className='text-sage-400 hover:text-white text-sm transition-colors'
            >
              Terms of Service
            </Link>
            <Link
              to='/privacy'
              className='text-sage-400 hover:text-white text-sm transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              to='/cookies'
              className='text-sage-400 hover:text-white text-sm transition-colors'
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
