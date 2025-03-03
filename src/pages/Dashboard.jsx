
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { PackageOpen, CalendarClock, ListChecks, UserCircle, LogOut, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data for donation history
const getDonationHistory = (userId, userRole) => {
  if (userRole === 'donor') {
    return [
      {
        id: 'd1',
        title: 'Fresh Vegetables Assortment',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'available',
        quantity: '15kg',
        reservedBy: null
      },
      {
        id: 'd2',
        title: 'Bread and Pastries',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: 'reserved',
        quantity: '25 items',
        reservedBy: 'Hope Children\'s Home'
      },
      {
        id: 'd3',
        title: 'Canned Goods',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 'completed',
        quantity: '30 cans',
        reservedBy: 'Sunshine Orphanage'
      }
    ];
  } else {
    return [
      {
        id: 'r1',
        title: 'Bread and Pastries',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'reserved',
        quantity: '25 items',
        donatedBy: 'City Bakery'
      },
      {
        id: 'r2',
        title: 'Rice and Pasta',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: 'completed',
        quantity: '10kg',
        donatedBy: 'Restaurant Supply Co.'
      }
    ];
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const userJson = localStorage.getItem('foodCallUser');
    if (!userJson) {
      // Redirect to login if not logged in
      navigate('/auth');
      return;
    }
    
    try {
      const userData = JSON.parse(userJson);
      setUser(userData);
      
      // Fetch donation history
      setTimeout(() => {
        const historyData = getDonationHistory(userData.id, userData.role);
        setHistory(historyData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/auth');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('foodCallUser');
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  if (!user || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mr-4">
                    <UserCircle className="w-8 h-8 text-sage-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-1 mb-6">
                  <div className="text-xs uppercase text-muted-foreground font-medium mb-2">Account Type</div>
                  <div className="bg-sage-50 text-sage-700 px-3 py-1 rounded-full text-sm inline-block">
                    {user.role === 'donor' ? 'Food Donor' : 'Orphanage'}
                  </div>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Dashboard</h2>
                  
                  {user.role === 'donor' && (
                    <Link to="/donate" className="btn-primary inline-flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Donate Food
                    </Link>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-sage-50 rounded-lg p-4 flex items-center">
                    <PackageOpen className="w-10 h-10 text-sage-500 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {user.role === 'donor' ? 'Total Donated' : 'Total Received'}
                      </p>
                      <p className="text-2xl font-bold">{history.length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-sage-50 rounded-lg p-4 flex items-center">
                    <CalendarClock className="w-10 h-10 text-sage-500 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {user.role === 'donor' ? 'Active Donations' : 'Reserved Items'}
                      </p>
                      <p className="text-2xl font-bold">
                        {history.filter(item => item.status === 'available' || item.status === 'reserved').length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-sage-50 rounded-lg p-4 flex items-center">
                    <ListChecks className="w-10 h-10 text-sage-500 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">
                        {history.filter(item => item.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Recent Activity</h3>
                    
                    {user.role === 'donor' ? (
                      <Link to="/donations" className="text-sm text-sage-600 hover:text-sage-700">
                        View My Donations
                      </Link>
                    ) : (
                      <Link to="/donations" className="text-sm text-sage-600 hover:text-sage-700">
                        Browse Available Food
                      </Link>
                    )}
                  </div>
                  
                  {history.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-muted-foreground">No activity yet</p>
                      {user.role === 'donor' && (
                        <Link to="/donate" className="mt-2 inline-block text-sage-600 hover:text-sage-700">
                          Start by donating food
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {history.map(item => (
                        <div key={item.id} className="py-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{formatDate(item.date)}</span>
                              <span className="mx-2">•</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                            {user.role === 'donor' && item.reservedBy && (
                              <p className="text-sm mt-1">Reserved by: <span className="text-sage-600">{item.reservedBy}</span></p>
                            )}
                            {user.role === 'orphanage' && item.donatedBy && (
                              <p className="text-sm mt-1">Donated by: <span className="text-sage-600">{item.donatedBy}</span></p>
                            )}
                          </div>
                          
                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.status === 'available'
                                  ? 'bg-green-100 text-green-700'
                                  : item.status === 'reserved'
                                  ? 'bg-blue-100 text-blue-700'
                                  : item.status === 'completed'
                                  ? 'bg-sage-100 text-sage-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h3 className="font-semibold mb-4">
                    {user.role === 'donor' ? 'Donation Tips' : 'Food Pickup Tips'}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {user.role === 'donor' ? (
                      <>
                        <li>• Provide accurate expiry dates for all food items</li>
                        <li>• Ensure food is properly packaged and sealed</li>
                        <li>• Include detailed pickup instructions and location</li>
                        <li>• Be responsive to orphanage queries about donations</li>
                      </>
                    ) : (
                      <>
                        <li>• Confirm pickup time with donors beforehand</li>
                        <li>• Bring proper containers for transporting food</li>
                        <li>• Check food quality before accepting donations</li>
                        <li>• Update the system once pickup is completed</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <Link 
                      to={user.role === 'donor' ? '/donate' : '/donations'} 
                      className="block bg-sage-50 hover:bg-sage-100 p-3 rounded-lg transition-colors"
                    >
                      {user.role === 'donor' ? 'Create New Donation' : 'Browse Available Food'}
                    </Link>
                    <Link 
                      to="/how-it-works" 
                      className="block bg-sage-50 hover:bg-sage-100 p-3 rounded-lg transition-colors"
                    >
                      How Food Call Works
                    </Link>
                    <Link 
                      to="/donations" 
                      className="block bg-sage-50 hover:bg-sage-100 p-3 rounded-lg transition-colors"
                    >
                      View All Donations
                    </Link>
                  </div>
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
