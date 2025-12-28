import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyFilter from '../Components/PropertyFilter';
import PropertyCard from '../Components/PropertyCard';

const PropertyListings = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Initialize filters from URL parameters
  useEffect(() => {
    const urlFilters = {};
    if (searchParams.get('location')) urlFilters.location = searchParams.get('location');
    if (searchParams.get('guests')) urlFilters.guests = searchParams.get('guests');
    setFilters(urlFilters);
  }, [searchParams]);

  // Mock property data
  const mockProperties = [
    {
      id: 1,
      title: "Luxury Villa with Private Pool in Goa",
      location: "Goa",
      type: "Villa",
      price: 8500,
      rating: 4.9,
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["WiFi", "Pool", "AC", "Kitchen", "Parking", "Balcony"],
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Modern Apartment in Mumbai Central",
      location: "Mumbai",
      type: "Apartment",
      price: 4200,
      rating: 4.7,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["WiFi", "AC", "Kitchen", "Gym", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Cozy Studio Near Delhi Metro",
      location: "Delhi",
      type: "Studio",
      price: 1800,
      rating: 4.5,
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "AC", "Kitchen"],
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 4,
      title: "Spacious House in Bangalore Tech Hub",
      location: "Bangalore",
      type: "House",
      price: 6200,
      rating: 4.8,
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["WiFi", "AC", "Kitchen", "Parking", "Balcony", "Pet Friendly"],
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 5,
      title: "Heritage Villa in Pink City Jaipur",
      location: "Jaipur",
      type: "Villa",
      price: 7500,
      rating: 4.9,
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      amenities: ["WiFi", "Pool", "AC", "Kitchen", "Parking", "Balcony", "Gym"],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 6,
      title: "Trendy Apartment in Pune IT District",
      location: "Pune",
      type: "Apartment",
      price: 3500,
      rating: 4.6,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["WiFi", "AC", "Kitchen", "Gym", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      ]
    }
  ];

  useEffect(() => {
    // Fetch properties from API
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/listings/');
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
          setFilteredProperties(data);
        } else {
          // Fallback to mock data if API fails
          setProperties(mockProperties);
          setFilteredProperties(mockProperties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to mock data
        setProperties(mockProperties);
        setFilteredProperties(mockProperties);
      }
      setLoading(false);
    };
    
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [filters, properties, sortBy]);

  const filterProperties = () => {
    let filtered = [...properties];

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type.toLowerCase() === filters.propertyType.toLowerCase());
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(p => parseInt(p.replace('+', '')));
      if (max) {
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      } else {
        filtered = filtered.filter(p => p.price >= min);
      }
    }

    if (filters.guests) {
      const guestCount = filters.guests.includes('+') ? parseInt(filters.guests) : parseInt(filters.guests);
      filtered = filtered.filter(p => p.guests >= guestCount);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(p => 
        filters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    // Apply sorting
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
      case 'guests':
        filtered.sort((a, b) => b.guests - a.guests);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredProperties(filtered);
  };

  const LoadingSkeleton = () => (
    <div className="property-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="property-card">
          <div className="property-card-image property-skeleton"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 property-skeleton rounded w-3/4"></div>
            <div className="h-6 property-skeleton rounded w-full"></div>
            <div className="h-4 property-skeleton rounded w-1/2"></div>
            <div className="flex justify-between items-center">
              <div className="h-8 property-skeleton rounded w-20"></div>
              <div className="h-10 property-skeleton rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <div className="h-8 property-skeleton rounded w-64 mb-4"></div>
            <div className="h-4 property-skeleton rounded w-96"></div>
          </div>
          <div className="filter-section mb-8">
            <div className="h-16 property-skeleton rounded"></div>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover {properties.length} amazing properties across India, each offering unique experiences and comfort
          </p>
          <div className="flex items-center justify-center mt-6 space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verified Properties
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Instant Booking
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Best Price Guarantee
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <PropertyFilter filters={filters} onFilterChange={setFilters} />

        {/* Enhanced Results Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="text-gray-900">
                  <span className="text-3xl font-bold text-orange-500">{filteredProperties.length}</span>
                  <span className="text-lg text-gray-600 ml-2">properties found</span>
                </div>
              </div>
              {filteredProperties.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-medium text-orange-700">Avg: ₹{Math.round(filteredProperties.reduce((sum, p) => sum + p.price, 0) / filteredProperties.length)}/night</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-3">
                <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none bg-white font-medium min-w-[140px]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="guests">Most Guests</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Property Grid/List */}
        {filteredProperties.length > 0 ? (
          <div className={viewMode === 'grid' ? 'property-grid' : 'space-y-6'}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-8xl mb-6">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No properties found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any properties matching your criteria. Try adjusting your filters to see more results.
            </p>
            <button
              onClick={() => setFilters({})}
              className="btn-primary-enhanced"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-16">
            <button className="btn-secondary-enhanced">
              Load More Properties
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Showing {filteredProperties.length} of {properties.length} properties
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListings;