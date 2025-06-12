
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Plus } from "lucide-react";
import Modal from "./Modal";
import AuthForm from "./AuthForm";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);

    const userJson = localStorage.getItem("foodShareUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("foodShareUser");
    localStorage.removeItem("foodShareToken");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const openAuthModal = (type) => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    const userJson = localStorage.getItem("foodShareUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  };

  return (
    <>
      <header className="fixed w-full top-0 bg-white/90 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl font-bold text-sage-700 flex items-center"
            >
              <span className="text-sage-500">Food</span>Call
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/"
                    ? "text-sage-700 bg-sage-50"
                    : "text-foreground hover:text-sage-700 hover:bg-sage-50/80"
                } transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/how-it-works"
                    ? "text-sage-700 bg-sage-50"
                    : "text-foreground hover:text-sage-700 hover:bg-sage-50/80"
                } transition-colors`}
              >
                How It Works
              </Link>
              
              {/* Show different navigation based on user type */}
              {user && (
                <>
                  {user.role === "orphanage" && (
                    <Link
                      to="/donations"
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        location.pathname === "/donations"
                          ? "text-sage-700 bg-sage-50"
                          : "text-foreground hover:text-sage-700 hover:bg-sage-50/80"
                      } transition-colors`}
                    >
                      Browse Donations
                    </Link>
                  )}
                  
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      location.pathname === "/dashboard"
                        ? "text-sage-700 bg-sage-50"
                        : "text-foreground hover:text-sage-700 hover:bg-sage-50/80"
                    } transition-colors`}
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {user ? (
                <div className="relative ml-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-sage-700 hover:bg-sage-50/80 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.name.split(" ")[0]}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-border">
                      <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                        {user.role === "donor" ? "Food Donor" : "Orphanage"}
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-sage-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="ml-2 flex space-x-2">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="px-4 py-2 text-sage-500 hover:text-sage-600 transition-colors text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal("register")}
                    className="px-4 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-sm font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/"
                    ? "text-sage-700 bg-sage-50"
                    : "text-foreground hover:text-sage-700 hover:bg-sage-50/80"
                } transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/how-it-works"
                    ? "text-sage-700 bg-sage-50"
                    : "text-foreground hover:text-sage-700 hover:bg-sage-50/80"
                } transition-colors`}
              >
                How It Works
              </Link>
              
              {user && (
                <>
                  {user.role === "orphanage" && (
                    <Link
                      to="/donations"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === "/donations"
                          ? "text-sage-700 bg-sage-50"
                          : "text-foreground hover:text-sage-700 hover:bg-sage-50/80"
                      } transition-colors`}
                    >
                      Browse Donations
                    </Link>
                  )}
                  
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-sage-700 hover:bg-sage-50/80 transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              ) : (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-sage-700 hover:bg-sage-50/80 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal("register")}
                    className="block w-full px-3 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-base font-medium text-center"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title={authType === "login" ? "Sign In" : "Create Account"}
      >
        <div className="mb-4">
          <div className="flex p-1 bg-secondary rounded-lg">
            <button
              onClick={() => setAuthType("login")}
              className={`flex-1 py-2 text-center rounded-md transition-colors ${
                authType === "login" ? "bg-white shadow-sm" : ""
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthType("register")}
              className={`flex-1 py-2 text-center rounded-md transition-colors ${
                authType === "register" ? "bg-white shadow-sm" : ""
              }`}
            >
              Register
            </button>
          </div>
        </div>
        
        <AuthForm
          type={authType}
          onSuccess={handleAuthSuccess}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default Navbar;
