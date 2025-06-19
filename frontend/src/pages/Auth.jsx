import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "@/components/AuthForm";
import { useSelector } from "react-redux";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    // Only redirect to dashboard if on /auth and already logged in
    if (user && token && location.pathname === "/auth") {
      if (justLoggedIn) {
        toast.success(
          authType === "login"
            ? "Successfully logged in!"
            : "Account created successfully!"
        );
        setJustLoggedIn(false);
      }
      navigate("/dashboard");
    }
  }, [user, token, navigate, location.pathname, justLoggedIn, authType]);

  const handleSuccess = () => {
    setJustLoggedIn(true);
  };

  const toggleAuthType = () => {
    setAuthType(authType === "login" ? "register" : "login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-700 mb-3">
              <span className="text-sage-500">Food</span>Call
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connecting food donors with orphanages to reduce waste and feed
              those in need
            </p>
          </div>

          {/* Main Content Container */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">
            {/* Left Side - Image Section */}
            <div className="order- md:order-1">
              <div className="relative group">
                {/* Background decoration */}
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-sage-200/30 -z-10 group-hover:bg-sage-200/40 transition-colors duration-300"></div>

                {/* Main image */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                    alt="Food donation and community support"
                    className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <p className="text-sm font-medium text-sage-700">
                      Making a difference together
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form Section */}
            <div className="order-1 lg:order-2">
              <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl border border-sage-100 shadow-xl max-w-lg mx-auto lg:mx-0">
                {/* Form Header */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {authType === "login" ? "Welcome Back" : "Join FoodCall"}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {authType === "login"
                      ? "Sign in to your account to continue making a difference in your community."
                      : "Create an account to start sharing food or receiving donations for those in need."}
                  </p>
                </div>

                {/* Auth Type Toggle */}
                <div className="mb-8">
                  <div className="flex p-1 bg-sage-50 rounded-xl border border-sage-100">
                    <button
                      onClick={() => setAuthType("login")}
                      className={`flex-1 py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${
                        authType === "login"
                          ? "bg-white text-sage-700 shadow-sm border border-sage-200"
                          : "text-sage-600 hover:text-sage-700"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthType("register")}
                      className={`flex-1 py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${
                        authType === "register"
                          ? "bg-white text-sage-700 shadow-sm border border-sage-200"
                          : "text-sage-600 hover:text-sage-700"
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>

                {/* Auth Form */}
                <AuthForm type={authType} onSuccess={handleSuccess} />

                {/* Toggle Link */}
                <div className="mt-8 pt-6 border-t border-sage-100">
                  <p className="text-center text-gray-600">
                    {authType === "login" ? (
                      <>
                        Don't have an account yet?{" "}
                        <button
                          onClick={toggleAuthType}
                          className="text-sage-600 hover:text-sage-700 font-medium transition-colors duration-200 underline underline-offset-2"
                        >
                          Create one now
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={toggleAuthType}
                          className="text-sage-600 hover:text-sage-700 font-medium transition-colors duration-200 underline underline-offset-2"
                        >
                          Sign in here
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
