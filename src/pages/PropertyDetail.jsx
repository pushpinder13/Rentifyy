import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2
  });
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock property data based on ID
  const mockProperties = {
    1: {
      id: 1,
      title: "Luxury Beach Villa in Goa",
      location: "Candolim, North Goa",
      type: "Villa",
      price: 8500,
      rating: 4.8,
      reviews: 124,
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      area: "3500 sq ft",
      amenities: ["WiFi", "Pool", "AC", "Kitchen", "Parking", "Balcony", "Garden", "BBQ Area"],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop"
      ],
      description: "Experience luxury at its finest in this stunning beachfront villa located in the heart of Candolim, Goa. This beautiful property features a private swimming pool, spacious bedrooms, and modern amenities perfect for a memorable vacation with family and friends.",
      host: {
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        joinedYear: 2019,
        rating: 4.8,
        verified: true
      },
      rules: [
        "Check-in: 3:00 PM - 9:00 PM",
        "Check-out: 11:00 AM",
        "No smoking inside the property",
        "No parties or events",
        "Pets allowed with prior approval"
      ]
    },
    2: {
      id: 2,
      title: "Mountain Villa in Shimla",
      location: "Mall Road, Shimla",
      type: "Villa",
      price: 6200,
      rating: 4.9,
      reviews: 89,
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      area: "2800 sq ft",
      amenities: ["WiFi", "AC", "Kitchen", "Parking", "Balcony", "Garden"],
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop"
      ],
      description: "Escape to the mountains in this charming villa with stunning valley views and modern amenities.",
      host: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        joinedYear: 2020,
        rating: 4.9,
        verified: true
      },
      rules: [
        "Check-in: 2:00 PM - 8:00 PM",
        "Check-out: 11:00 AM",
        "No smoking",
        "Quiet hours after 10 PM"
      ]
    },
    3: {
      id: 3,
      title: "Heritage Villa in Rajasthan",
      location: "Udaipur, Rajasthan",
      type: "Villa",
      price: 15000,
      rating: 4.7,
      reviews: 156,
      guests: 12,
      bedrooms: 6,
      bathrooms: 4,
      area: "5000 sq ft",
      amenities: ["WiFi", "Pool", "AC", "Kitchen", "Parking", "Balcony", "Garden", "Gym"],
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop"
      ],
      description: "Stay in royal luxury at this heritage villa with traditional Rajasthani architecture and modern comforts.",
      host: {
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        joinedYear: 2018,
        rating: 4.7,
        verified: true
      },
      rules: [
        "Check-in: 3:00 PM - 9:00 PM",
        "Check-out: 12:00 PM",
        "No smoking",
        "Respect local customs"
      ]
    },
    4: {
      id: 4,
      title: "Backwater Villa in Kerala",
      location: "Alleppey, Kerala",
      type: "Villa",
      price: 9800,
      rating: 4.6,
      reviews: 203,
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      area: "3200 sq ft",
      amenities: ["WiFi", "AC", "Kitchen", "Parking", "Balcony", "Garden"],
      images: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&h=800&fit=crop"
      ],
      description: "Experience the serene backwaters of Kerala in this beautiful villa surrounded by coconut palms.",
      host: {
        name: "Meera Nair",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        joinedYear: 2019,
        rating: 4.6,
        verified: true
      },
      rules: [
        "Check-in: 2:00 PM - 8:00 PM",
        "Check-out: 11:00 AM",
        "No smoking",
        "Eco-friendly practices encouraged"
      ]
    },
    5: {
      id: 5,
      title: "Heritage Villa in Pink City Jaipur",
      location: "Udaipur, Rajasthan",
      type: "Villa",
      price: 7500,
      rating: 4.9,
      reviews: 156,
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      area: "4500 sq ft",
      amenities: ["WiFi", "Pool", "AC", "Kitchen", "Parking", "Balcony", "Garden", "Gym"],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop"
      ],
      description: "Stay in royal luxury at this heritage villa with traditional Rajasthani architecture and modern comforts.",
      host: {
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        joinedYear: 2018,
        rating: 4.7,
        verified: true
      },
      rules: [
        "Check-in: 3:00 PM - 9:00 PM",
        "Check-out: 12:00 PM",
        "No smoking",
        "Respect local customs"
      ]
    },
    6: {
      id: 6,
      title: "Trendy Apartment in Pune IT District",
      location: "Pune, Maharashtra",
      type: "Apartment",
      price: 3500,
      rating: 4.6,
      reviews: 203,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      area: "1200 sq ft",
      amenities: ["WiFi", "AC", "Kitchen", "Gym", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop"
      ],
      description: "Experience the vibrant tech hub of Pune in this modern apartment with all amenities.",
      host: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        joinedYear: 2020,
        rating: 4.6,
        verified: true
      },
      rules: [
        "Check-in: 2:00 PM - 8:00 PM",
        "Check-out: 11:00 AM",
        "No smoking",
        "Quiet hours after 10 PM"
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const propertyData = mockProperties[parseInt(id)];
      setProperty(propertyData || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const getTotalPrice = () => {
    const nights = calculateNights();
    const basePrice = nights * property.price;
    const serviceFee = Math.round(basePrice * 0.1);
    const taxes = Math.round(basePrice * 0.12);
    return {
      basePrice,
      serviceFee,
      taxes,
      total: basePrice + serviceFee + taxes
    };
  };

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    // Navigate to payment page with booking data
    const bookingDetails = {
      propertyTitle: property.title,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      nights: calculateNights(),
      ...pricing
    };
    
    setShowBookingModal(false);
    navigate('/payment', { state: bookingDetails });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
        </div>
      </div>
    );
  }

  const pricing = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to listings
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{property.rating}</span>
              <span className="ml-1">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? property.images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === property.images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-20 rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.guests}</div>
                  <div className="text-gray-600">Guests</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                  <div className="text-gray-600">Area</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet Your Host</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{property.host.name}</h3>
                    {property.host.verified && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-gray-600">
                    Host since {property.host.joinedYear} • ⭐ {property.host.rating} rating
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">₹{property.price}</span>
                  <span className="text-gray-600">/night</span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  >
                    {[...Array(property.guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Breakdown */}
              {calculateNights() > 0 && (
                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span>₹{property.price} × {calculateNights()} nights</span>
                    <span>₹{pricing.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>₹{pricing.serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>₹{pricing.taxes.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{pricing.total.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Reserve Now
              </button>

              <p className="text-center text-sm text-gray-600 mt-3">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Your Booking</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Property:</span>
                <span className="font-medium">{property.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span>{bookingData.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span>{bookingData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span>{bookingData.guests}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{pricing.total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;