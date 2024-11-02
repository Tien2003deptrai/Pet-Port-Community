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
  images TEXT,
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
  images TEXT,
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
  appointment_time TIME NOT NULL,
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
  petOwner_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (petOwner_id) REFERENCES Users(id) ON DELETE CASCADE,
  UNIQUE (petOwner_id, created_at)
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
  petOwner_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (petOwner_id) REFERENCES Users(id) ON DELETE CASCADE,
  UNIQUE (title, petOwner_id)
);

CREATE TABLE Comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  petOwner_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
  FOREIGN KEY (petOwner_id) REFERENCES Users(id) ON DELETE CASCADE,
  UNIQUE (post_id, petOwner_id, created_at)
);

CREATE TABLE Likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  petOwner_id INT NOT NULL,
  post_id INT,
  comment_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (petOwner_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES Comments(id) ON DELETE CASCADE,
  UNIQUE (petOwner_id, post_id),
  UNIQUE (petOwner_id, comment_id)
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
  petOwner_id INT NOT NULL,
  product_id INT,
  service_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (petOwner_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE SET NULL,
  FOREIGN KEY (service_id) REFERENCES Services(id) ON DELETE SET NULL,
  UNIQUE (petOwner_id, product_id),
  UNIQUE (petOwner_id, service_id)
);

