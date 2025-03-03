
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthFormData } from '@/lib/types';

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
    organization: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (type === 'register' && !formData.name) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!formData.email) {
      toast.error('Please enter your email');
      return;
    }
    
    if (!formData.password) {
      toast.error('Please enter your password');
      return;
    }
    
    if (type === 'register' && formData.role === 'orphanage' && !formData.organization) {
      toast.error('Please enter your organization name');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call (for demo purposes)
    setTimeout(() => {
      try {
        // Create a user object
        const user = {
          id: type === 'login' ? 'existing-user-123' : `new-user-${Date.now()}`,
          email: formData.email,
          name: type === 'login' ? 'John Doe' : formData.name,
          role: type === 'login' ? 'donor' : formData.role,
          organization: formData.organization || undefined,
          createdAt: new Date(),
        };
        
        // Store in localStorage for demo
        localStorage.setItem('foodShareUser', JSON.stringify(user));
        
        // Call success callback
        onSuccess();
        
        // Navigate to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Auth error:', error);
        toast.error(
          type === 'login' 
            ? 'Failed to sign in. Please check your credentials.' 
            : 'Failed to create account. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      {type === 'register' && (
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-outline-secondary"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {type === 'register' && (
        <>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="donor">Food Donor</option>
              <option value="orphanage">Orphanage</option>
            </select>
          </div>
          
          {formData.role === 'orphanage' && (
            <div className="mb-3">
              <label htmlFor="organization" className="form-label">
                Organization Name
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your organization name"
                required
              />
            </div>
          )}
        </>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-sage w-100 py-2 mt-3"
      >
        {isSubmitting ? (
          <span className="d-flex align-items-center justify-content-center">
            <Loader2 className="spinner-border spinner-border-sm me-2" />
            {type === 'login' ? 'Signing in...' : 'Creating account...'}
          </span>
        ) : (
          type === 'login' ? 'Sign In' : 'Create Account'
        )}
      </button>
    </form>
  );
};

export default AuthForm;
