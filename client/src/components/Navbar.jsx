import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Bell } from "lucide-react";

const Navbar = React.memo(function Navbar({ onShowNotifications }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = 0; // useUnreadNotifications(); // Assuming this is defined elsewhere
  const dropdownRef = useRef(null);

  useEffect(() => {
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
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("foodShareUser");
    localStorage.removeItem("foodShareToken");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl lg:text-2xl font-bold text-sage-700 flex items-center hover:text-sage-600 transition-colors"
          >
            <span className="text-sage-500">Food</span>Call
          </Link>

          {/* Mobile menu button and notifications */}
          <div className="flex items-center gap-2 lg:hidden">
            {user && (
              <button
                className="relative p-2 rounded-xl hover:bg-sage-50 transition-colors"
                onClick={() => onShowNotifications && onShowNotifications()}
                aria-label="Show notifications"
              >
                <Bell className="w-5 h-5 text-sage-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            )}
            <button
              className="p-2 rounded-xl hover:bg-sage-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className={`nav-link ${location.pathname === "/how-it-works" ? "active" : ""}`}
            >
              How It Works
            </Link>

            {/* User-specific navigation */}
            {user && (
              <>
                {user.role === "orphanage" && (
                  <Link
                    to="/donations"
                    className={`nav-link ${location.pathname === "/donations" ? "active" : ""}`}
                  >
                    Browse Donations
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* User actions */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                {/* Notifications */}
                <button
                  className="relative p-2 rounded-xl hover:bg-sage-50 transition-colors"
                  onClick={() => onShowNotifications && onShowNotifications()}
                  aria-label="Show notifications"
                >
                  <Bell className="w-5 h-5 text-sage-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center font-bold shadow-sm">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-sage-700 hover:bg-sage-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-sage-600" />
                    </div>
                    <span className="hidden xl:block capitalize">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-large border border-gray-100 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">
                          {user.role === "donor" ? "Food Donor" : "Orphanage"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="ml-4 btn-primary text-sm px-6 py-2"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-large">
          <div className="container-custom py-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-sage-700 bg-sage-50"
                  : "text-gray-700 hover:text-sage-700 hover:bg-sage-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                location.pathname === "/how-it-works"
                  ? "text-sage-700 bg-sage-50"
                  : "text-gray-700 hover:text-sage-700 hover:bg-sage-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>

            {user && (
              <>
                {user.role === "orphanage" && (
                  <Link
                    to="/donations"
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      location.pathname === "/donations"
                        ? "text-sage-700 bg-sage-50"
                        : "text-gray-700 hover:text-sage-700 hover:bg-sage-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Donations
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-sage-700 hover:bg-sage-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role === "donor" ? "Food Donor" : "Orphanage"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </>
            )}

            {!user && (
              <Link
                to="/auth"
                className="block w-full mt-4 btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

export default Navbar;