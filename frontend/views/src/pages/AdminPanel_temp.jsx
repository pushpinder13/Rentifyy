import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Wait for auth loading to complete before checking user
    if (authLoading) return;
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Load admin data
    loadAdminData();
  }, [user, navigate, authLoading]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch real data from API
      const [usersRes, allListingsRes, bookingsRes] = await Promise.all([
        fetch('http://localhost:3000/api/users/', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3000/api/listings/admin/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3000/api/bookings/', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (usersRes.ok && allListingsRes.ok && bookingsRes.ok) {
        const usersData = await usersRes.json();
        const allListingsData = await allListingsRes.json();
        const bookingsData = await bookingsRes.json();
        
        // All properties from database are real properties
        const realProps = allListingsData;
        
        setUsers(usersData.users || []);
        setProperties(allListingsData.map(p => ({ 
          ...p, 
          type: p.status === 'pending' ? 'pending' : 'real' 
        }))); // Add type field based on status
        setBookings(bookingsData.bookings?.map(booking => ({
          id: booking.id,
          property: booking.listing?.title || 'Unknown Property',
          guest: booking.renter?.name || 'Unknown Guest',
          dates: `${booking.start_date} to ${booking.end_date}`,
          amount: booking.total_price || 0,
          status: booking.status
        })) || []);
        
        // Calculate stats from real data
        const totalUsers = usersData.users?.length || 0;
        const pendingProperties = allListingsData.filter(p => p.status === 'pending').length;
        const totalProperties = allListingsData.length;
        const totalBookings = bookingsData.bookings?.length || 0;
        const totalRevenue = bookingsData.bookings?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0;
        
        setStats({
          totalUsers,
          totalProperties,
          totalBookings,
          totalRevenue,
          activeUsers: totalUsers,
          pendingApprovals: pendingProperties,
          monthlyGrowth: 15.8,
          avgRating: 4.7
        });
      } else {
        console.error('Failed to fetch admin data');
        loadMockData();
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      loadMockData();
    }
    setLoading(false);
  };

  const loadMockData = () => {
      const defaultUsers = [
        { id: 1, name: 'John Smith', email: 'john@example.com', role: 'renter', status: 'active', joined: '2024-01-15', bookings: 5 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'owner', status: 'active', joined: '2024-02-20', properties: 3 },
        { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'renter', status: 'pending', joined: '2024-03-10', bookings: 0 },
        { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'owner', status: 'active', joined: '2024-01-05', properties: 8 },
        { id: 5, name: 'Alex Kumar', email: 'alex@example.com', role: 'renter', status: 'suspended', joined: '2024-02-15', bookings: 2 },
        { id: 6, name: 'Lisa Chen', email: 'lisa@example.com', role: 'owner', status: 'pending', joined: '2024-03-20', properties: 1 }
      ];
      
      const defaultProperties = [
        { id: 1, title: 'Luxury Beach Villa', owner: 'Sarah Johnson', location: 'Goa', status: 'active', price: 8500, bookings: 12 },
        { id: 2, title: 'Mountain Retreat', owner: 'Emma Davis', location: 'Himachal', status: 'pending', price: 6200, bookings: 0 },
        { id: 3, title: 'Heritage Palace', owner: 'Raj Patel', location: 'Rajasthan', status: 'active', price: 15000, bookings: 8 },
        { id: 4, title: 'City Apartment', owner: 'Priya Sharma', location: 'Mumbai', status: 'suspended', price: 4500, bookings: 3 }
      ];
      
      const defaultBookings = [
        { id: 1, property: 'Luxury Beach Villa', guest: 'John Smith', dates: 'Dec 15-22, 2024', amount: 59500, status: 'confirmed' },
        { id: 2, property: 'Heritage Palace', guest: 'Mike Wilson', dates: 'Jan 5-12, 2025', amount: 105000, status: 'pending' },
        { id: 3, property: 'Mountain Retreat', guest: 'Lisa Brown', dates: 'Feb 1-8, 2025', amount: 43400, status: 'cancelled' }
      ];
      
      setUsers(defaultUsers);
      setProperties(defaultProperties);
      setBookings(defaultBookings);
      
      // Calculate dynamic stats
      const pendingUsers = defaultUsers.filter(u => u.status === 'pending').length;
      const pendingProperties = defaultProperties.filter(p => p.status === 'pending').length;
      const totalRevenue = defaultBookings.reduce((sum, b) => sum + b.amount, 0);
      const activeUsers = defaultUsers.filter(u => u.status === 'active').length;
      
      setStats({
        totalUsers: defaultUsers.length,
        totalProperties: defaultProperties.length,
        totalBookings: defaultBookings.length,
        totalRevenue: totalRevenue,
        activeUsers: activeUsers,
        pendingApprovals: pendingUsers + pendingProperties,
        monthlyGrowth: 15.8,
        avgRating: 4.7
      });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'pending', label: 'Pending Approvals', icon: '⏳', badge: stats.pendingApprovals },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'properties', label: 'Properties', icon: '🏠' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const updateStats = (newUsers, newProperties, newBookings) => {
    const pendingUsers = newUsers.filter(u => u.status === 'pending').length;
    const pendingProperties = newProperties.filter(p => p.status === 'pending').length;
    const totalRevenue = newBookings.reduce((sum, b) => sum + b.amount, 0);
    const activeUsers = newUsers.filter(u => u.status === 'active').length;
    
    setStats({
      totalUsers: newUsers.length,
      totalProperties: newProperties.length,
      totalBookings: newBookings.length,
      totalRevenue: totalRevenue,
      activeUsers: activeUsers,
      pendingApprovals: pendingUsers + pendingProperties,
      monthlyGrowth: 15.8,
      avgRating: 4.7
    });
  };

  const handleUserAction = async (userId, action) => {
    const user = users.find(u => u.id === userId);
    
    if (action === 'edit') {
      setSelectedItem(user);
      setFormData({ name: user.name, email: user.email, role: user.role });
      setModalType('editUser');
      setShowModal(true);
      return;
    }
    
    if (action === 'remove') {
      if (window.confirm(`Are you sure you want to remove ${user.name}?`)) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            loadAdminData();
            alert('User removed successfully!');
          } else {
            alert('Failed to remove user. Please try again.');
          }
        } catch (error) {
          console.error('Error removing user:', error);
          alert('Error removing user. Please try again.');
        }
      }
      return;
    }

    // Update user status via API
    try {
      const token = localStorage.getItem('token');
      const newStatus = action === 'approve' ? true : false;
      
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: user.name,
          email: user.email,
          role: user.role,
          is_active: newStatus 
        })
      });
      
      if (response.ok) {
        loadAdminData();
        alert(`User ${action}d successfully!`);
      } else {
        console.error('Failed to update user status');
        alert('Failed to update user status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Error updating user status. Please try again.');
    }

  const handlePropertyAction = async (propertyId, action) => {
    const property = properties.find(p => p.id === propertyId);
    
    if (action === 'approve' && property?.type === 'real') {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/users/approve-listing/${propertyId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          loadAdminData();
          alert('Listing approved successfully!');
          return;
        } else {
          console.error('Failed to approve listing');
          alert('Failed to approve listing. Please try again.');
        }
      } catch (error) {
        console.error('Error approving listing:', error);
      }
    }
    
    if (action === 'edit') {
      setSelectedItem(property);
      setFormData({ 
        title: property.title, 
        location: property.location, 
        price: property.price, 
        description: property.description || '',
        owner: property.owner?.name || property.owner || 'System'
      });
      setModalType('editProperty');
      setShowModal(true);
      return;
    }
    
    if (action === 'view') {
      setSelectedItem(property);
      setModalType('viewProperty');
      setShowModal(true);
      return;
    }
    
    if (action === 'reject') {
      if (window.confirm(`Are you sure you want to reject ${property.title}?`)) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/api/users/reject-listing/${propertyId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            loadAdminData();
            alert('Listing rejected successfully!');
          } else {
            console.error('Failed to reject listing');
            alert('Failed to reject listing. Please try again.');
          }
        } catch (error) {
          console.error('Error rejecting listing:', error);
        }
      }
    }
    
    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${property.title}?`)) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/api/listings/${propertyId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            loadAdminData();
            alert('Property deleted successfully!');
          } else {
            console.error('Failed to delete listing');
            alert('Failed to delete property. Please try again.');
          }
        } catch (error) {
          console.error('Error deleting listing:', error);
        }
      }
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    const booking = bookings.find(b => b.id === bookingId);
    
    if (action === 'view') {
      setSelectedItem(booking);
      setModalType('viewBooking');
      setShowModal(true);
      return;
    }

    // Update booking status via API
    try {
      const token = localStorage.getItem('token');
      const newStatus = action === 'approve' ? 'confirmed' : 'cancelled';
      
      const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        loadAdminData(); // Reload all data
        alert(`Booking ${action}d successfully!`);
      } else {
        console.error('Failed to update booking status');
        alert('Failed to update booking status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Error updating booking status. Please try again.');
    }
  };

  const handleAddUser = () => {
    setSelectedItem(null);
    setFormData({ name: '', email: '', role: 'renter' });
    setModalType('addUser');
    setShowModal(true);
  };

  const handleAddProperty = () => {
    setSelectedItem(null);
    setFormData({ title: '', location: '', price: '', owner: '' });
    setModalType('addProperty');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (modalType === 'editUser') {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/users/${selectedItem.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          loadAdminData();
          alert('User updated successfully!');
        } else {
          console.error('Failed to update user');
          alert('Failed to update user. Please try again.');
        }
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Error updating user. Please try again.');
      }
    } else if (modalType === 'addUser') {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/users/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            password: 'defaultPassword123' // Admin should set a proper password
          })
        });
        
        if (response.ok) {
          loadAdminData();
          alert('User created successfully!');
        } else {
          console.error('Failed to create user');
          alert('Failed to create user. Please try again.');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
      }
    } else if (modalType === 'editProperty') {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/listings/${selectedItem.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: formData.title,
            location: formData.location,
            price: Number(formData.price),
            description: formData.description
          })
        });
        
        if (response.ok) {
          loadAdminData();
          alert('Property updated successfully!');
        } else {
          console.error('Failed to update property');
          alert('Failed to update property. Please try again.');
        }
      } catch (error) {
        console.error('Error updating property:', error);
      }
    } else if (modalType === 'addProperty') {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/listings/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: formData.title,
            location: formData.location,
            price: Number(formData.price),
            description: formData.description,
            category_id: 1
          })
        });
        
        if (response.ok) {
          loadAdminData();
          alert('Property created successfully!');
        } else {
          console.error('Failed to create property');
          alert('Failed to create property. Please try again.');
        }
      } catch (error) {
        console.error('Error creating property:', error);
      }
    }
    setShowModal(false);
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers?.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">↗ +{stats.monthlyGrowth}% this month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProperties?.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">🏠</span>
            </div>
          </div>
          <p className="text-sm text-orange-600 mt-2">{stats.pendingApprovals} pending approval</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBookings?.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">📅</span>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">{stats.activeUsers?.toLocaleString()} active users</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">Avg rating: {stats.avgRating}/5.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {users.slice(0, 4).map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email} • {user.role}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 
                  user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {bookings.slice(0, 4).map(booking => (
              <div key={booking.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900">{booking.property}</p>
                  <span className="font-bold text-green-600">₹{booking.amount.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">{booking.guest} • {booking.dates}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPendingApprovals = () => {
    const pendingProperties = properties.filter(p => p.type === 'real' && p.status !== 'available');
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Pending Property Approvals</h2>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {pendingProperties.length} pending
          </div>
        </div>
        
        {pendingProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No properties pending approval at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingProperties.map(property => (
              <div key={property.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        PENDING APPROVAL
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{property.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price per night</p>
                        <p className="font-medium text-gray-900">₹{property.price?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Owner</p>
                        <p className="font-medium text-gray-900">{property.owner?.name || 'Unknown'}</p>
                      </div>
                    </div>
                    
                    {property.description && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="text-gray-900">{property.description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3 ml-6">
                    <button 
                      onClick={() => handlePropertyAction(property.id, 'approve')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Approve</span>
                    </button>
                    <button 
                      onClick={() => handlePropertyAction(property.id, 'view')}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View</span>
                    </button>
                    <button 
                      onClick={() => handlePropertyAction(property.id, 'reject')}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button onClick={handleAddUser} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Add User
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'owner' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.bookings ? `${user.bookings} bookings` : user.properties ? `${user.properties} properties` : 'No activity'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {user.status === 'pending' && (
                      <button 
                        onClick={() => handleUserAction(user.id, 'approve')}
                        className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                    {user.status === 'active' && (
                      <button 
                        onClick={() => handleUserAction(user.id, 'suspend')}
                        className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded"
                      >
                        Suspend
                      </button>
                    )}
                    {user.status === 'suspended' && (
                      <button 
                        onClick={() => handleUserAction(user.id, 'approve')}
                        className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded"
                      >
                        Reactivate
                      </button>
                    )}
                    <button 
                      onClick={() => handleUserAction(user.id, 'edit')}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleUserAction(user.id, 'remove')}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Property Management</h2>
        <button onClick={handleAddProperty} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Add Property
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map(property => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{property.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.owner?.name || 'System'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{property.price?.toLocaleString()}/night
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.type === 'mock' ? 'bg-blue-100 text-blue-800' :
                      property.status === 'available' ? 'bg-green-100 text-green-800' :
                      property.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                      property.status === 'rented' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.type === 'mock' ? 'system' : property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.bookings || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {property.type === 'real' && property.status !== 'available' && (
                      <button 
                        onClick={() => handlePropertyAction(property.id, 'approve')}
                        className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                    <button 
                      onClick={() => handlePropertyAction(property.id, 'edit')}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handlePropertyAction(property.id, 'view')}
                      className="text-gray-600 hover:text-gray-900 bg-gray-50 px-2 py-1 rounded"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handlePropertyAction(property.id, 'delete')}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.guest}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.dates}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{booking.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleBookingAction(booking.id, 'view')}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleBookingAction(booking.id, 'approve')}
                      className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleBookingAction(booking.id, 'cancel')}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-bold text-green-600">₹2.4M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Month</span>
              <span className="font-bold text-gray-900">₹2.1M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth</span>
              <span className="font-bold text-green-600">+14.3%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Active Users</span>
              <span className="font-bold text-blue-600">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Session Time</span>
              <span className="font-bold text-gray-900">12m 34s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bounce Rate</span>
              <span className="font-bold text-orange-600">23.4%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Occupancy</span>
              <span className="font-bold text-purple-600">78.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Rating</span>
              <span className="font-bold text-gray-900">4.7/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Response Rate</span>
              <span className="font-bold text-green-600">94.2%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">📈 Revenue chart would be displayed here</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">📊 User growth chart would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
              <input type="number" defaultValue="10" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Booking Amount</label>
              <input type="number" defaultValue="1000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-approval Threshold</label>
              <input type="number" defaultValue="5000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Access</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Email Verification Required</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Admin Code Requirement</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Enabled</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input type="number" defaultValue="30" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">New User Registration</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Property Approval Needed</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">High-Value Bookings</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">System Alerts</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Enabled</button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Maintenance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Last Backup</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Database Size</span>
              <span className="text-sm text-gray-500">2.4 GB</span>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Create Backup
              </button>
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                System Health Check
              </button>
              <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                Maintenance Mode
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Reset to Defaults
        </button>
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'pending': return renderPendingApprovals();
      case 'users': return renderUsers();
      case 'properties': return renderProperties();
      case 'bookings': return renderBookings();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage users, properties, and system settings</p>
            </div>
            <button 
              onClick={loadAdminData}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh Data</span>
            </button>
          </div>
          
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                  {tab.badge && tab.badge > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};
