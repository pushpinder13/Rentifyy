import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Color themes for properties
  const colorThemes = ['blue', 'green', 'purple', 'pink', 'teal', 'orange'];
  const propertyColor = colorThemes[property.id % colorThemes.length];

  // Auto-slide images only when hovered
  useEffect(() => {
    if (property?.images?.length > 1 && isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === property.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [property?.images?.length, isHovered]);

  // Check if property is already saved
  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    setIsSaved(savedProperties.some(p => p.id === property.id));
  }, [property.id]);

  const handleSaveProperty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    
    if (isSaved) {
      // Remove from saved
      const updatedSaved = savedProperties.filter(p => p.id !== property.id);
      localStorage.setItem('savedProperties', JSON.stringify(updatedSaved));
      setIsSaved(false);
    } else {
      // Add to saved
      const propertyToSave = {
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        image: property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
      };
      savedProperties.push(propertyToSave);
      localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
      setIsSaved(true);
    }
  };

  const nextImage = () => {
    if (property?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowDetails(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="rating-star" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="rating-star" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <Link 
      to={`/property/${property?.id || 1}`}
      className="property-card block"
      data-color={propertyColor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Card Content */}
      <div className="relative">
        {/* Image Carousel */}
        <div className="property-card-image relative">
          <img
            src={property?.images?.[currentImageIndex] || '/placeholder-image.jpg'}
            alt={property?.title || 'Property image'}
            className="w-full h-full object-cover"
          />
          
          {/* Action Buttons - Only Like Button Always Visible */}
          <div className="absolute top-3 right-3 z-20">
            {/* Like Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110 backdrop-blur-sm"
            >
              <svg className={`w-4 h-4 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Property Type Badge */}
          <div className="property-type-badge">
            {property.type}
          </div>

          {/* Image Dots - Always visible if multiple images */}
          {property?.images?.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property?.images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location & Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-gray-600">
              <svg className="w-3 h-3 mr-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-xs font-medium">{property?.location || 'Location'}</span>
            </div>
            <div className="flex items-center rating-stars">
              {renderStars(property?.rating || 0)}
              <span className="text-xs font-semibold ml-1">{property?.rating || '0'}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
            {property?.title || 'Property Title'}
          </h3>

          {/* Features */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div className="property-stat text-xs">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{property?.guests || 0}</span>
            </div>
            <div className="property-stat text-xs">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span>{property?.bedrooms || 0}</span>
            </div>
            <div className="property-stat text-xs">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
              </svg>
              <span>{property?.bathrooms || 0}</span>
            </div>
          </div>

          {/* Price & Book Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold price-highlight">₹{property?.price || '0'}</span>
              <span className="text-gray-600 text-xs ml-1">/night</span>
            </div>
            <span className="btn-primary-enhanced text-xs px-4 py-2 pointer-events-none">
              Book Now
            </span>
          </div>
        </div>
      </div>

      {/* Hover Detail Card */}
      <div className="property-detail-card">
        <div className="property-detail-content">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="property-type-badge relative top-0 left-0">{property.type}</span>
              <div className="flex items-center rating-stars">
                {renderStars(property?.rating || 0)}
                <span className="text-sm font-semibold ml-2">{property?.rating || '0'}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {property?.title || 'Property Title'}
            </h3>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-sm font-medium">{property?.location || 'Location'}</span>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Property Details</h4>
            <div className="space-y-1">
              <div className="property-stat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm">Up to {property?.guests || 0} guests</span>
              </div>
              <div className="property-stat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span className="text-sm">{property?.bedrooms || 0} bedrooms</span>
              </div>
              <div className="property-stat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                </svg>
                <span className="text-sm">{property?.bathrooms || 0} bathrooms</span>
              </div>
            </div>
          </div>

          {/* All Amenities */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-1">
              {property?.amenities?.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Pricing</h4>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-lg border border-orange-200">
              <div className="text-center">
                <span className="text-2xl font-bold price-highlight">₹{property?.price || '0'}</span>
                <span className="text-gray-600 text-sm ml-1">/night</span>
              </div>
              <div className="text-center text-xs text-gray-500 mt-1">
                Excluding taxes and fees
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button className="btn-primary-enhanced w-full text-sm">
              View Details & Book
            </button>
            <button 
              onClick={handleSaveProperty}
              className={`btn-secondary-enhanced w-full text-sm ${
                isSaved ? 'bg-blue-500 text-white border-blue-500' : ''
              }`}
            >
              {isSaved ? 'Saved ✓' : 'Save Property'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;