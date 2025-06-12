
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Package } from 'lucide-react';

const Auth = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-700 mb-4">
            <span className="text-sage-500">Food</span>Call
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting food donors with orphanages to reduce waste and feed those in need
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

        <div className="bg-white p-8 rounded-xl border border-border shadow-sm max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Get Started</h2>
          <p className="text-muted-foreground mb-6">
            Click the Sign In button in the navigation to create an account or log in.
          </p>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground text-left">
              <p className="font-medium text-foreground mb-1">As a Food Donor:</p>
              <p>• Share surplus food from your restaurant, bakery, or home</p>
              <p>• Set pickup times and locations</p>
              <p>• Track your donations and impact</p>
            </div>
            <div className="text-sm text-muted-foreground text-left">
              <p className="font-medium text-foreground mb-1">As an Orphanage:</p>
              <p>• Browse available food donations</p>
              <p>• Reserve items for your organization</p>
              <p>• Coordinate pickup with donors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
