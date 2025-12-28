import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-xl tracking-tight">Rentifyy</span>
              <span className="text-orange-500 text-xs font-medium">✨ India's #1 Property Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/listings" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Properties
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Contact
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{user.name}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    {/* User Info Header */}
                    <div className="px-2 py-1 border-b border-gray-100">
                      <div className="flex items-center space-x-1">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-gray-900 font-medium text-xs">{user.name}</div>
                          <div className="text-orange-600 text-xs capitalize">{user.role}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-1">
                      {user.role === 'admin' ? (
                        <Link 
                          to="/admin" 
                          className="flex items-center px-2 py-1 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-xs"
                          onClick={closeMenu}
                        >
                          Admin Panel
                        </Link>
                      ) : (
                        <Link 
                          to="/dashboard" 
                          className="flex items-center px-2 py-1 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-xs"
                          onClick={closeMenu}
                        >
                          Dashboard
                        </Link>
                      )}
                      <Link 
                        to="/profile" 
                        className="flex items-center px-2 py-1 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-xs"
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/bookings" 
                        className="flex items-center px-2 py-1 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-xs"
                        onClick={closeMenu}
                      >
                        Bookings
                      </Link>
                      {(user.role === 'owner' || user.role === 'admin') && (
                        <Link 
                          to="/add-property" 
                          className="flex items-center px-2 py-1 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-xs"
                          onClick={closeMenu}
                        >
                          Add Property
                        </Link>
                      )}
                    </div>
                    
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-2 py-1 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-xs"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-orange-500 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-6 py-4 space-y-2">
              <Link 
                to="/listings" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Properties
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Contact
              </Link>
              
              {user ? (
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3 p-3 mb-3 bg-gray-100 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-700 font-medium">{user.name}</div>
                      <div className="text-orange-500 text-sm capitalize">{user.role}</div>
                    </div>
                  </div>
                  {user.role === 'admin' ? (
                    <Link 
                      to="/admin" 
                      className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                      onClick={closeMenu}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link 
                      to="/dashboard" 
                      className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-gray-600 hover:text-orange-500 font-medium rounded-lg transition-colors text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                  <Link 
                    to="/login" 
                    className="block text-center px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    Sign in
                  </Link>
                  <Link 
                    to="/register" 
                    className="block text-center px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
                    onClick={closeMenu}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;