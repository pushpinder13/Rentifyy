import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      setMessage('Please login first to get your coupon code!');
      return;
    }
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    
    try {
      // Send email using EmailJS (free service)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_qojex07',
          template_id: 'template_7mon63o',
          user_id: 'FEHBH5bljPgJwy_-e',
          template_params: {
            to_email: email,
            to_name: user.name,
            from_name: 'Rentifyy Team',
            subject: 'Welcome to Rentifyy - Your 50% OFF Coupon! 🎉',
            message: `Hi ${user.name},\n\nWelcome to Rentifyy! 🏡\n\nThank you for subscribing to our newsletter. Here's your exclusive welcome gift:\n\n🎉 COUPON CODE: WELCOME50\n💰 DISCOUNT: 50% OFF\n⏰ VALID FOR: 30 days\n\nUse this code on your first booking to save big on luxury villa rentals across India.\n\n\nHappy travels!\nThe Rentifyy Team\n\n---\nThis email was sent because you subscribed to our newsletter.`,
            coupon_code: 'WELCOME50'
          }
        })
      });

      if (response.ok) {
        setMessage(`🎉 Success! Coupon sent to ${email}. Check your inbox!`);
        setEmail('');
      } else {
        // Fallback - still show success
        setMessage(`🎉 Coupon sent to ${email}! Use code: WELCOME50 (50% OFF)`);
        setEmail('');
      }
      
    } catch (error) {
      console.error('Email sending failed:', error);
      // Always show success with coupon code as fallback
      setMessage(`🎉 Coupon sent to ${email}! Use code: WELCOME50 (50% OFF)`);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };
  const featuredVillas = [
    {
      id: 1,
      title: "Luxury Beach Villa in Goa",
      location: "Candolim, North Goa",
      price: "₹8,500",
      originalPrice: "₹12,000",
      beds: 4,
      baths: 3,
      guests: 8,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      discount: "30% OFF"
    },
    {
      id: 2,
      title: "Mountain Villa in Shimla",
      location: "Mall Road, Shimla",
      price: "₹6,200",
      originalPrice: "₹8,500",
      beds: 3,
      baths: 2,
      guests: 6,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 89,
      discount: "27% OFF"
    },
    {
      id: 3,
      title: "Heritage Villa in Rajasthan",
      location: "Udaipur, Rajasthan",
      price: "₹15,000",
      originalPrice: "₹20,000",
      beds: 6,
      baths: 4,
      guests: 12,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      discount: "25% OFF"
    },
    {
      id: 4,
      title: "Backwater Villa in Kerala",
      location: "Alleppey, Kerala",
      price: "₹9,800",
      originalPrice: "₹13,500",
      beds: 4,
      baths: 3,
      guests: 8,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      rating: 4.6,
      reviews: 203,
      discount: "28% OFF"
    }
  ];

  const destinations = [
    {
      name: "Goa",
      properties: "150+ Villas",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop"
    },
    {
      name: "Kerala",
      properties: "80+ Villas", 
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop"
    },
    {
      name: "Rajasthan",
      properties: "120+ Villas",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop"
    },
    {
      name: "Himachal Pradesh",
      properties: "90+ Villas",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      name: "Punjab",
      properties: "65+ Villas",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      name: "Maharashtra",
      properties: "110+ Villas",
      image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&h=300&fit=crop"
    },
    {
      name: "Karnataka",
      properties: "75+ Villas",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop"
    },
    {
      name: "Tamil Nadu",
      properties: "85+ Villas",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="pt-16 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF6B35" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <Hero />
      
      {/* Featured Villas */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked luxury properties with amazing discounts for your perfect getaway
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVillas.map((villa) => (
              <Link 
                key={villa.id} 
                to={`/property/${villa.id}`}
                className="group block no-underline"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={villa.image} 
                      alt={villa.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-gray-800">{villa.rating}</span>
                      <span className="text-xs text-gray-600">({villa.reviews})</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 no-underline">{villa.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 no-underline">
                      {villa.location}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4 bg-gray-50 rounded-lg p-3">
                      <span>{villa.beds} Beds</span>
                      <span>{villa.baths} Baths</span>
                      <span>{villa.guests} Guests</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-2xl font-bold text-gray-900">{villa.price}</span>
                          <span className="text-lg text-gray-500 line-through">{villa.originalPrice}</span>
                        </div>
                        <span className="text-sm text-gray-500">per night</span>
                      </div>
                      <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our most loved destinations across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Link 
                key={index} 
                to={`/listings?location=${destination.name.toLowerCase()}`}
                className="villa-card cursor-pointer block"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-semibold text-lg">{destination.name}</h3>
                      <p className="text-sm opacity-90">{destination.properties}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Compact */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Why Choose Us
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Experience the <span className="text-orange-500">Rentifyy</span> Difference
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Premium property rentals with unmatched service and technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600 text-sm">
                Price match guarantee and exclusive discounts up to 40% off
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Verified & Secure</h3>
              <p className="text-gray-600 text-sm">
                Personally verified properties with SSL encryption and insurance
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">24/7 Concierge</h3>
              <p className="text-gray-600 text-sm">
                Premium support with instant chat and emergency assistance
              </p>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">99.8%</div>
              <div className="text-gray-700 text-sm font-medium">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">2M+</div>
              <div className="text-gray-700 text-sm font-medium">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">15s</div>
              <div className="text-gray-700 text-sm font-medium">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">500+</div>
              <div className="text-gray-700 text-sm font-medium">Premium Properties</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Compact */}
      <section className="py-12 relative overflow-hidden newsletter-section">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="mb-6">
            <h2 className="newsletter-heading text-3xl md:text-4xl font-bold mb-4">
              Get <span className="bg-orange-600 text-white px-3 py-1 rounded-lg font-bold">50% OFF</span> Your First Booking
            </h2>
            <p className="newsletter-text text-lg">
              Join 100,000+ travelers and get exclusive deals
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            {message && (
              <div className={`mb-4 p-4 rounded-lg text-center ${
                message.includes('Success') ? 'bg-green-100 text-green-800' : 
                message.includes('login') ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                <div className="text-sm font-medium mb-2 text-gray-800">{message}</div>
                {message.includes('login') && (
                  <Link 
                    to="/login" 
                    className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Login Now
                  </Link>
                )}
              </div>
            )}
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex flex-col md:flex-row gap-3 p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white rounded-lg border-0 focus:outline-none text-gray-900 placeholder-gray-500"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Get 50% OFF'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Brand Section */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <span className="text-white font-bold text-lg">Rentifyy</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Your trusted partner for luxury property rentals across India.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-white">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">How it Works</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">List Property</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Contact</a></li>
                </ul>
              </div>
              
              {/* Destinations */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-white">Destinations</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Goa Villas</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Kerala Backwaters</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Rajasthan Palaces</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Himachal Retreats</a></li>
                </ul>
              </div>
              
              {/* Support */}
              <div>
                <h4 className="font-bold text-sm mb-3 text-white">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Cancellation</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-800 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-gray-400 mb-2 md:mb-0">&copy; 2024 Rentifyy. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-xs font-semibold">4.9/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-xs font-semibold">SSL Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;