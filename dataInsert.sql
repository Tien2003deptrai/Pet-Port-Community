create database apet0;
use apet0;

-- Dữ liệu cho bảng Categories
INSERT INTO Categories (name, type, is_active, createdAt, updatedAt) VALUES
('Dog', 'Pet', true, NOW(), NOW()),
('Cat', 'Pet', true, NOW(), NOW()),
('Vaccination', 'Service', true, NOW(), NOW()),
('Grooming', 'Service', true, NOW(), NOW()),
('Food', 'Product', true, NOW(), NOW()),
('Toys', 'Product', true, NOW(), NOW()),
('Supplements', 'Product', true, NOW(), NOW()),
('Bird', 'Pet', true, NOW(), NOW()),
('Reptile', 'Pet', true, NOW(), NOW());

INSERT INTO Users (
  username, password, email, phone, role, full_name, date_of_birth, address, avatar_url, 
  is_active, is_verified, last_login, reset_password_token, reset_password_expires_at, verification_token, 
  verification_token_expires_at, cccd, clinic_address, practice_certificate, experience_years, opening_time, 
  closing_time, cccd_front_image, cccd_back_image, certificate_image, is_doctor_approved, store_name, 
  store_address, business_license, store_logo, store_description, is_store_verified, createdAt, updatedAt
) 
VALUES 
('john_doe21', 'hashedpassword1', 'john.doe@example111.com', '123456789', JSON_ARRAY('Doctor'), 'John Doe', 
 '1985-03-25', '123 Elm St', 'http://example.com/avatar1.jpg', true, false, NULL, NULL, NULL, NULL, NULL, 
 '048999111111', '101 Main St', 'Cert-101', 5, '08:00:00', '18:00:00', 'http://example.com/cccd_front1.jpg', 
 'http://example.com/cccd_back1.jpg', 'http://example.com/certificate1.jpg', false, 'John\'s Pet Clinic', 
 '789 Birch St', 'BL12345', 'http://example.com/store_logo1.jpg', 'A reliable pet clinic.', false, NOW(), NOW()),

('jane_smith1', 'hashedpassword2', 'jane.smith@example11.com', '987654321', JSON_ARRAY('Seller'), 'Jane Smith', 
 '1990-07-12', '456 Oak St', 'http://example.com/avatar2.jpg', true, true, NULL, NULL, NULL, NULL, NULL, 
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jane\'s Store', '123 Maple St', 'BL54321', 
 'http://example.com/store_logo2.jpg', 'High-quality products for everyone.', true, NOW(), NOW()),

('john_doe211', 'hashedpassword12', 'john.doe@example11.com', '123456789', JSON_ARRAY('PetOwner'), 'John Doe', 
 '1985-03-25', '123 Elm St', 'http://example.com/avatar1.jpg', true, false, NULL, NULL, NULL, NULL, NULL, 
 '048999111111', '101 Main St', 'Cert-101', 5, '08:00:00', '18:00:00', 'http://example.com/cccd_front1.jpg', 
 'http://example.com/cccd_back1.jpg', 'http://example.com/certificate1.jpg', false, NULL, NULL, NULL, NULL, NULL, false, NOW(), NOW()),

('jane_smith11', 'hashedpassword22', 'jane.smith@example1111.com', '987654321', JSON_ARRAY('Seller'), 'Jane Smith', 
 '1990-07-12', '456 Oak St', 'http://example.com/avatar2.jpg', true, true, NULL, NULL, NULL, NULL, NULL, 
 NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jane\'s Boutique', '456 Cedar St', 'BL67890', 
 'http://example.com/store_logo3.jpg', 'Fashionable items for all.', true, NOW(), NOW());

-- Dữ liệu cho bảng Pets
INSERT INTO Pets (owner_id, category_id, name, breed, age, gender, description, medical_history, is_active, images, createdAt, updatedAt) 
VALUES 
(3, 1, 'Buddy', 'Golden Retriever', 3, 'Male', 'Friendly and playful', 'Vaccinated', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
(3, 2, 'Whiskers', 'Persian', 2, 'Female', 'Calm and independent', 'None', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW());

-- Dữ liệu cho bảng Products
INSERT INTO Products (sales_center_id, category_id, name, description, price, stock_quantity, sku, images, createdAt, updatedAt) VALUES
(4, 5, 'Premium Dog Food', 'High-quality food for dogs', 29.99, 100, 'DOGFOOD001', 'dogfood1.jpg', NOW(), NOW()),
(4, 6, 'Cat Toy', 'Interactive toy for cats', 9.99, 200, 'CATTOY001', 'cattoy1.jpg', NOW(), NOW());

-- Dữ liệu cho bảng Orders
INSERT INTO Orders (petOwner_id, total_amount, status, createdAt, updatedAt) VALUES
(1, 59.98, 'Processing', NOW(), NOW()),
(2, 29.99, 'Pending', NOW(), NOW());

-- Dữ liệu cho bảng OrderItems
INSERT INTO OrderItems (order_id, product_id, quantity, unit_price, subtotal, createdAt, updatedAt) VALUES
(1, 1, 2, 29.99, 59.98, NOW(), NOW()),
(2, 2, 1, 29.99, 29.99, NOW(), NOW());

-- Dữ liệu cho bảng Payments
INSERT INTO Payments (order_id, amount, payment_method, status, transaction_id, payment_date, createdAt, updatedAt) VALUES
(1, 59.98, 'Credit Card', 'Completed', 'TX123456789', '2024-10-10 10:00:00', NOW(), NOW()),
(2, 29.99, 'PayPal', 'Pending', 'TX987654321', '2024-10-10 11:00:00', NOW(), NOW());

-- Dữ liệu cho bảng Posts
INSERT INTO Posts (petOwner_Id, title, content, image_url, counterLike, createdAt, updatedAt) VALUES
(1, 'My First Pet Experience', 'Having a pet has changed my life...', 'post1.jpg', 1, NOW(), NOW()),
(2, 'Grooming Tips for Cats', 'Cats require special care for their fur...', 'post2.jpg', 2, NOW(), NOW());

-- Dữ liệu cho bảng Comments
INSERT INTO Comments (post_id, petOwner_Id, content, createdAt, updatedAt) VALUES
(1, 2, 'Thanks for sharing your experience!', NOW(), NOW()),
(2, 1, 'Very helpful grooming tips, thank you!', NOW(), NOW());

-- Dữ liệu cho bảng Reviews
INSERT INTO Reviews (petOwner_Id, product_id, rating, title, comment, is_verified_purchase, createdAt, updatedAt) VALUES
(1, 1, 5, 'Amazing Dog Food', 'My dog loves this food!', true, NOW(), NOW()),
(2, 2, 4, 'Great Cat Toy', 'My cat enjoys playing with this toy.', true, NOW(), NOW());

-- Dữ liệu cho bảng Coupons
INSERT INTO Coupons (code, description, discount_type, discount_value, start_date, end_date, is_active, product_id, createdAt, updatedAt) VALUES
('DISCOUNT10', 'Giảm 10% cho tất cả các sản phẩm', 'Percentage', 10.00, '2024-10-01', '2024-12-31', true, 1, NOW(), NOW()),
('DISCOUNT20', 'Giảm 20% cho đơn hàng trên 500k', 'Percentage', 20.00, '2024-10-01', '2024-11-30', true, 2, NOW(), NOW());

-- Dữ liệu cho bảng Appointments
INSERT INTO Appointments (pet_owner_id, pet_id, doctor_id, appointment_date, appointment_time, status, notes, createdAt, updatedAt) 
VALUES
(2, 1, 1, '2024-10-15', '14:00:00', 'Scheduled', 'Grooming appointment', NOW(), NOW()),
(1, 2, 2, '2024-10-18', '09:00:00', 'Scheduled', 'Annual checkup for canary', NOW(), NOW());

