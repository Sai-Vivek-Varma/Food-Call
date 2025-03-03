
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  // Check if user is logged in
  useEffect(() => {
    const userJson = localStorage.getItem('foodCallUser');
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-sage-700">Food<span className="text-sage-500">Call</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-sage-600' 
                  : 'text-foreground hover:text-sage-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/how-it-works' 
                  ? 'text-sage-600' 
                  : 'text-foreground hover:text-sage-600'
              }`}
            >
              How It Works
            </Link>
            <Link 
              to="/donations" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/donations' || location.pathname.startsWith('/donations/') 
                  ? 'text-sage-600' 
                  : 'text-foreground hover:text-sage-600'
              }`}
            >
              Donations
            </Link>
            
            {user ? (
              <Link 
                to="/dashboard"
                className="flex items-center px-4 py-2 bg-sage-50 hover:bg-sage-100 text-sage-700 rounded-md transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/auth"
                className="px-4 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container mx-auto max-w-6xl px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-md ${
                  location.pathname === '/' 
                    ? 'bg-sage-50 text-sage-700' 
                    : 'text-foreground hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/how-it-works" 
                className={`px-4 py-2 rounded-md ${
                  location.pathname === '/how-it-works' 
                    ? 'bg-sage-50 text-sage-700' 
                    : 'text-foreground hover:bg-gray-50'
                }`}
              >
                How It Works
              </Link>
              <Link 
                to="/donations" 
                className={`px-4 py-2 rounded-md ${
                  location.pathname === '/donations' || location.pathname.startsWith('/donations/') 
                    ? 'bg-sage-50 text-sage-700' 
                    : 'text-foreground hover:bg-gray-50'
                }`}
              >
                Donations
              </Link>
              
              {user ? (
                <Link 
                  to="/dashboard"
                  className="px-4 py-2 bg-sage-50 text-sage-700 rounded-md hover:bg-sage-100"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/auth"
                  className="px-4 py-2 bg-sage-500 text-white rounded-md"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
