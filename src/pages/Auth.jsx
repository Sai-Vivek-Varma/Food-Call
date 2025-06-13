import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userJson = localStorage.getItem("foodShareUser");
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [navigate]);

  const handleSuccess = () => {
    toast.success(
      authType === "login"
        ? "Successfully logged in!"
        : "Account created successfully!"
    );
  };

  const toggleAuthType = () => {
    setAuthType(authType === "login" ? "register" : "login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-sage-700 mb-6">
              <span className="text-sage-500">Food</span>Call
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting food donors with orphanages to reduce waste and feed
              those in need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Food</h3>
              <p className="text-muted-foreground text-sm">
                Donate surplus food instead of letting it go to waste
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Help Communities</h3>
              <p className="text-muted-foreground text-sm">
                Connect orphanages with nutritious meals for children
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-sage-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reduce Waste</h3>
              <p className="text-muted-foreground text-sm">
                Make a positive environmental impact by reducing food waste
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-sage-200/50 -z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                  alt="Food donation"
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-xl border border-border shadow-sm max-w-md mx-auto md:mx-0">
                <h2 className="text-3xl font-bold mb-2">
                  {authType === "login" ? "Welcome Back" : "Join FoodCall"}
                </h2>

                <p className="text-muted-foreground mb-8">
                  {authType === "login"
                    ? "Sign in to your account to continue your journey in reducing food waste and helping those in need."
                    : "Create an account to start sharing surplus food or accessing donations for your orphanage."}
                </p>

                {/* Auth Type Toggle */}
                <div className="mb-8">
                  <div className="flex p-1 bg-sage-50 rounded-xl border border-sage-200">
                    <button
                      onClick={() => setAuthType("login")}
                      className={`flex-1 py-3 text-center rounded-lg transition-all font-medium ${
                        authType === "login"
                          ? "bg-white shadow-md text-sage-700 border border-sage-200"
                          : "text-sage-600 hover:text-sage-700"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthType("register")}
                      className={`flex-1 py-3 text-center rounded-lg transition-all font-medium ${
                        authType === "register"
                          ? "bg-white shadow-md text-sage-700 border border-sage-200"
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
                <div className="text-center mt-8 pt-6 border-t border-sage-100">
                  <p className="text-muted-foreground">
                    {authType === "login" ? (
                      <>
                        New to FoodCall?{" "}
                        <button
                          onClick={toggleAuthType}
                          className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
                        >
                          Create your account
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={toggleAuthType}
                          className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
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
