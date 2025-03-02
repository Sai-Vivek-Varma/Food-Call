
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
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      <section className="py-5 mt-5">
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 d-none d-lg-block">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-sage-200 opacity-50 rounded translate-x-n10 translate-y-n10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Food donation" 
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="px-4 py-5">
                <h1 className="fw-bold mb-2">
                  {authType === 'login' ? 'Welcome Back' : 'Join FoodShare'}
                </h1>
                
                <p className="text-muted mb-4">
                  {authType === 'login' 
                    ? 'Sign in to your account to continue your journey in reducing food waste and helping those in need.'
                    : 'Create an account to start sharing surplus food or accessing donations for your orphanage.'}
                </p>
                
                <div className="bg-light rounded p-1 d-inline-flex mb-4">
                  <button
                    onClick={() => setAuthType('login')}
                    className={`btn ${
                      authType === 'login' ? 'btn-white shadow-sm' : 'btn-light'
                    } rounded-3`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthType('register')}
                    className={`btn ${
                      authType === 'register' ? 'btn-white shadow-sm' : 'btn-light'
                    } rounded-3 ms-1`}
                  >
                    Register
                  </button>
                </div>
                
                <AuthForm type={authType} onSuccess={handleSuccess} />
                
                <p className="text-center mt-4 text-muted">
                  {authType === 'login' ? (
                    <>
                      Don't have an account yet?{' '}
                      <button 
                        onClick={toggleAuthType}
                        className="btn btn-link text-sage-500 p-0 border-0"
                      >
                        Create one now
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button 
                        onClick={toggleAuthType}
                        className="btn btn-link text-sage-500 p-0 border-0"
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
