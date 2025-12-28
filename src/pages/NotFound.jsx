import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="text-6xl mb-6">🏠</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we could not find the page you are looking for. It might have been moved or does not exist.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Go Home
          </Link>
          <Link
            to="/listings"
            className="block w-full py-3 px-6 border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold rounded-lg transition-all duration-300"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;