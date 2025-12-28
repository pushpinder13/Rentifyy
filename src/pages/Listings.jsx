import React, { useState, useEffect } from 'react';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    amenities: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const mockProperties = [
    {
      id: 1,
      title: 'Luxury Villa in Goa',
      location: 'Candolim, North Goa',
      price: 15000,
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      type: 'villa',
      amenities: ['pool', 'beach', 'chef', 'wifi'],
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
      featured: true,
      rating: 4.9,
      reviews: 127,
      badge: 'Beachfront'
    },
    {
      id: 2,
      title: 'Heritage Haveli in Rajasthan',
      location: 'Udaipur, Rajasthan',
      price: 25000,
      bedrooms: 6,
      bathrooms: 5,
      guests: 12,
      type: 'heritage',
      amenities: ['pool', 'spa', 'butler', 'wifi'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
      featured: true,
      rating: 4.8,
      reviews: 89,
      badge: 'Heritage'
    },
    {
      id: 3,
      title: 'Mountain Retreat in Himachal',
      location: 'Manali, Himachal Pradesh',
      price: 12000,
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      type: 'cottage',
      amenities: ['fireplace', 'garden', 'wifi', 'parking'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      featured: false,
      rating: 4.7,
      reviews: 156,
      badge: 'Mountain View'
    },
    {
      id: 4,
      title: 'Luxury Apartment in Mumbai',
      location: 'Bandra West, Mumbai',
      price: 18000,
      bedrooms: 3,
      bathrooms: 3,
      guests: 6,
      type: 'apartment',
      amenities: ['gym', 'pool', 'concierge', 'wifi'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      featured: false,
      rating: 4.6,
      reviews: 92,
      badge: 'City View'
    },
    {
      id: 5,
      title: 'Backwater Villa in Kerala',
      location: 'Alleppey, Kerala',
      price: 20000,
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      type: 'villa',
      amenities: ['boat', 'chef', 'spa', 'wifi'],
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      featured: true,
      rating: 4.9,
      reviews: 203,
      badge: 'Waterfront'
    },
    {
      id: 6,
      title: 'Desert Camp in Rajasthan',
      location: 'Jaisalmer, Rajasthan',
      price: 8000,
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      type: 'camp',
      amenities: ['camel', 'cultural', 'dining', 'wifi'],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      featured: false,
      rating: 4.5,
      reviews: 78,
      badge: 'Desert'
    }
  ];

  const amenityOptions = [
    { value: 'pool', label: 'Swimming Pool', icon: '🏊' },
    { value: 'spa', label: 'Spa & Wellness', icon: '🧘' },
    { value: 'chef', label: 'Private Chef', icon: '👨🍳' },
    { value: 'butler', label: 'Butler Service', icon: '🤵' },
    { value: 'beach', label: 'Beach Access', icon: '🏖️' },
    { value: 'garden', label: 'Garden', icon: '🌿' },
    { value: 'fireplace', label: 'Fireplace', icon: '🔥' },
    { value: 'wifi', label: 'High-Speed WiFi', icon: '📶' },
    { value: 'gym', label: 'Fitness Center', icon: '💪' },
    { value: 'concierge', label: 'Concierge', icon: '🛎️' },
    { value: 'parking', label: 'Parking', icon: '🚗' },
    { value: 'boat', label: 'Boat Access', icon: '⛵' },
    { value: 'camel', label: 'Camel Safari', icon: '🐪' },
    { value: 'cultural', label: 'Cultural Tours', icon: '🏛️' },
    { value: 'dining', label: 'Fine Dining', icon: '🍽️' }
  ];

  useEffect(() => {
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type === filters.propertyType);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(p => 
        filters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, filters, sortBy]);

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      amenities: []
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-warm-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-5xl font-bold text-dark-brown mb-4">
            Luxury Properties
          </h1>
          <p className="text-warm-brown text-xl">
            Discover {filteredProperties.length} exceptional stays across India's most beautiful destinations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="saffron-card p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-playfair text-xl font-semibold text-dark-brown">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-saffron hover:text-saffron-deep transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-3">Destination</label>
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="saffron-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-3">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                    className="saffron-input"
                  >
                    <option value="">All Types</option>
                    <option value="villa">Villa</option>
                    <option value="heritage">Heritage Property</option>
                    <option value="cottage">Mountain Cottage</option>
                    <option value="apartment">Luxury Apartment</option>
                    <option value="camp">Desert Camp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-3">Price Range (per night)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min ₹"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      className="saffron-input"
                    />
                    <input
                      type="number"
                      placeholder="Max ₹"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      className="saffron-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-3">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                    className="saffron-input"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-3">Amenities & Services</label>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {amenityOptions.map((amenity) => (
                      <label key={amenity.value} className="flex items-center space-x-3 cursor-pointer hover:bg-soft-beige p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity.value)}
                          onChange={() => handleAmenityToggle(amenity.value)}
                          className="rounded border-2 border-saffron text-saffron focus:ring-saffron"
                        />
                        <span className="text-lg">{amenity.icon}</span>
                        <span className="text-sm text-dark-brown">{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="saffron-input"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-saffron text-white' 
                      : 'text-warm-brown hover:bg-soft-beige'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-saffron text-white' 
                      : 'text-warm-brown hover:bg-soft-beige'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="saffron-card p-16 text-center">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="font-playfair text-3xl font-semibold text-dark-brown mb-4">No Properties Found</h3>
                <p className="text-warm-brown text-lg mb-8">Try adjusting your filters to discover more amazing stays</p>
                <button onClick={clearFilters} className="btn-saffron">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProperties.map((property) => (
                  <div key={property.id} className={`property-card ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    {property.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-saffron text-white px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <div className={`property-image ${
                      viewMode === 'list' ? 'w-1/3 h-64' : ''
                    }`}>
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="property-badge">
                        {property.badge}
                      </div>
                      <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-semibold text-dark-brown">{property.rating}</span>
                          <span className="text-xs text-warm-brown">({property.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`property-content ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="property-title">{property.title}</h3>
                      <div className="property-location">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {property.location}
                      </div>
                      
                      <div className="property-features">
                        <span>{property.bedrooms} Beds</span>
                        <span>•</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>•</span>
                        <span>{property.guests} Guests</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {property.amenities.slice(0, 4).map((amenity) => {
                          const amenityInfo = amenityOptions.find(a => a.value === amenity);
                          return (
                            <span key={amenity} className="text-xs bg-soft-beige text-warm-brown px-3 py-1 rounded-full flex items-center space-x-1">
                              <span>{amenityInfo?.icon}</span>
                              <span>{amenityInfo?.label}</span>
                            </span>
                          );
                        })}
                        {property.amenities.length > 4 && (
                          <span className="text-xs text-warm-brown">+{property.amenities.length - 4} more</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="property-price">
                          ₹{property.price.toLocaleString()}
                          <span className="text-base font-normal text-warm-brown ml-1">per night</span>
                        </div>
                        <div className="flex space-x-3">
                          <button className="btn-saffron px-6 py-2">
                            View Details
                          </button>
                          <button className="btn-saffron-outline px-4 py-2">
                            ♡
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
      </div>
    </div>
  );
};

export default Listings;