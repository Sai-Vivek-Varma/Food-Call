
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Package, Clock, CheckCircle, Users, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem("foodShareUser");
    if (!userJson) {
      navigate("/auth");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userJson);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/auth");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-4">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xl text-gray-600">
              {user.role === 'donor' 
                ? 'Ready to share some surplus food and make a difference?'
                : 'Let\'s find some donations for your community.'
              }
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sage-100">
              <div className="flex items-center justify-between mb-4">
                <Package className="w-10 h-10 text-sage-600" />
                <span className="text-3xl font-bold text-sage-800">12</span>
              </div>
              <h3 className="font-semibold text-sage-800 mb-2">
                {user.role === 'donor' ? 'Total Donations' : 'Items Received'}
              </h3>
              <p className="text-gray-600 text-sm">This month</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sage-100">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-10 h-10 text-orange-500" />
                <span className="text-3xl font-bold text-sage-800">3</span>
              </div>
              <h3 className="font-semibold text-sage-800 mb-2">Pending</h3>
              <p className="text-gray-600 text-sm">Awaiting pickup</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-sage-100">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-10 h-10 text-red-500" />
                <span className="text-3xl font-bold text-sage-800">450</span>
              </div>
              <h3 className="font-semibold text-sage-800 mb-2">People Helped</h3>
              <p className="text-gray-600 text-sm">Total impact</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-sage-100 p-8 mb-12">
            <h2 className="text-2xl font-bold text-sage-800 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {user.role === 'donor' ? (
                <>
                  <button className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200">
                    <Plus className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">Create New Donation</h3>
                      <p className="text-gray-600 text-sm">Share your surplus food</p>
                    </div>
                  </button>
                  <button className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200">
                    <Package className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">View My Donations</h3>
                      <p className="text-gray-600 text-sm">Track your contributions</p>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/donations')}
                    className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200"
                  >
                    <Package className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">Browse Donations</h3>
                      <p className="text-gray-600 text-sm">Find available food</p>
                    </div>
                  </button>
                  <button className="flex items-center p-6 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors border border-sage-200">
                    <Users className="w-8 h-8 text-sage-600 mr-4" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sage-800">My Reservations</h3>
                      <p className="text-gray-600 text-sm">Track reserved items</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-sage-100 p-8">
            <h2 className="text-2xl font-bold text-sage-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4" />
                <div>
                  <p className="font-medium text-green-800">
                    {user.role === 'donor' 
                      ? 'Your donation of fresh vegetables was picked up'
                      : 'Successfully received donation from Local Restaurant'
                    }
                  </p>
                  <p className="text-green-600 text-sm">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-blue-800">
                    {user.role === 'donor' 
                      ? 'New reservation on your bread donation'
                      : 'Your reservation for fruit donation is confirmed'
                    }
                  </p>
                  <p className="text-blue-600 text-sm">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
