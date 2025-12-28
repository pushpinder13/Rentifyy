import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from './Components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import PropertyListings from './pages/PropertyListings';
import PropertyDetail from './pages/PropertyDetail';
import CreateListing from './pages/CreateListing';
import AddProperty from './pages/AddProperty';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import About from './pages/About';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Bookings from './pages/Bookings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/listings" element={<PropertyListings />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;