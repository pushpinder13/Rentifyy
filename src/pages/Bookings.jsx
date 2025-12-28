import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Get bookings from localStorage using user-specific key
    const userBookingKey = `userBookings_${user.email}`;
    const savedBookings = JSON.parse(localStorage.getItem(userBookingKey) || '[]');
    
    // Filter bookings based on user role
    let filteredBookings;
    if (user.role === 'admin') {
      // Admin can see all bookings from all users
      const allBookings = [];
      // Get all user booking keys from localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('userBookings_')) {
          const userBookings = JSON.parse(localStorage.getItem(key) || '[]');
          allBookings.push(...userBookings);
        }
      }
      filteredBookings = allBookings;
    } else {
      // Regular users can only see their own bookings
      filteredBookings = savedBookings;
    }
    
    setBookings(filteredBookings);
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
            {user?.role === 'admin' ? 'All Bookings' : 'My Bookings'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'admin' ? 'Manage all property reservations' : 'Manage your property reservations'}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-8xl mb-6">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No bookings yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring our amazing properties and make your first booking!
            </p>
            <Link
              to="/listings"
              className="btn-primary-enhanced"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{booking.propertyTitle}</h3>
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
                      {user?.role === 'admin' && booking.userEmail && (
                        <>
                          <span>•</span>
                          <span>Guest: {booking.userEmail}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6 text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      ₹{booking.total?.toLocaleString()}
                    </div>
                    <div className="space-y-2">
                      <button className="btn-secondary-enhanced text-sm px-4 py-2">
                        View Details
                      </button>
                      <button className="btn-primary-enhanced text-sm px-4 py-2 ml-2">
                        Contact Host
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;