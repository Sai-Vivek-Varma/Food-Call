import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Bell } from "lucide-react";
import NotificationsModal from "./NotificationsModal";
import useUnreadNotifications from "@/hooks/useUnreadNotifications";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = useUnreadNotifications();

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

  return (
    <header className="fixed w-full top-0 bg-white/90 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4">
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
              <>
                <button
                  className="relative ml-2 p-2 rounded-full hover:bg-sage-50 transition-colors"
                  onClick={() => setShowNotifications(true)}
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-sage-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <div className="relative ml-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-sage-700 hover:bg-sage-50/80 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="capitalize">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-border">
                      <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                        {user.role === "donor" ? "Food Donor" : "Orphanage"}
                        <p className="text-sage-500">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="ml-2 px-4 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
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
              <Link
                to="/auth"
                className="block w-full px-3 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors text-base font-medium text-center"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      <NotificationsModal
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </header>
  );
};

export default Navbar;
