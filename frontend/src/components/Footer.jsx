import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";

const Footer = React.memo(() => {
  const [user, setUser] = useState(null);
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
  }, [location.pathname]);
  return (
    <footer className="bg-sage-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-8 text-left">
          <div className="space-y-4 flex flex-col items-start">
            <Link to="/" className="text-2xl font-bold inline-block">
              <span className="text-sage-400">Food</span>Call
            </Link>
            <p className="text-sage-300 max-w-xs">
              Connecting surplus food with those who need it most. Together, we
              can reduce waste and fight hunger.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sage-300 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-sage-300 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-sage-300 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@foodcall.org"
                className="text-sage-300 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">For Users</h3>
            <ul className="space-y-2">
              {!user && (
                <li>
                  <Link
                    to="/auth"
                    className="text-sage-300 hover:text-white transition-colors"
                  >
                    Sign In / Register
                  </Link>
                </li>
              )}
              {user && (
                <>
                  <li>
                    {user.role === "orphanage" && (
                      <Link
                        to="/donations"
                        className="text-sage-300 hover:text-white transition-colors"
                      >
                        Browse Donations
                      </Link>
                    )}
                  </li>
                  <li>
                    {user.role === "donor" && (
                      <Link
                        to="/donations"
                        className="text-sage-300 hover:text-white transition-colors"
                      >
                        Donate Food
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-sage-300 hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/faq"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sage-300">
                123 Community Lane,
                <br />
                Food District, FD 12345
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@foodcall.org"
                  className="text-sage-300 hover:text-white transition-colors"
                >
                  contact@foodcall.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-10 pt-6 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-y-2 gap-x-6 text-left">
          <p className="text-sage-400 text-sm">
            © {new Date().getFullYear()} FoodCall. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            <Link
              to="/terms"
              className="text-sage-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-sage-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-sage-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
