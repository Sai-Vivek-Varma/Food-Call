
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Mock auth state (in a real app, this would come from a context or auth provider)
const mockIsAuthenticated = true;
const mockUser = {
  id: '123',
  name: 'John Doe',
  role: 'donor', // 'donor', 'orphanage', or 'admin'
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // For demo purposes only - in a real app, auth would be managed with a context
  const [isAuthenticated] = useState(mockIsAuthenticated);
  const [user] = useState(mockUser);
  
  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-sage-600 text-2xl font-bold">Food<span className="text-sage-500">Call</span></span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/how-it-works" isActive={location.pathname === '/how-it-works'}>
            How It Works
          </NavLink>
          <NavLink to="/donations" isActive={location.pathname === '/donations'}>
            Donations
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
                Dashboard
              </NavLink>
              
              {user.role === 'donor' && (
                <Link
                  to="/donate"
                  className="px-5 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
                >
                  Donate Food
                </Link>
              )}
            </>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden flex items-center" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <X className="w-7 h-7 text-gray-700" />
          ) : (
            <Menu className="w-7 h-7 text-gray-700" />
          )}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-3">
            <MobileNavLink to="/" isActive={location.pathname === '/'}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/how-it-works" isActive={location.pathname === '/how-it-works'}>
              How It Works
            </MobileNavLink>
            <MobileNavLink to="/donations" isActive={location.pathname === '/donations'}>
              Donations
            </MobileNavLink>
            
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
                  Dashboard
                </MobileNavLink>
                
                {user.role === 'donor' && (
                  <Link
                    to="/donate"
                    className="py-3 px-4 bg-sage-500 text-white rounded-md text-center font-medium hover:bg-sage-600 transition-colors"
                  >
                    Donate Food
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/auth"
                className="py-3 px-4 bg-sage-500 text-white rounded-md text-center font-medium hover:bg-sage-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

// Desktop navigation link component
const NavLink = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`font-medium transition-colors ${
        isActive
          ? 'text-sage-600'
          : 'text-gray-700 hover:text-sage-500'
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile navigation link component
const MobileNavLink = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`py-3 px-4 rounded-md font-medium ${
        isActive
          ? 'bg-sage-50 text-sage-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
