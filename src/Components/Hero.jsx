import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to listings with search parameters
    const params = new URLSearchParams();
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.checkIn) params.append('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.append('checkOut', searchData.checkOut);
    if (searchData.guests) params.append('guests', searchData.guests);
    
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop')`
      }}
    >
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center bg-white bg-opacity-15 backdrop-blur-md border border-white border-opacity-20 rounded-full px-8 py-3 mb-12 animate-fade-in-up">
            <span className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></span>
            <span className="hero-badge-text text-lg font-semibold tracking-wide">✨ India's #1 Property Platform</span>
          </div>

          {/* Main Heading */}
          <div className="mb-16">
            <h1 className="hero-main-text font-extrabold text-6xl md:text-8xl mb-8 leading-tight animate-fade-in-up">
              Find Your Perfect
              <span className="block gradient-text-fallback mt-4">
                Home Away From Home
              </span>
            </h1>
            
            <p className="hero-subtitle text-2xl md:text-3xl mb-16 opacity-95 max-w-4xl mx-auto animate-fade-in-up animation-delay-300 leading-relaxed">
              Discover amazing properties across India • Book with confidence and save up to 40%
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-16 animate-fade-in-up animation-delay-600">
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white border-opacity-20">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-1">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      📍 Where
                    </label>
                    <input
                      type="text"
                      placeholder="City, area"
                      value={searchData.location}
                      onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      📅 Check-in
                    </label>
                    <input
                      type="date"
                      value={searchData.checkIn}
                      onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      📅 Check-out
                    </label>
                    <input
                      type="date"
                      value={searchData.checkOut}
                      onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      👥 Guests
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={searchData.guests}
                        onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors bg-white"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6+</option>
                      </select>
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        🔍
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="md:hidden mt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    🔍 Search Properties
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animation-delay-900">
            <div className="text-center">
              <div className="hero-stats-text text-4xl md:text-5xl font-bold mb-3">500+</div>
              <div className="hero-stats-text opacity-90 text-lg">Properties</div>
            </div>
            <div className="text-center">
              <div className="hero-stats-text text-4xl md:text-5xl font-bold mb-3">25+</div>
              <div className="hero-stats-text opacity-90 text-lg">Cities</div>
            </div>
            <div className="text-center">
              <div className="hero-stats-text text-4xl md:text-5xl font-bold mb-3">50K+</div>
              <div className="hero-stats-text opacity-90 text-lg">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="hero-stats-text text-4xl md:text-5xl font-bold mb-3">4.8★</div>
              <div className="hero-stats-text opacity-90 text-lg">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-16 border-2 border-white rounded-full flex justify-center opacity-70">
          <div className="w-2 h-4 bg-white rounded-full mt-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;