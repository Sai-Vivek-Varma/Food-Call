
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthForm from '../components/AuthForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful authentication
      // In a real app, this would be an API call
      
      // For demo purposes, create a mock user object
      const user = {
        id: '123',
        name: formData.name || 'Demo User',
        email: formData.email,
        role: formData.userType || 'donor', // Default to donor if not specified
        avatar: null
      };
      
      // Store user in localStorage (in a real app, you'd store a token)
      localStorage.setItem('foodCallUser', JSON.stringify(user));
      
      // Show success message
      toast.success(`${isLogin ? 'Login' : 'Registration'} successful!`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(`Failed to ${isLogin ? 'login' : 'register'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-border">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold mb-2">
                {isLogin ? 'Welcome Back!' : 'Join Food Call'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? 'Sign in to access your account' 
                  : 'Create an account to start sharing food'}
              </p>
            </div>
            
            <AuthForm 
              isLogin={isLogin}
              loading={loading}
              onSubmit={handleAuth}
            />
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-sage-600 hover:text-sage-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
