
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, AuthFormData } from '@/lib/types';

interface AuthFormProps {
  type: 'login' | 'register';
  onSuccess: () => void;
}

const AuthForm = ({ type, onSuccess }: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
    role: 'donor',
    organization: '',
  });
  
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const isLogin = type === 'login';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof AuthFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<AuthFormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (formData.role === 'orphanage' && !formData.organization) {
        newErrors.organization = 'Organization name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes, just simulate API call
    setTimeout(() => {
      // In a real app, this would be a call to your auth API
      try {
        console.log('Auth data submitted:', formData);
        
        // Just for demo - store in localStorage
        // In a real app, this would set proper auth tokens and state
        localStorage.setItem('foodShareUser', JSON.stringify({
          id: 'user-' + Math.random().toString(36).substring(2, 9),
          email: formData.email,
          name: formData.name || 'User',
          role: formData.role,
          organization: formData.organization,
          createdAt: new Date(),
        }));
        
        // Redirect based on role
        if (formData.role === 'donor') {
          navigate('/dashboard');
        } else {
          navigate('/donations');
        }
        
        onSuccess();
      } catch (error) {
        console.error('Auth error:', error);
        // Show error toast
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
      {!isLogin && (
        <>
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-foreground mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label 
              htmlFor="role" 
              className="block text-sm font-medium text-foreground mb-1"
            >
              I am a
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
            >
              <option value="donor">Food Donor</option>
              <option value="orphanage">Orphanage</option>
            </select>
          </div>
          
          {formData.role === 'orphanage' && (
            <div>
              <label 
                htmlFor="organization" 
                className="block text-sm font-medium text-foreground mb-1"
              >
                Organization Name
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                placeholder="Enter your organization name"
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
              )}
            </div>
          )}
        </>
      )}
      
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-foreground mb-1"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-foreground mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary"
      >
        {isLoading ? (
          'Please wait...'
        ) : isLogin ? (
          'Sign In'
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default AuthForm;
