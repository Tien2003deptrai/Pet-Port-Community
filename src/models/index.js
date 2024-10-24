const { Op } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Location = require('./Location');
const Category = require('./Category');
const Pet = require('./Pet');
const Product = require('./Product');
const Service = require('./Service');
const Appointment = require('./Appointment');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const OrderService = require('./OrderService');
const Payment = require('./Payment');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');
const Review = require('./Review');
const Coupon = require('./Coupon');

// index

// User - Location
User.belongsTo(Location, {
  foreignKey: 'location_id',
  as: 'Location',
});
Location.hasMany(User, {
  foreignKey: 'location_id',
  as: 'Users',
});

// User - Pet
User.hasMany(Pet, {
  foreignKey: 'owner_id',
  as: 'OwnedPets',
});
Pet.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'PetOwner',
});

// User - Product
User.hasMany(Product, {
  foreignKey: 'sales_center_id',
  as: 'SalesCenterProducts',
});
Product.belongsTo(User, {
  foreignKey: 'sales_center_id',
  as: 'SalesCenter',
});

// User - Service
User.hasMany(Service, {
  foreignKey: 'doctor_id',
  as: 'DoctorServices',
});
Service.belongsTo(User, {
  foreignKey: 'doctor_id',
  as: 'Doctor',
});

// User - Appointment (Pet Owner)
User.hasMany(Appointment, {
  foreignKey: 'pet_owner_id',
  as: 'PetOwnerAppointments',
});
Appointment.belongsTo(User, {
  foreignKey: 'pet_owner_id',
  as: 'PetOwner',
});

// User - Appointment (Doctor)
User.hasMany(Appointment, {
  foreignKey: 'doctor_id',
  as: 'DoctorAppointments',
});
Appointment.belongsTo(User, {
  foreignKey: 'doctor_id',
  as: 'Doctor',
});

// User - Order
User.hasMany(Order, {
  foreignKey: 'petOwner_id',
  as: 'PetOwnerOrders',
});
Order.belongsTo(User, {
  foreignKey: 'petOwner_id',
  as: 'PetOwner',
});

// User - Review
User.hasMany(Review, {
  foreignKey: 'reviewer_id',
  as: 'PetOwnerReviews',
});
Review.belongsTo(User, {
  foreignKey: 'reviewer_id',
  as: 'PetOwner',
});

// Post - Comment
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'PostComments',
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'Post',
});

// User - Like
User.hasMany(Like, { foreignKey: 'petOwner_Id', as: 'UserLikes' });
Like.belongsTo(User, {
  foreignKey: 'petOwner_Id',
  as: 'UserLikes',
});

// Post - Like
Post.hasMany(Like, {
  foreignKey: 'post_id',
  as: 'PostLikes',
});
Like.belongsTo(Post, { foreignKey: 'post_id', as: 'Post' });

// Comment - Like
Comment.hasMany(Like, {
  foreignKey: 'comment_id',
  as: 'CommentLikes',
});
Like.belongsTo(Comment, {
  foreignKey: 'comment_id',
  as: 'Comment',
});

// Product - Review
Product.hasMany(Review, {
  foreignKey: 'product_id',
  as: 'ProductReviews',
});
Review.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'Product',
});

// Service - Review
Service.hasMany(Review, {
  foreignKey: 'service_id',
  as: 'ServiceReviews',
});
Review.belongsTo(Service, {
  foreignKey: 'service_id',
  as: 'Service',
});

// Category - Product
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'CategoryProducts',
});
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'Category',
});

// Category - Service
Category.hasMany(Service, {
  foreignKey: 'category_id',
  as: 'CategoryServices',
});
Service.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'Category',
});

// Category - Pet
Category.hasMany(Pet, {
  foreignKey: 'category_id',
  as: 'CategoryPets',
});
Pet.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'Category',
});

// Order - OrderItem
Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  as: 'OrderItems',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'Order',
});

// Order - OrderService
Order.hasMany(OrderService, {
  foreignKey: 'order_id',
  as: 'OrderServices',
});
OrderService.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'Order',
});

// Product - OrderItem
Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  as: 'ProductOrderItems',
});
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'Product',
});

// Service - OrderService
Service.hasMany(OrderService, {
  foreignKey: 'service_id',
  as: 'ServiceOrderServices',
});
OrderService.belongsTo(Service, {
  foreignKey: 'service_id',
  as: 'Service',
});

// Order - Payment
Order.hasMany(Payment, {
  foreignKey: 'order_id',
  as: 'OrderPayments',
});
Payment.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'Order',
});

// Product - Coupon
Coupon.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'CouponProduct',
});
Product.hasMany(Coupon, {
  foreignKey: 'product_id',
  as: 'ProductCoupons',
});

// Pet - Appointment
Pet.hasMany(Appointment, {
  foreignKey: 'pet_id',
  as: 'PetAppointments',
});
Appointment.belongsTo(Pet, {
  foreignKey: 'pet_id',
  as: 'Pet',
});

// Appointment - Service
Appointment.belongsTo(Service, {
  foreignKey: 'service_id',
  as: 'Service',
});
Service.hasMany(Appointment, {
  foreignKey: 'service_id',
  as: 'ServiceAppointments',
});

// User - Comment
Comment.belongsTo(User, {
  foreignKey: 'petOwner_Id',
  as: 'CommentUser',
});
User.hasMany(Comment, {
  foreignKey: 'petOwner_Id',
  as: 'UserComments',
});

// Post - User
Post.belongsTo(User, {
  foreignKey: 'petOwner_Id',
  as: 'PostOwner',
});
User.hasMany(Post, {
  foreignKey: 'petOwner_Id',
  as: 'Posts',
});

// Xuất khẩu các mô hình và sequelize
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
  OrderService,
  Payment,
  Post,
  Comment,
  Like,
  Review,
  Coupon,
};
