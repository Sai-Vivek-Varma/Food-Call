
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Check if user is logged in
  useEffect(() => {
    const userJson = localStorage.getItem('foodShareUser');
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [location]);
  
  const navbarClass = isScrolled 
    ? "navbar navbar-expand-lg fixed-top bg-white shadow-sm py-3" 
    : "navbar navbar-expand-lg fixed-top bg-transparent py-3";
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className={navbarClass}>
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <span className="text-sage-500">Food</span>Share
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen ? "true" : "false"} 
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link px-3">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/how-it-works" className="nav-link px-3">How It Works</Link>
            </li>
            <li className="nav-item">
              <Link to="/donations" className="nav-link px-3">Browse Donations</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link px-3">About Us</Link>
            </li>
            
            {user ? (
              <>
                <li className="nav-item d-none d-lg-block ms-2">
                  <Link to="/dashboard" className="btn btn-sage px-4 py-2">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-none d-lg-block ms-2">
                  <Link to="/auth" className="btn btn-outline-sage px-4 py-2 me-2">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <Link to="/auth" className="btn btn-sage px-4 py-2">
                    Register
                  </Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link to="/auth" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link to="/auth" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
