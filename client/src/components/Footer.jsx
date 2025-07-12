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
  }, []);

  return (
    <footer className="bg-sage-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link to="/" className="text-2xl lg:text-3xl font-bold inline-block">
              <span className="text-sage-400">Food</span>Call
            </Link>
            <p className="text-sage-300 max-w-sm leading-relaxed">
              Connecting surplus food with those who need it most. Together, we
              can reduce waste and fight hunger.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sage-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-sage-800"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-sage-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-sage-800"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-sage-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-sage-800"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@foodcall.org"
                className="text-sage-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-sage-800"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* User Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6 text-white">For Users</h3>
            <ul className="space-y-3">
              {!user && (
                <li>
                  <Link
                    to="/auth"
                    className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
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
                        className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                      >
                        Browse Donations
                      </Link>
                    )}
                  </li>
                  <li>
                    {user.role === "donor" && (
                      <Link
                        to="/donations"
                        className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                      >
                        Donate Food
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/faq"
                  className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="text-sage-300 leading-relaxed">
                123 Community Lane,
                <br />
                Food District, FD 12345
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@foodcall.org"
                  className="text-sage-300 hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  contact@foodcall.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sage-700 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          <p className="text-sage-400 text-sm">
            © {new Date().getFullYear()} FoodCall. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <Link
              to="/terms"
              className="text-sage-400 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-sage-400 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-sage-400 hover:text-white text-sm transition-colors hover:underline underline-offset-4"
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