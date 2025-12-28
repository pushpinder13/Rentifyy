import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    monthlyRent: '',
    securityDeposit: '',
    amenities: [],
    images: []
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Basic Info', icon: '📝' },
    { id: 2, title: 'Location', icon: '📍' },
    { id: 3, title: 'Details', icon: '🏠' },
    { id: 4, title: 'Pricing', icon: '💰' },
    { id: 5, title: 'Amenities', icon: '✨' },
    { id: 6, title: 'Photos', icon: '📸' },
    { id: 7, title: 'Review', icon: '✅' }
  ];

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', icon: '🏢' },
    { value: 'house', label: 'House', icon: '🏠' },
    { value: 'villa', label: 'Villa', icon: '🏛️' },
    { value: 'penthouse', label: 'Penthouse', icon: '🏙️' }
  ];

  const amenitiesList = [
    { value: 'pool', label: 'Swimming Pool', icon: '🏊' },
    { value: 'gym', label: 'Fitness Center', icon: '💪' },
    { value: 'parking', label: 'Parking', icon: '🚗' },
    { value: 'concierge', label: 'Concierge', icon: '🛎️' },
    { value: 'garden', label: 'Garden', icon: '🌿' },
    { value: 'balcony', label: 'Balcony', icon: '🌅' }
  ];

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        break;
      case 3:
        if (!formData.bedrooms) newErrors.bedrooms = 'Bedrooms is required';
        if (!formData.bathrooms) newErrors.bathrooms = 'Bathrooms is required';
        break;
      case 4:
        if (!formData.monthlyRent) newErrors.monthlyRent = 'Monthly rent is required';
        break;
      case 6:
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        const token = localStorage.getItem('token');
        
        // Try to submit to backend API first
        const listingData = {
          title: formData.title,
          description: formData.description,
          category_id: 1, // Default category
          price: parseInt(formData.monthlyRent),
          location: `${formData.city}, ${formData.state}`
        };
        
        const response = await fetch('http://localhost:3000/api/listings/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listingData)
        });
        
        if (response.ok) {
          const result = await response.json();
          alert('Property submitted successfully! It will be visible after admin approval.');
          navigate('/dashboard');
          return;
        }
      } catch (error) {
        console.error('API submission failed:', error);
      }
      
      // Fallback to localStorage if API fails
      const newProperty = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        type: formData.propertyType,
        location: `${formData.city}, ${formData.state}`,
        price: parseInt(formData.monthlyRent),
        rating: 4.5,
        guests: parseInt(formData.bedrooms) * 2,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        amenities: formData.amenities,
        images: formData.images.length > 0 ? formData.images : [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        ],
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      const existingProperties = JSON.parse(localStorage.getItem('userProperties') || '[]');
      existingProperties.push(newProperty);
      localStorage.setItem('userProperties', JSON.stringify(existingProperties));
      
      alert('Property submitted successfully! It will be visible after admin approval.');
      navigate('/dashboard');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold mb-6">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`luxury-input ${errors.title ? 'border-red-500' : ''}`}
                placeholder="e.g., Luxury Manhattan Penthouse"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {propertyTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`luxury-border rounded-lg p-4 cursor-pointer transition-all hover:border-gold ${
                      formData.propertyType === type.value ? 'border-gold bg-gold bg-opacity-10' : ''
                    }`}
                    onClick={() => setFormData({...formData, propertyType: type.value})}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-semibold text-sm">{type.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`luxury-input h-32 resize-none ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Describe your property in detail..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold mb-6">Location Details</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className={`luxury-input ${errors.address ? 'border-red-500' : ''}`}
                placeholder="123 Main Street"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className={`luxury-input ${errors.city ? 'border-red-500' : ''}`}
                  placeholder="New York"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className={`luxury-input ${errors.state ? 'border-red-500' : ''}`}
                  placeholder="NY"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold mb-6">Property Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  className={`luxury-input ${errors.bedrooms ? 'border-red-500' : ''}`}
                >
                  <option value="">Select</option>
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                <select
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                  className={`luxury-input ${errors.bathrooms ? 'border-red-500' : ''}`}
                >
                  <option value="">Select</option>
                  {[1,1.5,2,2.5,3,3.5,4].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Square Feet</label>
                <input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({...formData, sqft: e.target.value})}
                  className="luxury-input"
                  placeholder="2500"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold mb-6">Pricing Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rent ($)</label>
                <input
                  type="number"
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                  className={`luxury-input ${errors.monthlyRent ? 'border-red-500' : ''}`}
                  placeholder="5000"
                />
                {errors.monthlyRent && <p className="text-red-500 text-sm mt-1">{errors.monthlyRent}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Security Deposit ($)</label>
                <input
                  type="number"
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})}
                  className="luxury-input"
                  placeholder="5000"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold mb-6">Amenities & Features</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <div
                  key={amenity.value}
                  className={`luxury-border rounded-lg p-4 cursor-pointer transition-all hover:border-gold ${
                    formData.amenities.includes(amenity.value) ? 'border-gold bg-gold bg-opacity-10' : ''
                  }`}
                  onClick={() => handleAmenityToggle(amenity.value)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{amenity.icon}</div>
                    <div className="font-semibold text-xs">{amenity.label}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-600">
              Selected: {formData.amenities.length} amenities
            </p>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold mb-6">Property Photos</h3>
            
            <div className="luxury-border border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-4xl mb-4">📸</div>
                <p className="text-lg font-semibold mb-2">Upload Property Photos</p>
                <p className="text-gray-600">Click to select multiple images</p>
              </label>
            </div>
            
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Property ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold mb-6">Review & Submit</h3>
            
            <div className="luxury-card p-6">
              <h4 className="font-serif text-xl font-bold mb-4">{formData.title}</h4>
              <p className="text-gray-600 mb-4">{formData.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Type:</strong> {formData.propertyType}</div>
                <div><strong>Location:</strong> {formData.city}, {formData.state}</div>
                <div><strong>Bedrooms:</strong> {formData.bedrooms}</div>
                <div><strong>Bathrooms:</strong> {formData.bathrooms}</div>
                <div><strong>Monthly Rent:</strong> ${formData.monthlyRent}</div>
                <div><strong>Amenities:</strong> {formData.amenities.length} selected</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen" style={{background: 'var(--cream)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold gradient-text mb-4">
            List Your Property
          </h1>
          <p className="text-gray-600 text-lg">
            Create a professional listing for your luxury property
          </p>
        </div>

        <div className="mb-8">
          <div className="luxury-card p-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${
                    currentStep >= step.id ? 'gradient-gold text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <span className="text-xs md:text-sm">{step.icon}</span>
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <div className={`text-xs md:text-sm font-semibold ${
                      currentStep >= step.id ? 'text-gold' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-4 md:w-8 h-1 mx-2 md:mx-4 ${
                      currentStep > step.id ? 'bg-gold' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            {/* Mobile step title */}
            <div className="sm:hidden text-center mt-4">
              <div className={`text-sm font-semibold ${
                currentStep >= steps[currentStep - 1]?.id ? 'text-gold' : 'text-gray-600'
              }`}>
                Step {currentStep}: {steps[currentStep - 1]?.title}
              </div>
            </div>
          </div>
        </div>

        <div className="luxury-card p-8 mb-8">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`btn-outline ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>
          
          {currentStep < steps.length ? (
            <button onClick={nextStep} className="btn-luxury">
              Next Step
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-luxury">
              Submit Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateListing;