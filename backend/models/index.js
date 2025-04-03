const User = require('./User');
const Category = require('./Category');
const Listing = require('./Listing');
const Booking = require('./Booking');
const Review = require('./Review');
const Payment = require('./Payment');

// User relationships
User.hasMany(Listing, { foreignKey: 'owner_id' });
User.hasMany(Booking, { foreignKey: 'renter_id' });
User.hasMany(Review, { foreignKey: 'renter_id' });

// Category relationships
Category.hasMany(Listing, { foreignKey: 'category_id' });

// Listing relationships
Listing.belongsTo(User, { foreignKey: 'owner_id' });
Listing.belongsTo(Category, { foreignKey: 'category_id' });
Listing.hasMany(Booking, { foreignKey: 'listing_id' });
Listing.hasMany(Review, { foreignKey: 'listing_id' });

// Booking relationships
Booking.belongsTo(User, { foreignKey: 'renter_id' });
Booking.belongsTo(Listing, { foreignKey: 'listing_id' });
Booking.hasOne(Payment, { foreignKey: 'booking_id' });

// Review relationships
Review.belongsTo(User, { foreignKey: 'renter_id' });
Review.belongsTo(Listing, { foreignKey: 'listing_id' });

// Payment relationships
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

module.exports = {
    User,
    Category,
    Listing,
    Booking,
    Review,
    Payment
}; 