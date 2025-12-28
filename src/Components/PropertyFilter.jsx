import React, { useState } from 'react';

const PropertyFilter = ({ onFilterChange, filters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Filter Properties</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📍 Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="">All Cities</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="pune">Pune</option>
              <option value="goa">Goa</option>
              <option value="jaipur">Jaipur</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🏠 Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💰 Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="">Any Price</option>
              <option value="0-2000">₹0 - ₹2,000</option>
              <option value="2000-5000">₹2,000 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000+">₹10,000+</option>
            </select>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              👥 Guests
            </label>
            <select
              value={filters.guests}
              onChange={(e) => handleFilterChange('guests', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="">Any</option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5+">5+ Guests</option>
            </select>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            ✨ Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['WiFi', 'AC', 'Kitchen', 'Parking', 'Pool', 'Gym', 'Pet Friendly', 'Balcony'].map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities?.includes(amenity) || false}
                  onChange={(e) => {
                    const currentAmenities = filters.amenities || [];
                    const newAmenities = e.target.checked
                      ? [...currentAmenities, amenity]
                      : currentAmenities.filter(a => a !== amenity);
                    handleFilterChange('amenities', newAmenities);
                  }}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onFilterChange({})}
            className="px-6 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;