
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthForm from '@/components/AuthForm';

const Auth = () => {
  const [authType, setAuthType] = useState('login');
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
      authType === 'login' 
        ? 'Successfully logged in!' 
        : 'Account created successfully!'
    );
  };
  
  const toggleAuthType = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
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
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our community of changemakers connecting food donors with orphanages 
              to reduce waste and feed those in need
            </p>
          </div>

          {/* Auth Form Section */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white p-8 rounded-2xl border-2 border-sage-100 shadow-xl">
                <h2 className="text-3xl font-bold mb-3 text-center text-sage-800">
                  {authType === 'login' ? 'Welcome Back' : 'Join FoodCall'}
                </h2>
                
                <p className="text-muted-foreground mb-8 text-center leading-relaxed">
                  {authType === 'login' 
                    ? 'Sign in to continue your mission of reducing food waste and helping communities in need.'
                    : 'Create your account to start sharing surplus food or accessing donations for your organization.'}
                </p>
                
                {/* Auth Type Toggle */}
                <div className="mb-8">
                  <div className="flex p-1 bg-sage-50 rounded-xl border border-sage-200">
                    <button
                      onClick={() => setAuthType('login')}
                      className={`flex-1 py-3 text-center rounded-lg transition-all font-medium ${
                        authType === 'login' 
                          ? 'bg-white shadow-md text-sage-700 border border-sage-200' 
                          : 'text-sage-600 hover:text-sage-700'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthType('register')}
                      className={`flex-1 py-3 text-center rounded-lg transition-all font-medium ${
                        authType === 'register' 
                          ? 'bg-white shadow-md text-sage-700 border border-sage-200' 
                          : 'text-sage-600 hover:text-sage-700'
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
                    {authType === 'login' ? (
                      <>
                        New to FoodCall?{' '}
                        <button 
                          onClick={toggleAuthType}
                          className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
                        >
                          Create your account
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
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
