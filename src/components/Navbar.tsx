
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Package, Heart, LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock authentication state (would be replaced with real auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For demo purposes
  useEffect(() => {
    // Check if we have a user in localStorage (this is just for demo)
    const user = localStorage.getItem('foodShareUser');
    setIsAuthenticated(!!user);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Donations', path: '/donations' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-sage-500" />
          <span className="text-xl font-medium">FoodShare</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium transition-colors hover:text-sage-500 ${
                location.pathname === link.path ? 'text-sage-500' : 'text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-base font-medium text-foreground transition-colors hover:text-sage-500"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-sage-100"
              >
                <User className="w-5 h-5 text-sage-500" />
              </Link>
            </div>
          ) : (
            <Link to="/auth" className="btn-primary flex items-center space-x-2">
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full left-0 top-16 border-t animate-fade-in shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors p-2 hover:bg-sage-50 rounded-md ${
                  location.pathname === link.path ? 'text-sage-500' : 'text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-base font-medium p-2 hover:bg-sage-50 rounded-md flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 text-sage-500" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link 
                to="/auth" 
                className="btn-primary flex justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
