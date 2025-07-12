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
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-100 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-sage-100 to-emerald-100 rounded-full opacity-10 float"></div>
      </div>
      
      <div className="container-custom section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16 fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
              <span className="gradient-text">Food</span>Call
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium text-balance">
              Connecting food donors with orphanages to reduce waste and feed
              those in need
            </p>
          </div>

          {/* Main Content Container */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center slide-up">
            {/* Left Side - Image Section */}
            <div className="order-2 lg:order-1">
              <div className="relative group scale-in">
                {/* Background decoration */}
                <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-gradient-to-br from-sage-200/30 to-emerald-200/30 -z-10 group-hover:from-sage-200/40 group-hover:to-emerald-200/40 transition-all duration-500 float"></div>

                {/* Main image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                    alt="Food donation and community support"
                    className="w-full h-[400px] lg:h-[500px] xl:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105 border-4 border-white"
                    loading="eager"
                  />

                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Floating badge */}
                  <div className="absolute bottom-6 left-6 glass-effect px-6 py-3 rounded-full">
                    <p className="text-sm font-semibold text-sage-700">
                      Making a difference together
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form Section */}
            <div className="order-1 lg:order-2">
              <div className="glass-effect p-8 lg:p-12 xl:p-16 rounded-3xl max-w-2xl mx-auto lg:mx-0 card-enhanced">
                {/* Form Header */}
                <div className="mb-10 space-y-4">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 text-balance">
                    {authType === "login" ? "Welcome Back" : "Join FoodCall"}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg lg:text-xl text-pretty">
                    {authType === "login"
                      ? "Sign in to your account to continue making a difference in your community."
                      : "Create an account to start sharing food or receiving donations for those in need."}
                  </p>
                </div>

                {/* Auth Type Toggle */}
                <div className="mb-10">
                  <div className="flex p-1.5 bg-gradient-to-r from-sage-50 to-emerald-50 rounded-2xl border border-sage-200 shadow-inner">
                    <button
                      onClick={() => setAuthType("login")}
                      className={`flex-1 py-3 px-4 text-center rounded-xl font-semibold transition-all duration-300 ${
                        authType === "login"
                          ? "bg-white text-sage-700 shadow-lg border border-sage-200 transform scale-105"
                          : "text-sage-600 hover:text-sage-700"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthType("register")}
                      className={`flex-1 py-3 px-4 text-center rounded-xl font-semibold transition-all duration-300 ${
                        authType === "register"
                          ? "bg-white text-sage-700 shadow-lg border border-sage-200 transform scale-105"
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
                <div className="mt-10 pt-6 border-t border-sage-100">
                  <p className="text-center text-gray-600 text-lg">
                    {authType === "login" ? (
                      <>
                        Don't have an account yet?{" "}
                        <button
                          onClick={toggleAuthType}
                          className="text-sage-600 hover:text-sage-700 font-semibold transition-colors duration-300 underline underline-offset-2 hover:underline-offset-4"
                        >
                          Create one now
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={toggleAuthType}
                          className="text-sage-600 hover:text-sage-700 font-semibold transition-colors duration-300 underline underline-offset-2 hover:underline-offset-4"
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