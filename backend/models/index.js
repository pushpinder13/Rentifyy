const User = require('./User');
const Category = require('./Category');
const Listing = require('./Listing');
const Booking = require('./Booking');
const Review = require('./Review');
const Payment = require('./Payment');

// User relationships
User.hasMany(Listing, { foreignKey: 'owner_id', as: 'listings' });
User.hasMany(Booking, { foreignKey: 'renter_id', as: 'bookings' });
User.hasMany(Review, { foreignKey: 'renter_id', as: 'reviews' });

// Category relationships
Category.hasMany(Listing, { foreignKey: 'category_id', as: 'listings' });

// Listing relationships
Listing.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
Listing.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Listing.hasMany(Booking, { foreignKey: 'listing_id', as: 'bookings' });
Listing.hasMany(Review, { foreignKey: 'listing_id', as: 'reviews' });

// Booking relationships
Booking.belongsTo(User, { foreignKey: 'renter_id', as: 'renter' });
Booking.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Booking.hasOne(Payment, { foreignKey: 'booking_id', as: 'payment' });

// Review relationships
Review.belongsTo(User, { foreignKey: 'renter_id', as: 'renter' });
Review.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

// Payment relationships
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

module.exports = {
    User,
    Category,
    Listing,
    Booking,
    Review,
    Payment
}; 