import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    properties: 0,
    bookings: 0,
    revenue: 0,
    views: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    smsAlerts: true,
    weeklyReports: false,
    marketing: false
  });
  const [savedMessage, setSavedMessage] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);

  useEffect(() => {
    // Wait for auth loading to complete before checking user
    if (authLoading) return;
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role === 'admin') {
      navigate('/admin-panel', { replace: true });
      return;
    }

    // Load real bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    setRecentBookings(savedBookings);
    
    // Load user properties from localStorage
    const savedProperties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    setUserProperties(savedProperties);
    
    // Load saved/favorited properties from localStorage
    const favoriteProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    setSavedProperties(favoriteProperties);

    // Simulate loading stats based on user role
    if (user?.role === 'owner') {
      setStats({
        properties: 12,
        bookings: 28,
        revenue: 45000,
        views: 1250
      });
    } else {
      setStats({
        bookings: savedBookings.length,
        properties: savedProperties.length,
        favorites: favoriteProperties.length,
        views: 0
      });
    }
    // Initialize profile data
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+91 98765 43210'
      });
    }
  }, [user, navigate, authLoading]);

  const handleProfileSave = () => {
    const updatedUser = { ...user, ...profileData };
    updateUser(updatedUser);
    setSavedMessage('Profile updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleNotificationSave = () => {
    setSavedMessage('Notification preferences saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect admin users to admin panel
  if (user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to admin panel...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'properties', label: 'My Properties', icon: '🏠' },
    { id: 'saved', label: 'Saved Properties', icon: '❤️' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const recentProperties = [
    { id: 1, title: 'Manhattan Penthouse', location: 'New York', price: '$8,500/mo', status: 'Active', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300' },
    { id: 2, title: 'Beverly Hills Villa', location: 'California', price: '$12,000/mo', status: 'Booked', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300' },
    { id: 3, title: 'Miami Beach Estate', location: 'Florida', price: '$15,500/mo', status: 'Active', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300' }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
            <p className="opacity-90">
              {user?.role === 'owner' 
                ? 'Manage your properties and track your earnings' 
                : 'Discover amazing properties and manage your bookings'
              }
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">{user?.role === 'owner' ? '🏠' : '✈️'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.role === 'owner' ? (
          <>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stats.properties}</div>
              <div className="text-gray-600">Active Properties</div>
            </div>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">₹{stats.revenue.toLocaleString()}</div>
              <div className="text-gray-600">Total Earnings</div>
            </div>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📅</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stats.bookings}</div>
              <div className="text-gray-600">Total Bookings</div>
            </div>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👁️</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stats.views}</div>
              <div className="text-gray-600">Profile Views</div>
            </div>
          </>
        ) : (
          <>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📅</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stats.bookings}</div>
              <div className="text-gray-600">My Bookings</div>
            </div>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stats.properties}</div>
              <div className="text-gray-600">My Properties</div>
            </div>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">❤️</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stats.favorites}</div>
              <div className="text-gray-600">Saved Properties</div>
            </div>
            <div className="luxury-card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stats.reviews || 3}</div>
              <div className="text-gray-600">Reviews Given</div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="luxury-card p-6">
        <h3 className="font-serif text-xl font-bold mb-6 flex items-center">
          <span className="text-2xl mr-3">⚡</span>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user?.role === 'owner' ? (
            <>
              <button className="btn-luxury text-center p-4 hover:scale-105 transition-transform">
                <span className="text-2xl mb-2 block">➕</span>
                Add New Property
              </button>
              <button className="btn-outline p-4 hover:scale-105 transition-transform">
                <span className="text-2xl mb-2 block">📊</span>
                View Analytics
              </button>
              <button className="btn-outline p-4 hover:scale-105 transition-transform">
                <span className="text-2xl mb-2 block">💬</span>
                Messages
              </button>
            </>
          ) : (
            <>
              <Link to="/listings" className="btn-luxury text-center p-4 hover:scale-105 transition-transform block">
                <span className="text-2xl mb-2 block">🔍</span>
                Browse Properties
              </Link>
              <Link to="/create-listing" className="btn-luxury text-center p-4 hover:scale-105 transition-transform block">
                <span className="text-2xl mb-2 block">➕</span>
                List My Property
              </Link>
              <button 
                onClick={() => setActiveTab('bookings')}
                className="btn-outline p-4 hover:scale-105 transition-transform"
              >
                <span className="text-2xl mb-2 block">🎫</span>
                My Bookings
              </button>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="luxury-card p-6">
          <h3 className="font-serif text-xl font-bold mb-6 flex items-center">
            <span className="text-2xl mr-3">📅</span>
            Recent Bookings
          </h3>
          <div className="space-y-4">
            {recentBookings.length > 0 ? (
              recentBookings.slice(0, 3).map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{booking.propertyTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {booking.checkIn} to {booking.checkOut}
                    </p>
                    <p className="text-sm text-gray-500">{booking.guests} guests • {booking.nights} nights</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">₹{booking.total?.toLocaleString()}</div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Confirmed
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📅</div>
                <p>No bookings yet</p>
                <Link to="/listings" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                  Browse Properties
                </Link>
              </div>
            )}
          </div>
          {recentBookings.length > 0 && (
            <div className="mt-4 text-center">
              <Link to="/bookings" className="text-orange-500 hover:text-orange-600 font-medium">
                View All Bookings →
              </Link>
            </div>
          )}
        </div>

        <div className="luxury-card p-6">
          <h3 className="font-serif text-xl font-bold mb-6 flex items-center">
            <span className="text-2xl mr-3">📈</span>
            {user?.role === 'owner' ? 'Performance' : 'Activity'}
          </h3>
          <div className="space-y-4">
            {user?.role === 'owner' ? (
              <>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📈</span>
                    <div>
                      <div className="font-semibold text-green-800">Revenue Growth</div>
                      <div className="text-sm text-green-600">This month vs last month</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">+23%</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">👁️</span>
                    <div>
                      <div className="font-semibold text-blue-800">Profile Views</div>
                      <div className="text-sm text-blue-600">Last 7 days</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">+156</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⭐</span>
                    <div>
                      <div className="font-semibold text-orange-800">Average Rating</div>
                      <div className="text-sm text-orange-600">All properties</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">4.8</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <div className="font-semibold text-purple-800">Next Trip</div>
                      <div className="text-sm text-purple-600">Beach Villa, Goa</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-purple-600">Dec 25</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">💰</span>
                    <div>
                      <div className="font-semibold text-green-800">Money Saved</div>
                      <div className="text-sm text-green-600">With coupons & deals</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-600">₹15,000</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🏆</span>
                    <div>
                      <div className="font-semibold text-yellow-800">Member Status</div>
                      <div className="text-sm text-yellow-600">Gold Member</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-yellow-600">Level 3</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-2xl font-bold">My Properties</h3>
        <Link to="/create-listing" className="btn-luxury">
          + Add Property
        </Link>
      </div>
      
      {userProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProperties.map((property) => (
            <div key={property.id} className="luxury-card hover-lift">
              <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover rounded-t-2xl" />
              <div className="p-6">
                <h4 className="font-serif text-lg font-bold mb-2">{property.title}</h4>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="font-semibold text-gold mb-4">₹{property.price}/month</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {property.status}
                  </span>
                  <button className="btn-outline text-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="luxury-card p-12 text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="font-serif text-2xl font-bold mb-2">No Properties Listed</h3>
          <p className="text-gray-600 mb-6">Start earning by listing your first property!</p>
          <Link to="/create-listing" className="btn-luxury">
            List Your Property
          </Link>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h3 className="font-serif text-2xl font-bold">Account Settings</h3>
      
      {savedMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {savedMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="luxury-card p-6">
          <h4 className="font-serif text-lg font-bold mb-4">Profile Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="luxury-input" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="luxury-input" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input 
                type="tel" 
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="luxury-input" 
              />
            </div>
            <button 
              onClick={handleProfileSave}
              className="btn-luxury hover:scale-105 transition-transform"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="luxury-card p-6">
          <h4 className="font-serif text-lg font-bold mb-4">Notifications</h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                checked={notifications.emailBookings}
                onChange={(e) => setNotifications({...notifications, emailBookings: e.target.checked})}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700">Email notifications for new bookings</span>
            </label>
            <label className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                checked={notifications.smsAlerts}
                onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700">SMS alerts for urgent messages</span>
            </label>
            <label className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                checked={notifications.weeklyReports}
                onChange={(e) => setNotifications({...notifications, weeklyReports: e.target.checked})}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700">Weekly performance reports</span>
            </label>
            <label className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                checked={notifications.marketing}
                onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700">Marketing communications</span>
            </label>
            <button 
              onClick={handleNotificationSave}
              className="btn-outline hover:scale-105 transition-transform"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen" style={{background: 'var(--cream)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold gradient-text mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 capitalize">
            {user?.role} Dashboard • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="luxury-card p-2">
            <nav className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'gradient-gold text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'properties' && renderProperties()}
          {activeTab === 'saved' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl font-bold">Saved Properties</h3>
                <Link to="/listings" className="btn-luxury">
                  Browse More
                </Link>
              </div>
              
              {savedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
                    <div key={property.id} className="luxury-card hover-lift">
                      <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-t-2xl" />
                      <div className="p-6">
                        <h4 className="font-serif text-lg font-bold mb-2">{property.title}</h4>
                        <p className="text-gray-600 mb-2">{property.location}</p>
                        <p className="font-semibold text-gold mb-4">₹{property.price}/night</p>
                        <div className="flex justify-between items-center">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            Saved
                          </span>
                          <button className="btn-outline text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="luxury-card p-12 text-center">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="font-serif text-2xl font-bold mb-2">No Saved Properties</h3>
                  <p className="text-gray-600 mb-6">Start saving properties you love!</p>
                  <Link to="/listings" className="btn-luxury">
                    Browse Properties
                  </Link>
                </div>
              )}
            </div>
          )}
          {activeTab === 'settings' && renderSettings()}
          {(activeTab === 'bookings') && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl font-bold">My Bookings</h3>
                <Link to="/bookings" className="btn-luxury">
                  View All Bookings
                </Link>
              </div>
              
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => (
                    <div key={index} className="luxury-card p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="text-xl font-bold text-gray-900">{booking.propertyTitle}</h4>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                              Confirmed
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4l2 2 4-4" />
                              </svg>
                              <span className="text-sm">Check-in: {booking.checkIn}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4l2 2 4-4" />
                              </svg>
                              <span className="text-sm">Check-out: {booking.checkOut}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span className="text-sm">{booking.guests} guests</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{booking.nights} nights</span>
                            <span>•</span>
                            <span>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-6 text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-2">
                            ₹{booking.total?.toLocaleString()}
                          </div>
                          <div className="space-y-2">
                            <button className="btn-outline text-sm px-4 py-2">
                              View Details
                            </button>
                            <button className="btn-luxury text-sm px-4 py-2 ml-2">
                              Contact Host
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="luxury-card p-12 text-center">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="font-serif text-2xl font-bold mb-2">No Bookings Yet</h3>
                  <p className="text-gray-600 mb-6">Start exploring our amazing properties!</p>
                  <Link to="/listings" className="btn-luxury">
                    Browse Properties
                  </Link>
                </div>
              )}
            </div>
          )}
          {activeTab === 'messages' && (
            <div className="luxury-card p-12 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="font-serif text-2xl font-bold mb-2">Coming Soon</h3>
              <p className="text-gray-600">This feature is under development</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Property Modal */}
      {showPropertyModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button 
                onClick={() => setShowPropertyModal(false)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h2>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-1">📍</span>
                    {selectedProperty.location}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedProperty.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedProperty.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500 mb-1">{selectedProperty.price}</div>
                  <div className="text-sm text-gray-600">per night</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500 mb-1">4.8 ⭐</div>
                  <div className="text-sm text-gray-600">Rating (124 reviews)</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Property Features</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-xl mb-1">🛏️</div>
                    <div className="text-sm font-medium">3 Bedrooms</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl mb-1">🛿</div>
                    <div className="text-sm font-medium">2 Bathrooms</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xl mb-1">👥</div>
                    <div className="text-sm font-medium">6 Guests</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 'Gym'].map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                {user?.role === 'owner' ? (
                  <>
                    <button className="btn-luxury flex-1">Edit Property</button>
                    <button className="btn-outline flex-1">View Analytics</button>
                  </>
                ) : (
                  <>
                    <button className="btn-luxury flex-1">Book Now</button>
                    <button className="btn-outline flex-1">Save to Favorites</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;