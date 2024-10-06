const { Op } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./User');
const Location = require('./Location');
const Category = require('./Category');
const Pet = require('./Pet');
const Product = require('./Product');
const Service = require('./Service');
const Appointment = require('./Appointment');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');
const Review = require('./Review');
const Coupon = require('./Coupon');
const Wishlist = require('./Wishlist');

// Thiết lập mối quan hệ giữa User và Location
User.belongsTo(Location, {
	foreignKey: 'location_id',
	as: 'Location',
});
Location.hasMany(User, {
	foreignKey: 'location_id',
	as: 'Users',
});

// Thiết lập mối quan hệ giữa User và Pet
User.hasMany(Pet, { foreignKey: 'owner_id', as: 'Pets' });
Pet.belongsTo(User, {
	foreignKey: 'owner_id',
	as: 'Owner',
});

// Thiết lập mối quan hệ giữa User và Product
User.hasMany(Product, {
	foreignKey: 'sales_center_id',
	as: 'Products',
});
Product.belongsTo(User, {
	foreignKey: 'sales_center_id',
	as: 'SalesCenter',
});

// Thiết lập mối quan hệ giữa User và Service
User.hasMany(Service, {
	foreignKey: 'doctor_id',
	as: 'Services',
});
Service.belongsTo(User, {
	foreignKey: 'doctor_id',
	as: 'Doctor',
});

// Thiết lập mối quan hệ giữa User và Appointment (pet_owner)
User.hasMany(Appointment, {
	foreignKey: 'pet_owner_id',
	as: 'PetOwnerAppointments',
});
Appointment.belongsTo(User, {
	foreignKey: 'pet_owner_id',
	as: 'PetOwner',
});

// Thiết lập mối quan hệ giữa User và Appointment (doctor)
User.hasMany(Appointment, {
	foreignKey: 'doctor_id',
	as: 'DoctorAppointments',
});
Appointment.belongsTo(User, {
	foreignKey: 'doctor_id',
	as: 'Doctor',
});

// Thiết lập mối quan hệ giữa User và Order
User.hasMany(Order, {
	foreignKey: 'customer_id',
	as: 'Orders',
});
Order.belongsTo(User, {
	foreignKey: 'customer_id',
	as: 'Customer',
});

// Thiết lập mối quan hệ giữa User và Post
User.hasMany(Post, { foreignKey: 'user_id', as: 'Posts' });
Post.belongsTo(User, {
	foreignKey: 'user_id',
	as: 'Author',
});

// Thiết lập mối quan hệ giữa Post và Comment
Post.hasMany(Comment, {
	foreignKey: 'post_id',
	as: 'Comments',
});
Comment.belongsTo(Post, {
	foreignKey: 'post_id',
	as: 'Post',
});

// Thiết lập mối quan hệ giữa User và Like
User.hasMany(Like, { foreignKey: 'user_id', as: 'Likes' });
Like.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

// Thiết lập mối quan hệ giữa Post và Like
Post.hasMany(Like, {
	foreignKey: 'post_id',
	as: 'PostLikes',
});
Like.belongsTo(Post, { foreignKey: 'post_id', as: 'Post' });

// Thiết lập mối quan hệ giữa Comment và Like
Comment.hasMany(Like, {
	foreignKey: 'comment_id',
	as: 'CommentLikes',
});
Like.belongsTo(Comment, {
	foreignKey: 'comment_id',
	as: 'Comment',
});

// Thiết lập mối quan hệ giữa User và Review
User.hasMany(Review, {
	foreignKey: 'reviewer_id',
	as: 'Reviews',
});
Review.belongsTo(User, {
	foreignKey: 'reviewer_id',
	as: 'Reviewer',
});

// Thiết lập mối quan hệ giữa Product và Review
Product.hasMany(Review, {
	foreignKey: 'product_id',
	as: 'ProductReviews',
});
Review.belongsTo(Product, {
	foreignKey: 'product_id',
	as: 'Product',
});

// Thiết lập mối quan hệ giữa Service và Review
Service.hasMany(Review, {
	foreignKey: 'service_id',
	as: 'ServiceReviews',
});
Review.belongsTo(Service, {
	foreignKey: 'service_id',
	as: 'Service',
});

// Thiết lập mối quan hệ giữa Category và Product
Category.hasMany(Product, {
	foreignKey: 'category_id',
	as: 'Products',
});
Product.belongsTo(Category, {
	foreignKey: 'category_id',
	as: 'Category',
});

// Thiết lập mối quan hệ giữa Category và Service
Category.hasMany(Service, {
	foreignKey: 'category_id',
	as: 'Services',
});
Service.belongsTo(Category, {
	foreignKey: 'category_id',
	as: 'Category',
});

// Thiết lập mối quan hệ giữa Category và Pet
Category.hasMany(Pet, {
	foreignKey: 'category_id',
	as: 'Pets',
});
Pet.belongsTo(Category, {
	foreignKey: 'category_id',
	as: 'Category',
});

// Thiết lập mối quan hệ giữa Order và OrderItem
Order.hasMany(OrderItem, {
	foreignKey: 'order_id',
	as: 'OrderItems',
});
OrderItem.belongsTo(Order, {
	foreignKey: 'order_id',
	as: 'Order',
});

// Thiết lập mối quan hệ giữa Product và OrderItem
Product.hasMany(OrderItem, {
	foreignKey: 'product_id',
	as: 'OrderItems',
});
OrderItem.belongsTo(Product, {
	foreignKey: 'product_id',
	as: 'Product',
});

// Thiết lập mối quan hệ giữa Service và OrderItem
Service.hasMany(OrderItem, {
	foreignKey: 'service_id',
	as: 'OrderItems',
});
OrderItem.belongsTo(Service, {
	foreignKey: 'service_id',
	as: 'Service',
});

// Thiết lập mối quan hệ giữa Order và Payment
Order.hasMany(Payment, {
	foreignKey: 'order_id',
	as: 'Payments',
});
Payment.belongsTo(Order, {
	foreignKey: 'order_id',
	as: 'Order',
});

// Thiết lập mối quan hệ giữa Coupon và Product
Coupon.belongsTo(Product, {
	foreignKey: 'product_id',
	as: 'Product',
});
Product.hasMany(Coupon, {
	foreignKey: 'product_id',
	as: 'Coupons',
});

// Thiết lập mối quan hệ giữa Wishlist và User, Product, Service
Wishlist.belongsTo(User, {
	foreignKey: 'user_id',
	as: 'User',
});
Wishlist.belongsTo(Product, {
	foreignKey: 'product_id',
	as: 'Product',
});
Wishlist.belongsTo(Service, {
	foreignKey: 'service_id',
	as: 'Service',
});

// **Thiết lập mối quan hệ mới giữa Pet và Appointment**
Pet.hasMany(Appointment, {
	foreignKey: 'pet_id',
	as: 'Appointments',
});
Appointment.belongsTo(Pet, {
	foreignKey: 'pet_id',
	as: 'Pet',
});

Appointment.belongsTo(Service, {
	foreignKey: 'service_id',
	as: 'Service',
});
Service.hasMany(Appointment, {
	foreignKey: 'service_id',
	as: 'Appointments',
});

// models/Comment.js
Comment.belongsTo(User, {
	foreignKey: 'user_id',
	as: 'User',
});
User.hasMany(Comment, {
	foreignKey: 'user_id',
	as: 'Comments',
});

// Export models và sequelize instance
module.exports = {
	sequelize,
	Op,
	User,
	Location,
	Category,
	Pet,
	Product,
	Service,
	Appointment,
	Order,
	OrderItem,
	Payment,
	Post,
	Comment,
	Like,
	Review,
	Coupon,
	Wishlist,
};
