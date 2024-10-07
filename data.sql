create database aaa1;
use aaa1;

INSERT INTO `Locations` (`name`, `type`, `createdAt`, `updatedAt`) VALUES
('Hà Nội', 'City', '2024-01-01 08:00:00', '2024-01-01 08:00:00'),
('Ba Đình', 'District', '2024-01-01 08:05:00', '2024-01-01 08:05:00'),
('Thanh Xuân', 'Commune', '2024-01-01 08:10:00', '2024-01-01 08:10:00'),
('TP.HCM', 'City', '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
('Quận 1', 'District', '2024-01-02 09:05:00', '2024-01-02 09:05:00'),
('Phường Bến Nghé', 'Commune', '2024-01-02 09:10:00', '2024-01-02 09:10:00');
INSERT INTO `Categories` (`name`, `type`, `is_active`, `createdAt`, `updatedAt`) VALUES
('Thức ăn', 'Product', TRUE, '2024-01-03 10:00:00', '2024-01-03 10:00:00'),
('Dịch vụ chải lông', 'Service', TRUE, '2024-01-03 10:05:00', '2024-01-03 10:05:00'),
('Chó', 'Pet', TRUE, '2024-01-03 10:10:00', '2024-01-03 10:10:00'),
('Mèo', 'Pet', TRUE, '2024-01-03 10:15:00', '2024-01-03 10:15:00'),
('Sản phẩm vệ sinh', 'Product', TRUE, '2024-01-03 10:20:00', '2024-01-03 10:20:00'),
('Dịch vụ khám bệnh', 'Service', TRUE, '2024-01-03 10:25:00', '2024-01-03 10:25:00');
INSERT INTO `Users` (
    `username`, `password`, `email`, `phone`, `role`, `full_name`, 
    `date_of_birth`, `address`, `location_id`, `avatar_url`, 
    `is_active`, `is_verified`, `last_login`, 
    `reset_password_token`, `reset_password_expires_at`, 
    `verification_token`, `verification_token_expires_at`, 
    `business_name`, `license_number`, `tax_id`, 
    `website`, `business_description`, `opening_hours`, 
    `latitude`, `longitude`, `createdAt`, `updatedAt`
) VALUES
('nguyenvana', 'password123', 'nguyenvana@example.com', '0912345678', 'PetOwner', 'Nguyễn Văn A', 
 '1990-05-15', '123 Đường ABC, Ba Đình', 2, NULL, 
 TRUE, TRUE, '2024-04-01 09:00:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.0277644, 105.8341598, '2024-01-04 11:00:00', '2024-01-04 11:00:00'),

('tranngocanh', 'password456', 'tranngocanh@example.com', '0987654321', 'Doctor', 'Trần Ngọc Anh', 
 '1985-08-22', '456 Đường DEF, Thanh Xuân', 3, NULL, 
 TRUE, TRUE, '2024-04-02 10:30:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.030716, 105.852630, '2024-01-04 11:05:00', '2024-01-04 11:05:00'),

('salescenter1', 'password789', 'salescenter1@example.com', '0901122334', 'SalesCenter', 'Sales Center 1', 
 NULL, '789 Đường GHI, Quận 1', 5, NULL, 
 TRUE, TRUE, '2024-04-03 12:45:00', 
 NULL, NULL, 
 NULL, NULL, 
 'Sales Center Alpha', 'LIC12345', 'TAX67890', 
 'http://salescenter1.example.com', 'Chuyên cung cấp sản phẩm cho thú cưng', '8:00 AM - 6:00 PM', 
 10.823099, 106.629664, '2024-01-04 11:10:00', '2024-01-04 11:10:00');
 
 INSERT INTO `Pets` (
    `owner_id`, `category_id`, `name`, `breed`, 
    `age`, `gender`, `description`, `medical_history`, 
    `is_active`, `createdAt`, `updatedAt`
) VALUES
(1, 3, 'Buddy', 'Golden Retriever', 3, 'Male', 'Một chú chó thân thiện.', 'Không có vấn đề sức khỏe.', 
 TRUE, '2024-01-05 12:00:00', '2024-01-05 12:00:00'),

(1, 4, 'Whiskers', 'Siamese', 2, 'Female', 'Mèo có bộ lông mượt mà.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, '2024-01-05 12:05:00', '2024-01-05 12:05:00');
 
INSERT INTO `Products` (
    `sales_center_id`, `category_id`, `name`, `description`, 
    `price`, `stock_quantity`, `sku`, `is_active`, 
    `images`, `createdAt`, `updatedAt`
) VALUES
(2, 3, 'Vòng cổ cho chó', 'Vòng cổ thời trang cho chó.', 50000.00, 200, 'SKU54321', TRUE, 
 'http://example.com/images/dog_collar.jpg', '2024-01-06 13:10:00', '2024-01-06 13:10:00'),

(3, 2, 'Cát vệ sinh cho mèo', 'Cát vệ sinh khử mùi cho mèo.', 120000.00, 300, 'SKU98765', TRUE, 
 'http://example.com/images/cat_litter.jpg', '2024-01-06 13:15:00', '2024-01-06 13:15:00'),

(3, 6, 'Balo vận chuyển thú cưng', 'Balo tiện lợi cho việc vận chuyển thú cưng.', 350000.00, 20, 'SKU13579', TRUE, 
 'http://example.com/images/pet_carrier.jpg', '2024-01-06 13:20:00', '2024-01-06 13:20:00'),

(3, 4, 'Bát ăn cho chó', 'Bát ăn không trượt cho chó.', 45000.00, 150, 'SKU24680', TRUE, 
 'http://example.com/images/dog_bowl.jpg', '2024-01-06 13:25:00', '2024-01-06 13:25:00'),

(3, 1, 'Thức ăn cho mèo', 'Thức ăn dinh dưỡng cao cho mèo.', 130000.00, 120, 'SKU11223', TRUE, 
 'http://example.com/images/cat_food.jpg', '2024-01-06 13:30:00', '2024-01-06 13:30:00'),

(3, 6, 'Lược chải lông thú cưng', 'Lược chải lông chuyên dụng cho thú cưng.', 60000.00, 80, 'SKU33445', TRUE, 
 'http://example.com/images/pet_brush.jpg', '2024-01-06 13:35:00', '2024-01-06 13:35:00'),

(3, 3, 'Áo khoác cho chó', 'Áo khoác ấm áp cho chó.', 100000.00, 60, 'SKU55667', TRUE, 
 'http://example.com/images/dog_jacket.jpg', '2024-01-06 13:40:00', '2024-01-06 13:40:00'),

(3, 5, 'Sữa tắm cho chó', 'Sữa tắm khử mùi cho chó.', 90000.00, 90, 'SKU77889', TRUE, 
 'http://example.com/images/dog_shampoo.jpg', '2024-01-06 13:45:00', '2024-01-06 13:45:00'),

(3, 4, 'Đồ chơi cho mèo', 'Đồ chơi giúp mèo vận động.', 70000.00, 250, 'SKU99887', TRUE, 
 'http://example.com/images/cat_toy.jpg', '2024-01-06 13:50:00', '2024-01-06 13:50:00'),

(3, 2, 'Cát vệ sinh hữu cơ', 'Cát vệ sinh làm từ nguyên liệu tự nhiên.', 150000.00, 80, 'SKU66554', TRUE, 
 'http://example.com/images/organic_cat_litter.jpg', '2024-01-06 13:55:00', '2024-01-06 13:55:00');

 
 INSERT INTO `Services` (
    `doctor_id`, `category_id`, `name`, `description`, 
    `price`, `is_active`, `createdAt`, `updatedAt`
) VALUES
(2, 2, 'Chải lông cơ bản', 'Dịch vụ chải lông cho chó và mèo.', 500000.00, TRUE, 
 '2024-01-07 14:00:00', '2024-01-07 14:00:00'),

(2, 6, 'Khám bệnh định kỳ', 'Dịch vụ khám bệnh định kỳ cho thú cưng.', 300000.00, TRUE, 
 '2024-01-07 14:05:00', '2024-01-07 14:05:00');

INSERT INTO `Appointments` (
    `pet_owner_id`, `pet_id`, `doctor_id`, `service_id`, 
    `appointment_date`, `status`, `notes`, 
    `createdAt`, `updatedAt`
) VALUES
(1, 1, 2, 1, '2024-05-20 10:00:00', 'Scheduled', 'Cần chải lông cho Buddy.', 
 '2024-01-08 15:00:00', '2024-01-08 15:00:00'),

(1, 2, 2, 2, '2024-05-21 14:00:00', 'Scheduled', 'Khám bệnh định kỳ cho Whiskers.', 
 '2024-01-08 15:05:00', '2024-01-08 15:05:00');

INSERT INTO `Orders` (
    `customer_id`, `total_amount`, `status`, 
    `createdAt`, `updatedAt`
) VALUES
(1, 230000.00, 'Pending', '2024-01-09 16:00:00', '2024-01-09 16:00:00'),
(1, 500000.00, 'Processing', '2024-01-09 16:05:00', '2024-01-09 16:05:00');

INSERT INTO `OrderItems` (
    `order_id`, `product_id`, `service_id`, 
    `quantity`, `unit_price`, `subtotal`, 
    `createdAt`, `updatedAt`
) VALUES
(1, 1, 1, 1, 150000.00, 150000.00, '2024-01-10 17:00:00', '2024-01-09 16:00:00'),
(2, 2, 1, 1, 80000.00, 80000.00, '2024-01-10 17:05:00', '2024-01-09 16:05:00');

INSERT INTO `Payments` (
    `order_id`, `amount`, `payment_method`, `status`, 
    `transaction_id`, `payment_date`, 
    `createdAt`, `updatedAt`
) VALUES
(1, 230000.00, 'Credit Card', 'Completed', 'TXN123456789', '2024-05-20 10:05:00', 
 '2024-01-11 18:00:00', '2024-01-11 18:00:00'),

(2, 500000.00, 'PayPal', 'Completed', 'TXN987654321', '2024-05-21 14:10:00', 
 '2024-01-11 18:05:00', '2024-01-11 18:05:00');

INSERT INTO `Posts` (
    `user_id`, `title`, `content`, `image_url`, 
    `createdAt`, `updatedAt`
) VALUES
(1, 'Chia sẻ về thú cưng của tôi', 'Đây là chú chó Buddy của tôi.', 
 'http://example.com/images/buddy.jpg', '2024-01-12 19:00:00', '2024-01-12 19:00:00'),

(1, 'Những lưu ý khi chăm sóc mèo', 'Mèo cần được chăm sóc như thế nào?', 
 NULL, '2024-01-12 19:05:00', '2024-01-12 19:05:00');

INSERT INTO `Comments` (
    `post_id`, `user_id`, `content`, 
    `createdAt`, `updatedAt`
) VALUES
(1, 2, 'Buddy thật đáng yêu!', '2024-01-13 20:00:00', '2024-01-13 20:00:00'),

(2, 3, 'Cảm ơn bạn đã chia sẻ.', '2024-01-13 20:05:00', '2024-01-13 20:05:00');

INSERT INTO `Likes` (`user_id`, `post_id`, `createdAt`, `updatedAt`) VALUES
(2, 1, '2024-01-14 21:00:00', '2024-01-14 21:00:00'),
(3, 2, '2024-01-14 21:05:00', '2024-01-14 21:00:00');

INSERT INTO `Likes` (`user_id`, `comment_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-01-14 21:10:00', '2024-01-14 21:00:00'),
(2, 2, '2024-01-14 21:15:00', '2024-01-14 21:00:00');

INSERT INTO `Reviews` (
    `reviewer_id`, `product_id`, `service_id`, 
    `rating`, `title`, `comment`, 
    `is_verified_purchase`, `createdAt`, `updatedAt`
) VALUES
(1, 1, NULL, 5, 'Thức ăn tuyệt vời', 'Buddy thích sản phẩm này rất nhiều!', 
 TRUE, '2024-01-15 22:00:00', '2024-01-15 22:00:00'),

(1, NULL, 1, 4, 'Dịch vụ tốt', 'Dịch vụ chải lông rất chuyên nghiệp.', 
 TRUE, '2024-01-15 22:05:00', '2024-01-15 22:05:00');

INSERT INTO `Coupons` (
    `code`, `description`, `discount_type`, `discount_value`, 
    `start_date`, `end_date`, `product_id`, `is_active`, 
    `createdAt`, `updatedAt`
) VALUES
('SAVE10', 'Giảm 10% cho đơn hàng đầu tiên', 'Percentage', 10.00, 
 '2024-01-01', '2024-12-31', NULL, TRUE, 
 '2024-01-16 23:00:00', '2024-01-16 23:00:00'),

('DOGGROOM50', 'Giảm 50k cho dịch vụ chải lông', 'Fixed Amount', 50000.00, 
 '2024-05-01', '2024-06-30', NULL, TRUE, 
 '2024-01-16 23:05:00', '2024-01-16 23:05:00');

INSERT INTO `Wishlists` (
    `user_id`, `product_id`, `service_id`, 
    `createdAt`, `updatedAt`
) VALUES
(1, 1, NULL, '2024-01-17 00:00:00', '2024-01-17 00:00:00'),

(1, 2, 1, '2024-01-17 00:05:00', '2024-01-17 00:05:00'),

(1, NULL, 2, '2024-01-17 00:10:00', '2024-01-17 00:10:00');
