import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = () => {
    try {
      const updatedUser = {
        ...user,
        ...formData
      };
      updateUser(updatedUser);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="pt-20 min-h-screen" style={{background: 'var(--cream)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="luxury-card p-8">
          <h1 className="font-serif text-3xl font-bold gradient-text mb-6">
            My Profile
          </h1>
          
          {message && (
            <div className={`mb-4 p-3 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`luxury-input ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`luxury-input ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`luxury-input ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <input 
                    type="text" 
                    value={formData.role} 
                    className="luxury-input bg-gray-50" 
                    disabled 
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Account Settings</h3>
              <div className="space-y-4">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full btn-luxury"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button 
                      onClick={handleUpdateProfile}
                      className="w-full btn-luxury"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          phone: user?.phone || '',
                          role: user?.role || ''
                        });
                      }}
                      className="w-full btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <button className="w-full btn-outline">
                  Change Password
                </button>
                <button className="w-full btn-outline">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;