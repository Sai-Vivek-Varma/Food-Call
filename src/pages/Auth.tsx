
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';

const Auth = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  
  // Add scroll-to-top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSuccess = () => {
    toast.success(
      authType === 'login' 
        ? 'Successfully logged in!' 
        : 'Account created successfully!'
    );
    
    // Navigation is handled in the AuthForm component
  };
  
  const toggleAuthType = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
            
            <div className="md:pl-8">
              <div className="max-w-md mx-auto md:mx-0">
                <h1 className="text-3xl font-bold mb-2">
                  {authType === 'login' ? 'Welcome Back' : 'Join FoodCall'}
                </h1>
                
                <p className="text-muted-foreground mb-8">
                  {authType === 'login' 
                    ? 'Sign in to your account to continue your journey in reducing food waste and helping those in need.'
                    : 'Create an account to start sharing surplus food or accessing donations for your orphanage.'}
                </p>
                
                <div className="mb-8">
                  <div className="flex p-1 bg-secondary rounded-lg">
                    <button
                      onClick={() => setAuthType('login')}
                      className={`flex-1 py-2 text-center rounded-md transition-colors ${
                        authType === 'login' ? 'bg-white shadow-sm' : ''
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthType('register')}
                      className={`flex-1 py-2 text-center rounded-md transition-colors ${
                        authType === 'register' ? 'bg-white shadow-sm' : ''
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>
                
                <AuthForm type={authType} onSuccess={handleSuccess} />
                
                <p className="text-center mt-8 text-muted-foreground">
                  {authType === 'login' ? (
                    <>
                      Don't have an account yet?{' '}
                      <button 
                        onClick={toggleAuthType}
                        className="text-sage-500 hover:text-sage-600 font-medium"
                      >
                        Create one now
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button 
                        onClick={toggleAuthType}
                        className="text-sage-500 hover:text-sage-600 font-medium"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Auth;
