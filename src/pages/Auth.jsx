import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
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
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-sage-700 mb-4">
            <span className="text-sage-500">Food</span>Call
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {authType === "login"
              ? "Welcome back to our community of changemakers"
              : "Join our mission to reduce food waste and feed communities"}
          </p>
        </div>

        {/* Auth Form Section */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-sage-100">
          <h2 className="text-3xl font-bold mb-6 text-center text-sage-800">
            {authType === "login" ? "Sign In" : "Create Account"}
          </h2>

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
            <p className="text-gray-600">
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
  );
};

export default Auth;
