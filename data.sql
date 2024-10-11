create database a_pet11111;
use a_pet11111;
SELECT * FROM a_pet11111;


CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  role ENUM('PetOwner', 'SalesCenter', 'Doctor', 'Admin') NOT NULL,
  full_name VARCHAR(100),
  date_of_birth DATE,
  address VARCHAR(255),
  location_id INT,
  avatar_url VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  last_login DATETIME,
  reset_password_token VARCHAR(255),
  reset_password_expires_at DATETIME,
  verification_token VARCHAR(255),
  verification_token_expires_at DATETIME,
  business_name VARCHAR(100),
  license_number VARCHAR(50),
  tax_id VARCHAR(20),
  website VARCHAR(255),
  business_description TEXT,
  opening_hours TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES Locations(id) ON DELETE SET NULL,
  UNIQUE (username, email)
);

CREATE TABLE Locations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('City', 'District', 'Commune') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (name, type)
);

CREATE TABLE Categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('Product', 'Service', 'Pet') NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (name, type)
);

CREATE TABLE Pets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  category_id INT,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(50),
  age INT,
  gender ENUM('Male', 'Female', 'Unknown') NOT NULL,
  description TEXT,
  medical_history TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL,
  UNIQUE (name, owner_id)
);

CREATE TABLE Products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sales_center_id INT NOT NULL,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  sku VARCHAR(50) UNIQUE,
  is_active BOOLEAN DEFAULT true,
  images TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sales_center_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL,
  UNIQUE (sku)
);

CREATE TABLE Services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  doctor_id INT NOT NULL,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctor_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL,
  UNIQUE (name, doctor_id)
);

CREATE TABLE Appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pet_owner_id INT NOT NULL,
  pet_id INT NOT NULL,
  doctor_id INT NOT NULL,
  service_id INT NOT NULL,
  appointment_date DATETIME NOT NULL,
  status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_owner_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (pet_id) REFERENCES Pets(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE CASCADE,
  UNIQUE (pet_id, doctor_id, appointment_date)
);

CREATE TABLE Orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Users(id) ON DELETE CASCADE,
  UNIQUE (customer_id, created_at)
);

-- Bảng dành cho sản phẩm trong đơn hàng
CREATE TABLE OrderItems (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE SET NULL,
  UNIQUE (order_id, product_id)
);

-- Bảng dành cho dịch vụ trong đơn hàng
CREATE TABLE OrderServices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  service_id INT NOT NULL,
  quantity INT DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE SET NULL,
  UNIQUE (order_id, service_id)
);

CREATE TABLE Payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery') NOT NULL,
  status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
  transaction_id VARCHAR(100),
  payment_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
  UNIQUE (transaction_id)
);

CREATE TABLE Posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  UNIQUE (title, user_id)
);

CREATE TABLE Comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  UNIQUE (post_id, user_id, created_at)
);

CREATE TABLE Likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT,
  comment_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES Comments(id) ON DELETE CASCADE,
  UNIQUE (user_id, post_id),
  UNIQUE (user_id, comment_id)
);

CREATE TABLE Reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  reviewer_id INT NOT NULL,
  product_id INT,
  service_id INT,
  rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewer_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE SET NULL,
  FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE SET NULL,
  UNIQUE (reviewer_id, product_id),
  UNIQUE (reviewer_id, service_id)
);

CREATE TABLE Coupons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type ENUM('Percentage', 'Fixed Amount') NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  product_id INT, 
  FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE SET NULL, -- Foreign key constraint
  UNIQUE (code)
);

CREATE TABLE Wishlists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT,
  service_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE SET NULL,
  FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE SET NULL,
  UNIQUE (user_id, product_id),
  UNIQUE (user_id, service_id)
);

-- Dữ liệu cho bảng Locations
INSERT INTO Locations (name, type, createdAt, updatedAt) VALUES
('Hà Đông', 'District', NOW(), NOW()),
('Ba Đình', 'District', NOW(), NOW()),
('Hoàn Kiếm', 'District', NOW(), NOW()),
('Tây Hồ', 'District', NOW(), NOW()),
('Cầu Giấy', 'District', NOW(), NOW()),
('Thanh Xuân', 'District', NOW(), NOW()),
('Đống Đa', 'District', NOW(), NOW()),
('Hai Bà Trưng', 'District', NOW(), NOW()),
('Hoàng Mai', 'District', NOW(), NOW()),
('Long Biên', 'District', NOW(), NOW());

-- Dữ liệu cho bảng Categories
INSERT INTO Categories (name, type, is_active, createdAt, updatedAt) VALUES
('Dog', 'Pet', true, NOW(), NOW()),
('Cat', 'Pet', true, NOW(), NOW()),
('Vaccination', 'Service', true, NOW(), NOW()),
('Grooming', 'Service', true, NOW(), NOW()),
('Food', 'Product', true, NOW(), NOW()),
('Toys', 'Product', true, NOW(), NOW()),
('Surgery', 'Service', true, NOW(), NOW()),
('Supplements', 'Product', true, NOW(), NOW()),
('Bird', 'Pet', true, NOW(), NOW()),
('Reptile', 'Pet', true, NOW(), NOW());

-- Dữ liệu cho bảng Users
INSERT INTO Users (
    username, password, email, phone, role, full_name, 
    date_of_birth, address, location_id, avatar_url, 
    is_active, is_verified, last_login, 
    reset_password_token, reset_password_expires_at, 
    verification_token, verification_token_expires_at, 
    business_name, license_number, tax_id, 
    website, business_description, opening_hours, 
    latitude, longitude, createdAt, updatedAt
) VALUES
('nguyenvana', 'password123', 'nguyenvana@example.com', '0912345678', 'PetOwner', 'Nguyễn Văn A', 
 '1990-05-15', '123 Đường ABC, Ba Đình', 2, NULL, 
 TRUE, TRUE, '2024-04-01 09:00:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.0277644, 105.8341598, NOW(), NOW()),

('tranngocanh', 'password456', 'tranngocanh@example.com', '0987654321', 'Doctor', 'Trần Ngọc Anh', 
 '1985-08-22', '456 Đường DEF, Thanh Xuân', 3, NULL, 
 TRUE, TRUE, '2024-04-02 10:30:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.030716, 105.852630, NOW(), NOW()),

('salescenter1', 'password789', 'salescenter1@example.com', '0901122334', 'SalesCenter', 'Sales Center 1', 
 NULL, '789 Đường GHI, Quận 1', 5, NULL, 
 TRUE, TRUE, '2024-04-03 12:45:00', 
 NULL, NULL, 
 NULL, NULL, 
 'Sales Center Alpha', 'LIC12345', 'TAX67890', 
 'http://salescenter1.example.com', 'Chuyên cung cấp sản phẩm cho thú cưng', '8:00 AM - 6:00 PM', 
 10.823099, 106.629664, NOW(), NOW()),

('hoangthihue', 'password123', 'hoangthihue@example.com', '0909988776', 'PetOwner', 'Hoàng Thị Huệ', 
 '1995-03-10', '789 Đường JKL, Cầu Giấy', 4, NULL, 
 TRUE, TRUE, '2024-04-05 11:00:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.029778, 105.793332, NOW(), NOW()),

('nguyenbvan', 'password321', 'nguyenbvan@example.com', '0977654321', 'Doctor', 'Nguyễn B Văn', 
 '1982-11-20', '123 Đường ABC, Đống Đa', 7, NULL, 
 TRUE, TRUE, '2024-04-07 08:15:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.013657, 105.841984, NOW(), NOW()),

('trankimchi', 'password654', 'trankimchi@example.com', '0902334455', 'PetOwner', 'Trần Kim Chi', 
 '1990-12-25', '456 Đường XYZ, Hoàn Kiếm', 3, NULL, 
 TRUE, TRUE, '2024-04-10 16:45:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.028511, 105.848018, NOW(), NOW()),

('phamthidung', 'password789', 'phamthidung@example.com', '0911223344', 'SalesCenter', 'Phạm Thị Dung', 
 '1988-06-30', '789 Đường UVW, Tây Hồ', 5, NULL, 
 TRUE, TRUE, '2024-04-11 14:30:00', 
 NULL, NULL, 
 NULL, NULL, 
 'Pet Supplies', 'LIC55667', 'TAX23456', 
 'http://petsupplies.vn', 'Chuyên cung cấp phụ kiện cho thú cưng', '9:00 AM - 5:00 PM', 
 21.051777, 105.819454, NOW(), NOW()),

('leminhtu', 'password456', 'leminhtu@example.com', '0901444555', 'Doctor', 'Lê Minh Tú', 
 '1979-05-05', '123 Đường OPQ, Hoàng Mai', 9, NULL, 
 TRUE, TRUE, '2024-04-12 07:50:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.004276, 105.870515, NOW(), NOW()),

('nguyenthuy', 'password888', 'nguyenthuy@example.com', '0909876543', 'PetOwner', 'Nguyễn Thúy', 
 '1994-07-15', '234 Đường STU, Hai Bà Trưng', 8, NULL, 
 TRUE, TRUE, '2024-04-13 13:15:00', 
 NULL, NULL, 
 NULL, NULL, 
 NULL, NULL, NULL, 
 NULL, NULL, NULL, 
 21.005904, 105.859499, NOW(), NOW()),

('dangkimphu', 'password999', 'dangkimphu@example.com', '0911555666', 'SalesCenter', 'Đặng Kim Phú', 
 NULL, '456 Đường VWX, Long Biên', 10, NULL, 
 TRUE, TRUE, '2024-04-14 09:30:00', 
 NULL, NULL, 
 NULL, NULL, 
 'Pet Zone', 'LIC99887', 'TAX54321', 
 'http://petzone.vn', 'Cửa hàng đồ chơi cho thú cưng', '8:00 AM - 6:00 PM', 
 21.052328, 105.912222, NOW(), NOW());


-- Dữ liệu cho bảng Pets
INSERT INTO Pets (owner_id, category_id, name, breed, age, gender, description, medical_history, is_active, createdAt, updatedAt) VALUES
(1, 1, 'Buddy', 'Golden Retriever', 3, 'Male', 'Friendly and playful', 'Vaccinated', true, NOW(), NOW()),
(2, 2, 'Whiskers', 'Persian', 2, 'Female', 'Calm and independent', 'None', true, NOW(), NOW()),
(6, 3, 'Tweety', 'Canary', 1, 'Female', 'Loves to sing', 'None', true, NOW(), NOW()),
(1, 1, 'Rocky', 'Bulldog', 4, 'Male', 'Strong and quiet', 'Hip dysplasia', true, NOW(), NOW()),
(2, 2, 'Shadow', 'Siamese', 5, 'Male', 'Curious and adventurous', 'Neutered', true, NOW(), NOW()),
(1, 1, 'Bella', 'Beagle', 2, 'Female', 'Energetic and playful', 'None', true, NOW(), NOW()),
(6, 4, 'Speedy', 'Turtle', 10, 'Unknown', 'Slow and steady', 'None', true, NOW(), NOW()),
(1, 1, 'Max', 'Labrador', 3, 'Male', 'Obedient and friendly', 'Vaccinated', true, NOW(), NOW()),
(2, 2, 'Luna', 'Sphynx', 1, 'Female', 'Affectionate and curious', 'None', true, NOW(), NOW()),
(6, 3, 'Sunny', 'Parrot', 2, 'Male', 'Talkative and friendly', 'None', true, NOW(), NOW());

-- Dữ liệu cho bảng Products
INSERT INTO Products (sales_center_id, category_id, name, description, price, stock_quantity, sku, images, createdAt, updatedAt) VALUES
(4, 5, 'Premium Dog Food', 'High-quality food for dogs', 29.99, 100, 'DOGFOOD001', 'dogfood1.jpg', NOW(), NOW()),
(4, 6, 'Cat Toy', 'Interactive toy for cats', 9.99, 200, 'CATTOY001', 'cattoy1.jpg', NOW(), NOW()),
(7, 8, 'Fish Oil Supplements', 'Supplements for healthy skin and coat', 19.99, 150, 'FISHOIL001', 'fishoil1.jpg', NOW(), NOW()),
(4, 5, 'Dog Chew Toy', 'Durable chew toy for dogs', 12.99, 50, 'DOGTOY001', 'dogtoy1.jpg', NOW(), NOW()),
(7, 5, 'Organic Dog Food', 'Organic ingredients for dogs', 35.99, 120, 'ORGFOOD001', 'organicdogfood.jpg', NOW(), NOW()),
(4, 6, 'Cat Scratching Post', 'Essential scratching post for cats', 25.99, 70, 'SCRATCH001', 'scratchpost.jpg', NOW(), NOW()),
(7, 8, 'Vitamin Supplements', 'Multivitamin for pets', 22.99, 180, 'VITAMIN001', 'vitaminsupplements.jpg', NOW(), NOW()),
(4, 6, 'Cat Bed', 'Comfortable bed for cats', 39.99, 90, 'CATBED001', 'catbed.jpg', NOW(), NOW()),
(7, 5, 'Dog Shampoo', 'Gentle shampoo for dogs', 14.99, 110, 'DOGSHAM001', 'dogshampoo.jpg', NOW(), NOW()),
(7, 5, 'Dog Leash', 'Durable leash for walking dogs', 18.99, 95, 'LEASH001', 'dogleash.jpg', NOW(), NOW());

-- Dữ liệu cho bảng Services
INSERT INTO Services (doctor_id, category_id, name, description, price, is_active, createdAt, updatedAt) VALUES
(3, 3, 'Vaccination Package', 'Full vaccination package for pets', 99.99, true, NOW(), NOW()),
(8, 4, 'Grooming Service', 'Complete grooming for pets', 49.99, true, NOW(), NOW()),
(3, 7, 'Pet Surgery', 'Expert surgery for pets', 299.99, true, NOW(), NOW()),
(9, 3, 'Annual Checkup', 'Comprehensive checkup for pets', 79.99, true, NOW(), NOW()),
(9, 4, 'Dental Cleaning', 'Teeth cleaning service for pets', 59.99, true, NOW(), NOW()),
(3, 7, 'Emergency Surgery', '24/7 emergency surgery for pets', 399.99, true, NOW(), NOW()),
(8, 3, 'Neutering Service', 'Neutering for male pets', 99.99, true, NOW(), NOW()),
(9, 4, 'Pet Daycare', 'Daycare service for pets', 29.99, true, NOW(), NOW()),
(8, 4, 'Pet Sitting', 'Pet sitting service at your home', 19.99, true, NOW(), NOW()),
(9, 3, 'Ultrasound Service', 'Ultrasound diagnostics for pets', 89.99, true, NOW(), NOW());

-- Dữ liệu cho bảng Appointments
INSERT INTO Appointments (pet_owner_id, pet_id, doctor_id, service_id, appointment_date, status, notes, createdAt, updatedAt) VALUES
(2, 2, 8, 2, '2024-10-15 14:00:00', 'Scheduled', 'Grooming appointment', NOW(), NOW()),
(6, 3, 9, 4, '2024-10-18 09:00:00', 'Scheduled', 'Annual checkup for canary', NOW(), NOW()),
(1, 4, 3, 7, '2024-10-20 16:00:00', 'Completed', 'Hip dysplasia surgery', NOW(), NOW()),
(2, 5, 9, 3, '2024-10-21 11:00:00', 'Scheduled', 'Vaccination for Siamese cat', NOW(), NOW()),
(6, 6, 8, 7, '2024-10-22 13:00:00', 'Scheduled', 'Neutering turtle', NOW(), NOW()),
(1, 7, 3, 1, '2024-10-25 12:00:00', 'Scheduled', 'Vaccination booster for Beagle', NOW(), NOW()),
(2, 8, 9, 4, '2024-10-27 14:00:00', 'Scheduled', 'Grooming for Sphynx', NOW(), NOW()),
(6, 9, 8, 3, '2024-10-30 10:00:00', 'Cancelled', 'Ultrasound check for parrot', NOW(), NOW()),
(1, 10, 3, 1, '2024-11-01 09:00:00', 'Scheduled', 'Routine vaccination for Labrador', NOW(), NOW());

-- Dữ liệu cho bảng Orders
INSERT INTO Orders (petOwner_id, total_amount, status, createdAt, updatedAt) VALUES
(1, 59.98, 'Processing', NOW(), NOW()),
(2, 29.99, 'Pending', NOW(), NOW()),
(6, 49.99, 'Processing', NOW(), NOW()),
(1, 35.99, 'Shipped', NOW(), NOW()),
(2, 9.99, 'Delivered', NOW(), NOW()),
(6, 22.99, 'Cancelled', NOW(), NOW()),
(1, 25.99, 'Pending', NOW(), NOW()),
(2, 14.99, 'Processing', NOW(), NOW()),
(6, 39.99, 'Delivered', NOW(), NOW()),
(1, 18.99, 'Shipped', NOW(), NOW());

-- Dữ liệu cho bảng OrderItems
INSERT INTO OrderItems (order_id, product_id, quantity, unit_price, subtotal, createdAt, updatedAt) VALUES
(1, 1, 2, 29.99, 59.98, NOW(), NOW()),
(2, 2, 1, 29.99, 29.99, NOW(), NOW()),
(3, 4, 1, 49.99, 49.99, NOW(), NOW()),
(4, 5, 1, 35.99, 35.99, NOW(), NOW()),
(5, 6, 1, 9.99, 9.99, NOW(), NOW()),
(6, 7, 1, 22.99, 22.99, NOW(), NOW()),
(7, 8, 1, 25.99, 25.99, NOW(), NOW()),
(8, 9, 1, 14.99, 14.99, NOW(), NOW()),
(9, 10, 1, 39.99, 39.99, NOW(), NOW()),
(10, 3, 1, 18.99, 18.99, NOW(), NOW());

-- Dữ liệu cho bảng OrderServices
INSERT INTO OrderServices (order_id, service_id, quantity, unit_price, subtotal, createdAt, updatedAt) VALUES
(1, 1, 1, 99.99, 99.99, NOW(), NOW()),
(2, 2, 1, 49.99, 49.99, NOW(), NOW()),
(3, 3, 1, 299.99, 299.99, NOW(), NOW()),
(4, 4, 1, 79.99, 79.99, NOW(), NOW()),
(5, 5, 1, 59.99, 59.99, NOW(), NOW()),
(6, 6, 1, 399.99, 399.99, NOW(), NOW()),
(7, 7, 1, 99.99, 99.99, NOW(), NOW()),
(8, 8, 1, 29.99, 29.99, NOW(), NOW()),
(9, 9, 1, 19.99, 19.99, NOW(), NOW()),
(10, 10, 1, 89.99, 89.99, NOW(), NOW());

-- Dữ liệu cho bảng Payments
INSERT INTO Payments (order_id, amount, payment_method, status, transaction_id, payment_date, createdAt, updatedAt) VALUES
(1, 59.98, 'Credit Card', 'Completed', 'TX123456789', '2024-10-10 10:00:00', NOW(), NOW()),
(2, 29.99, 'PayPal', 'Pending', 'TX987654321', '2024-10-10 11:00:00', NOW(), NOW()),
(3, 49.99, 'Bank Transfer', 'Completed', 'TX567891234', '2024-10-10 12:00:00', NOW(), NOW()),
(4, 35.99, 'Cash on Delivery', 'Completed', NULL, '2024-10-10 13:00:00', NOW(), NOW()),
(5, 9.99, 'Credit Card', 'Completed', 'TX345678912', '2024-10-10 14:00:00', NOW(), NOW()),
(6, 22.99, 'PayPal', 'Refunded', 'TX234567891', '2024-10-10 15:00:00', NOW(), NOW()),
(7, 25.99, 'Credit Card', 'Pending', 'TX678912345', '2024-10-10 16:00:00', NOW(), NOW()),
(8, 14.99, 'Bank Transfer', 'Pending', 'TX123459876', '2024-10-10 17:00:00', NOW(), NOW()),
(9, 39.99, 'Credit Card', 'Completed', 'TX098765432', '2024-10-10 18:00:00', NOW(), NOW()),
(10, 18.99, 'Cash on Delivery', 'Completed', NULL, '2024-10-10 19:00:00', NOW(), NOW());

-- Dữ liệu cho bảng Posts
INSERT INTO Posts (petOwner_Id, title, content, image_url, createdAt, updatedAt) VALUES
(1, 'My First Pet Experience', 'Having a pet has changed my life...', 'post1.jpg', NOW(), NOW()),
(2, 'Grooming Tips for Cats', 'Cats require special care for their fur...', 'post2.jpg', NOW(), NOW()),
(6, 'Caring for Exotic Pets', 'Exotic pets require unique attention...', 'post3.jpg', NOW(), NOW()),
(1, 'How to Train Your Dog', 'Training your dog requires patience...', 'post4.jpg', NOW(), NOW()),
(2, 'The Best Pet Food for Cats', 'After researching various brands...', 'post5.jpg', NOW(), NOW()),
(6, 'Top 10 Pet Toys', 'These toys will keep your pets entertained...', 'post6.jpg', NOW(), NOW()),
(1, 'Vaccination Importance', 'Vaccinations are essential for your pets...', 'post7.jpg', NOW(), NOW()),
(2, 'Pet-Friendly Holidays', 'Traveling with pets can be fun...', 'post8.jpg', NOW(), NOW()),
(6, 'Pet Diet and Nutrition', 'A proper diet is key to a healthy pet...', 'post9.jpg', NOW(), NOW()),
(1, 'Adopting a Rescue Pet', 'Rescue pets can bring joy...', 'post10.jpg', NOW(), NOW());

-- Dữ liệu cho bảng Comments
INSERT INTO Comments (post_id, petOwner_Id, content, createdAt, updatedAt) VALUES
(1, 2, 'Thanks for sharing your experience!', NOW(), NOW()),
(2, 1, 'Very helpful grooming tips, thank you!', NOW(), NOW()),
(3, 6, 'This is exactly what I needed, thanks!', NOW(), NOW()),
(4, 2, 'Training my dog has been a challenge, this helps.', NOW(), NOW()),
(5, 1, 'Great food recommendations for my cat.', NOW(), NOW()),
(6, 6, 'My pets love these toys!', NOW(), NOW()),
(7, 1, 'Vaccinations are so important, I agree.', NOW(), NOW()),
(8, 2, 'Looking forward to traveling with my pets.', NOW(), NOW()),
(9, 6, 'Diet really does make a difference for pets.', NOW(), NOW()),
(10, 1, 'Rescue pets are truly amazing!', NOW(), NOW());

-- Dữ liệu cho bảng Likes
INSERT INTO Likes (petOwner_Id, post_id, comment_id, createdAt, updatedAt) VALUES
(1, 1, 1, NOW(), NOW()),
(2, 2, 2, NOW(), NOW()),
(6, 3, 3, NOW(), NOW()),
(1, 4, 4, NOW(), NOW()),
(2, 5, 5, NOW(), NOW()),
(6, 6, 6, NOW(), NOW()),
(1, 7, 7, NOW(), NOW()),
(2, 8, 8, NOW(), NOW()),
(6, 9, 9, NOW(), NOW()),
(1, 10, 10, NOW(), NOW());

update likes set comment_id = 4 where id=4;
-- Dữ liệu cho bảng Reviews
INSERT INTO Reviews (reviewer_id, product_id, service_id, rating, title, comment, is_verified_purchase, createdAt, updatedAt) VALUES
(1, 1, NULL, 5, 'Amazing Dog Food', 'My dog loves this food!', true, NOW(), NOW()),
(2, 2, NULL, 4, 'Great Cat Toy', 'My cat enjoys playing with this toy.', true, NOW(), NOW()),
(6, 3, NULL, 5, 'Healthy Supplements', 'These supplements have improved my pet’s health.', true, NOW(), NOW()),
(1, 4, NULL, 3, 'Durable Toy', 'The toy is durable but could be better.', true, NOW(), NOW()),
(2, 5, NULL, 5, 'Organic Food', 'I love that it’s organic and my dog does too.', true, NOW(), NOW()),
(6, 6, NULL, 4, 'Good Scratching Post', 'My cat uses it daily, but it could be taller.', true, NOW(), NOW()),
(1, 7, NULL, 5, 'Vitamin Supplements', 'Excellent vitamins, my pet is much healthier.', true, NOW(), NOW()),
(2, 8, NULL, 5, 'Comfortable Bed', 'My cat loves sleeping on this bed.', true, NOW(), NOW()),
(6, 9, NULL, 4, 'Great Shampoo', 'Leaves my dog’s fur soft and shiny.', true, NOW(), NOW()),
(1, 10, NULL, 5, 'Strong Leash', 'Very durable leash for walks.', true, NOW(), NOW());

-- Dữ liệu cho bảng Coupons
INSERT INTO Coupons (code, description, discount_type, discount_value, start_date, end_date, is_active, product_id, createdAt, updatedAt) VALUES
('DISCOUNT10', 'Giảm 10% cho tất cả các sản phẩm', 'Percentage', 10.00, '2024-10-01', '2024-12-31', true, 1, NOW(), NOW()),
('DISCOUNT20', 'Giảm 20% cho đơn hàng trên 500k', 'Percentage', 20.00, '2024-10-01', '2024-11-30', true, 2, NOW(), NOW()),
('FIXED50', 'Giảm 50k cho đơn hàng từ 300k', 'Fixed Amount', 50.00, '2024-10-15', '2024-12-31', true, 3, NOW(), NOW()),
('FREESHIP', 'Miễn phí vận chuyển cho tất cả các đơn hàng', 'Fixed Amount', 0.00, '2024-10-10', '2024-11-10', true, NULL, NOW(), NOW()),
('WELCOME15', 'Giảm 15% cho khách hàng mới', 'Percentage', 15.00, '2024-09-01', '2024-12-31', true, 4, NOW(), NOW()),
('BLACKFRIDAY', 'Giảm giá 30% cho Black Friday', 'Percentage', 30.00, '2024-11-25', '2024-11-30', true, 5, NOW(), NOW()),
('SUMMER50', 'Giảm 50% cho sản phẩm mùa hè', 'Percentage', 50.00, '2024-06-01', '2024-08-31', false, 6, NOW(), NOW()),
('NEWYEAR2024', 'Giảm giá 20% nhân dịp năm mới', 'Percentage', 20.00, '2024-12-25', '2024-01-05', true, 7, NOW(), NOW()),
('SPRINGSALE', 'Giảm 100k cho đơn hàng từ 500k', 'Fixed Amount', 100.00, '2024-03-01', '2024-04-30', true, 8, NOW(), NOW()),
('LOYALTY5', 'Giảm 5% cho khách hàng thân thiết', 'Percentage', 5.00, '2024-01-01', '2024-12-31', true, 9, NOW(), NOW());

-- Dữ liệu cho bảng Wishlists
INSERT INTO Wishlists (user_id, product_id, service_id, createdAt, updatedAt) VALUES
(1, 1, NULL, NOW(), NOW()),
(1, 2, NULL, NOW(), NOW()),
(2, 3, NULL, NOW(), NOW()),
(2, 4, NULL, NOW(), NOW()),
(6, 5, NULL, NOW(), NOW()),
(6, 6, NULL, NOW(), NOW()),
(1, NULL, 1, NOW(), NOW()),
(2, NULL, 2, NOW(), NOW()),
(1, 7, NULL, NOW(), NOW()),
(6, 8, NULL, NOW(), NOW());



