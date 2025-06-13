
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { registerUser, loginUser } from '../lib/api';

const AuthForm = ({ type, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'donor',
    organization: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (type === 'login') {
        response = await loginUser({
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await registerUser(formData);
      }

      // Store user data and token
      localStorage.setItem('foodShareUser', JSON.stringify(response.user));
      localStorage.setItem('foodShareToken', response.token);
      
      onSuccess();
      navigate('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.message || `Failed to ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {type === 'register' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            >
              <option value="donor">Food Donor</option>
              <option value="orphanage">Orphanage</option>
            </select>
          </div>

          {formData.role === 'orphanage' && (
            <div className="space-y-2">
              <Label htmlFor="organization">Organization Name</Label>
              <Input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
          )}
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 text-lg font-semibold"
      >
        {isLoading ? 'Please wait...' : (type === 'login' ? 'Sign In' : 'Create Account')}
      </Button>
    </form>
  );
};

export default AuthForm;
