create database aaa11;
use aaa11;

INSERT INTO Locations (name, type, createdAt, updatedAt) VALUES
('Hà Đông', 'District', NOW(), NOW()),
('Nam Từ Liêm', 'District', NOW(), NOW()),
('Cầu Giấy', 'District', NOW(), NOW()),
('Thủ Đức', 'District', NOW(), NOW()),
('Gò Vấp', 'District', NOW(), NOW()),
('Tân Bình', 'District', NOW(), NOW()),
('Phú Nhuận', 'District', NOW(), NOW()),
('Bình Thạnh', 'District', NOW(), NOW()),
('Hoàng Mai', 'District', NOW(), NOW()),
('Long Biên', 'District', NOW(), NOW()),
('Đống Đa', 'District', NOW(), NOW()),
('Ninh Kiều', 'District', NOW(), NOW()),
('Hải Châu', 'District', NOW(), NOW()),
('Tây Hồ', 'District', NOW(), NOW()),
('Quận 10', 'District', NOW(), NOW()),
('Quận 11', 'District', NOW(), NOW()),
('Quận 12', 'District', NOW(), NOW()),
('Bắc Từ Liêm', 'District', NOW(), NOW()),
('Tân Phú', 'District', NOW(), NOW()),
('Hà Giang', 'City', NOW(), NOW());

INSERT INTO Categories (name, type, is_active, createdAt, updatedAt) VALUES
('Đồ chơi cho chó', 'Product', TRUE, NOW(), NOW()),
('Thức ăn cho mèo', 'Product', TRUE, NOW(), NOW()),
('Thức ăn cho chó', 'Product', TRUE, NOW(), NOW()),
('Đồ chơi cho mèo', 'Product', TRUE, NOW(), NOW()),
('Sản phẩm sức khỏe thú cưng', 'Product', TRUE, NOW(), NOW()),
('Dịch vụ huấn luyện', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ đi dạo', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ thú y', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ làm đẹp cho thú cưng', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ chẩn đoán bệnh', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ chăm sóc thú cưng', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ giao hàng thức ăn', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ tư vấn dinh dưỡng', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ tắm cho thú cưng', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ sửa chữa trang thiết bị thú cưng', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ đặt phòng cho thú cưng', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ chăm sóc sức khỏe', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ tắm cho mèo', 'Service', TRUE, NOW(), NOW()),
('Dịch vụ thú cưng trông giữ', 'Service', TRUE, NOW(), NOW());

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
 10.823099, 106.629664, NOW(), NOW());

INSERT INTO Pets (
    owner_id, category_id, name, breed, 
    age, gender, description, medical_history, 
    is_active, createdAt, updatedAt
) VALUES
(1, 3, 'Buddy', 'Golden Retriever', 3, 'Male', 'Một chú chó thân thiện.', 'Không có vấn đề sức khỏe.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Whiskers', 'Siamese', 2, 'Female', 'Mèo có bộ lông mượt mà.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Charlie', 'Beagle', 4, 'Male', 'Chó rất năng động.', 'Tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Luna', 'Persian', 3, 'Female', 'Mèo hiền lành.', 'Không có vấn đề sức khỏe.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Max', 'Poodle', 5, 'Male', 'Chó thông minh.', 'Có một số vấn đề dị ứng.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Bella', 'Maine Coon', 2, 'Female', 'Mèo to lớn.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Rocky', 'Boxer', 6, 'Male', 'Chó bảo vệ tốt.', 'Không có vấn đề sức khỏe.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Daisy', 'Ragdoll', 4, 'Female', 'Mèo rất tình cảm.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Buddy2', 'Golden Retriever', 3, 'Male', 'Một chú chó dễ thương.', 'Không có vấn đề sức khỏe.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Kitty', 'Siamese', 2, 'Female', 'Mèo đáng yêu.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Coco', 'Labrador', 4, 'Female', 'Chó rất thân thiện.', 'Không có vấn đề sức khỏe.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Mimi', 'Sphynx', 3, 'Female', 'Mèo rất dễ thương.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Ginger', 'Dachshund', 5, 'Female', 'Chó thông minh và nhanh nhẹn.', 'Có một số vấn đề dị ứng.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Nina', 'Scottish Fold', 2, 'Female', 'Mèo rất tình cảm và đáng yêu.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Ollie', 'French Bulldog', 4, 'Male', 'Chó vui vẻ và thân thiện.', 'Không có vấn đề sức khỏe.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Lily', 'British Shorthair', 3, 'Female', 'Mèo có bộ lông đẹp.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW()),

(1, 3, 'Teddy', 'Chihuahua', 5, 'Male', 'Chó nhỏ nhưng dũng cảm.', 'Không có vấn đề sức khỏe.', 
 TRUE, NOW(), NOW()),

(1, 4, 'Chloe', 'Bengal', 2, 'Female', 'Mèo rất nhanh nhẹn.', 'Đã tiêm phòng đầy đủ.', 
 TRUE, NOW(), NOW());

INSERT INTO Products (
    sales_center_id, category_id, name, description, 
    price, stock_quantity, sku, is_active, 
    images, createdAt, updatedAt
) VALUES
(2, 3, 'Vòng cổ cho chó', 'Vòng cổ thời trang cho chó.', 50000.00, 200, 'SKU54321', TRUE, 
 'http://example.com/images/dog_collar.jpg', NOW(), NOW()),

(3, 2, 'Cát vệ sinh cho mèo', 'Cát vệ sinh khử mùi cho mèo.', 120000.00, 300, 'SKU98765', TRUE, 
 'http://example.com/images/cat_litter.jpg', NOW(), NOW()),

(3, 6, 'Balo vận chuyển thú cưng', 'Balo tiện lợi cho việc vận chuyển thú cưng.', 350000.00, 20, 'SKU13579', TRUE, 
 'http://example.com/images/pet_carrier.jpg', NOW(), NOW()),

(3, 4, 'Bát ăn cho chó', 'Bát ăn không trượt cho chó.', 45000.00, 150, 'SKU24680', TRUE, 
 'http://example.com/images/dog_bowl.jpg', NOW(), NOW()),

(3, 1, 'Thức ăn cho mèo', 'Thức ăn dinh dưỡng cao cho mèo.', 130000.00, 120, 'SKU11223', TRUE, 
 'http://example.com/images/cat_food.jpg', NOW(), NOW()),

(3, 6, 'Lược chải lông thú cưng', 'Lược chải lông chuyên dụng cho thú cưng.', 60000.00, 80, 'SKU33445', TRUE, 
 'http://example.com/images/pet_brush.jpg', NOW(), NOW()),

(3, 3, 'Áo khoác cho chó', 'Áo khoác ấm áp cho chó.', 100000.00, 60, 'SKU55667', TRUE, 
 'http://example.com/images/dog_jacket.jpg', NOW(), NOW()),

(3, 5, 'Sữa tắm cho chó', 'Sữa tắm khử mùi cho chó.', 90000.00, 90, 'SKU77889', TRUE, 
 'http://example.com/images/dog_shampoo.jpg', NOW(), NOW()),

(3, 4, 'Đồ chơi cho mèo', 'Đồ chơi giúp mèo vận động.', 70000.00, 250, 'SKU99887', TRUE, 
 'http://example.com/images/cat_toy.jpg', NOW(), NOW()),

(3, 2, 'Cát vệ sinh hữu cơ', 'Cát vệ sinh làm từ nguyên liệu tự nhiên.', 150000.00, 80, 'SKU66554', TRUE, 
 'http://example.com/images/organic_cat_litter.jpg', NOW(), NOW()),

(2, 3, 'Đồ chơi thông minh cho chó', 'Đồ chơi giúp chó giải trí.', 70000.00, 150, 'SKU10101', TRUE, 
 'http://example.com/images/dog_toy.jpg', NOW(), NOW()),

(3, 4, 'Nệm cho chó', 'Nệm thoải mái cho chó.', 250000.00, 30, 'SKU20202', TRUE, 
 'http://example.com/images/dog_bed.jpg', NOW(), NOW()),

(3, 1, 'Thức ăn dinh dưỡng cho chó', 'Thức ăn dinh dưỡng cho chó.', 150000.00, 100, 'SKU30303', TRUE, 
 'http://example.com/images/dog_food.jpg', NOW(), NOW()),

(2, 2, 'Bánh thưởng cho chó', 'Bánh thưởng ngon cho chó.', 50000.00, 200, 'SKU40404', TRUE, 
 'http://example.com/images/dog_treats.jpg', NOW(), NOW()),

(3, 5, 'Sữa tắm kháng khuẩn cho mèo', 'Sữa tắm kháng khuẩn cho mèo.', 90000.00, 80, 'SKU50505', TRUE, 
 'http://example.com/images/cat_shampoo.jpg', NOW(), NOW()),

(2, 6, 'Vòng cổ phản quang cho chó', 'Vòng cổ an toàn cho chó.', 60000.00, 150, 'SKU60606', TRUE, 
 'http://example.com/images/dog_reflective_collar.jpg', NOW(), NOW()),

(3, 3, 'Cũi cho chó', 'Cũi an toàn cho chó.', 400000.00, 40, 'SKU70707', TRUE, 
 'http://example.com/images/dog_kennel.jpg', NOW(), NOW()),

(2, 2, 'Khăn tắm cho thú cưng', 'Khăn tắm mềm mại cho thú cưng.', 50000.00, 250, 'SKU80808', TRUE, 
 'http://example.com/images/pet_towel.jpg', NOW(), NOW()),

(3, 4, 'Mũ bảo hiểm cho thú cưng', 'Mũ bảo hiểm an toàn cho thú cưng.', 150000.00, 60, 'SKU90909', TRUE, 
 'http://example.com/images/pet_helmet.jpg', NOW(), NOW());

INSERT INTO Services (
    doctor_id, category_id, name, description, 
    price, is_active, createdAt, updatedAt
) VALUES
(2, 2, 'Chải lông cơ bản', 'Dịch vụ chải lông cho chó và mèo.', 500000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Khám bệnh định kỳ', 'Dịch vụ khám bệnh định kỳ cho thú cưng.', 300000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Tắm cho chó', 'Dịch vụ tắm cho chó.', 200000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Khám bệnh khẩn cấp', 'Dịch vụ khám bệnh khẩn cấp cho thú cưng.', 400000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Chăm sóc răng miệng', 'Dịch vụ chăm sóc răng miệng cho thú cưng.', 150000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Tư vấn dinh dưỡng', 'Dịch vụ tư vấn dinh dưỡng cho thú cưng.', 300000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Tiêm phòng', 'Dịch vụ tiêm phòng cho thú cưng.', 250000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Chăm sóc sức khỏe tổng quát', 'Dịch vụ chăm sóc sức khỏe tổng quát cho thú cưng.', 350000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Cắt tỉa lông', 'Dịch vụ cắt tỉa lông cho chó và mèo.', 600000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Phẫu thuật nhỏ', 'Dịch vụ phẫu thuật nhỏ cho thú cưng.', 1200000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Dịch vụ lưu trú', 'Dịch vụ lưu trú cho thú cưng.', 500000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Đặt lịch khám bệnh', 'Đặt lịch khám bệnh cho thú cưng.', 0.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Chăm sóc sau phẫu thuật', 'Dịch vụ chăm sóc thú cưng sau phẫu thuật.', 800000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Giáo dục thú cưng', 'Dịch vụ giáo dục và huấn luyện thú cưng.', 700000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Khám bệnh cho mèo', 'Dịch vụ khám bệnh cho mèo.', 300000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Dịch vụ điều trị', 'Dịch vụ điều trị các bệnh cho thú cưng.', 500000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Dịch vụ giảm béo', 'Dịch vụ giúp thú cưng giảm cân.', 400000.00, TRUE, 
 NOW(), NOW()),

(2, 6, 'Dịch vụ vận chuyển thú cưng', 'Dịch vụ vận chuyển thú cưng an toàn.', 600000.00, TRUE, 
 NOW(), NOW()),

(2, 2, 'Dịch vụ tư vấn sức khỏe', 'Dịch vụ tư vấn sức khỏe cho thú cưng.', 350000.00, TRUE, 
 NOW(), NOW());

INSERT INTO Appointments (
    pet_owner_id, pet_id, doctor_id, service_id, 
    appointment_date, status, notes, 
    createdAt, updatedAt
) VALUES
(1, 1, 2, 1, '2024-05-20 10:00:00', 'Scheduled', 'Cần chải lông cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-05-21 14:00:00', 'Scheduled', 'Khám bệnh định kỳ cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-01 09:00:00', 'Scheduled', 'Lịch hẹn lần hai cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-02 11:00:00', 'Scheduled', 'Lịch hẹn lần hai cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-03 13:00:00', 'Scheduled', 'Lịch hẹn lần ba cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-04 15:00:00', 'Scheduled', 'Lịch hẹn lần ba cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-05 09:30:00', 'Scheduled', 'Chăm sóc sức khỏe cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-06 14:30:00', 'Scheduled', 'Khám bệnh cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-07 10:30:00', 'Scheduled', 'Tắm cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-08 15:30:00', 'Scheduled', 'Tắm cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-09 12:00:00', 'Scheduled', 'Chải lông cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-10 17:00:00', 'Scheduled', 'Chải lông cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-11 10:00:00', 'Scheduled', 'Chăm sóc đặc biệt cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-12 11:00:00', 'Scheduled', 'Khám bệnh đặc biệt cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-13 12:30:00', 'Scheduled', 'Lịch hẹn lần bốn cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-14 13:30:00', 'Scheduled', 'Lịch hẹn lần bốn cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-15 14:30:00', 'Scheduled', 'Lịch hẹn lần năm cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-16 15:30:00', 'Scheduled', 'Lịch hẹn lần năm cho Whiskers.', 
 NOW(), NOW()),

(1, 1, 2, 1, '2024-06-17 16:00:00', 'Scheduled', 'Lịch hẹn lần sáu cho Buddy.', 
 NOW(), NOW()),

(1, 2, 2, 2, '2024-06-18 16:30:00', 'Scheduled', 'Lịch hẹn lần sáu cho Whiskers.', 
 NOW(), NOW());

INSERT INTO Orders (
    customer_id, total_amount, status, 
    createdAt, updatedAt
) VALUES
(1, 230000.00, 'Pending', NOW(), NOW()),
(1, 500000.00, 'Processing', NOW(), NOW()),
(1, 150000.00, 'Pending', NOW(), NOW()),
(1, 300000.00, 'Shipped', NOW(), NOW()),
(1, 100000.00, 'Delivered', NOW(), NOW()),
(1, 450000.00, 'Cancelled', NOW(), NOW()),
(1, 120000.00, 'Pending', NOW(), NOW()),
(1, 250000.00, 'Processing', NOW(), NOW()),
(1, 340000.00, 'Shipped', NOW(), NOW()),
(1, 670000.00, 'Delivered', NOW(), NOW()),
(1, 50000.00, 'Pending', NOW(), NOW()),
(1, 700000.00, 'Processing', NOW(), NOW()),
(1, 850000.00, 'Cancelled', NOW(), NOW()),
(1, 900000.00, 'Pending', NOW(), NOW()),
(1, 400000.00, 'Shipped', NOW(), NOW()),
(1, 800000.00, 'Delivered', NOW(), NOW()),
(1, 600000.00, 'Pending', NOW(), NOW()),
(1, 750000.00, 'Processing', NOW(), NOW()),
(1, 1200000.00, 'Shipped', NOW(), NOW()),
(1, 1100000.00, 'Delivered', NOW(), NOW());

INSERT INTO OrderItems (
    order_id, product_id, service_id, 
    quantity, unit_price, subtotal, 
    createdAt, updatedAt
) VALUES
(1, 1, NULL, 1, 50000.00, 50000.00, NOW(), NOW()),
(1, 2, NULL, 1, 120000.00, 120000.00, NOW(), NOW()),
(2, 1, NULL, 1, 150000.00, 150000.00, NOW(), NOW()),
(2, 3, NULL, 1, 70000.00, 70000.00, NOW(), NOW()),
(3, 4, NULL, 1, 50000.00, 50000.00, NOW(), NOW()),
(3, 5, NULL, 1, 120000.00, 120000.00, NOW(), NOW()),
(4, 1, NULL, 1, 200000.00, 200000.00, NOW(), NOW()),
(4, 2, NULL, 1, 100000.00, 100000.00, NOW(), NOW()),
(5, 3, NULL, 1, 250000.00, 250000.00, NOW(), NOW()),
(5, 4, NULL, 1, 350000.00, 350000.00, NOW(), NOW()),
(6, 5, NULL, 1, 150000.00, 150000.00, NOW(), NOW()),
(6, 6, NULL, 1, 300000.00, 300000.00, NOW(), NOW()),
(7, 7, NULL, 1, 400000.00, 400000.00, NOW(), NOW()),
(7, 8, NULL, 1, 450000.00, 450000.00, NOW(), NOW()),
(8, 9, NULL, 1, 500000.00, 500000.00, NOW(), NOW()),
(8, 10, NULL, 1, 600000.00, 600000.00, NOW(), NOW()),
(9, 1, NULL, 1, 230000.00, 230000.00, NOW(), NOW()),
(9, 2, NULL, 1, 300000.00, 300000.00, NOW(), NOW()),
(10, 3, NULL, 1, 80000.00, 80000.00, NOW(), NOW()),
(10, 4, NULL, 1, 90000.00, 90000.00, NOW(), NOW());

INSERT INTO Payments (
    order_id, amount, payment_method, status, 
    transaction_id, payment_date, 
    createdAt, updatedAt
) VALUES
(1, 230000.00, 'Credit Card', 'Completed', 'TXN123456789', '2024-05-20 10:05:00', 
 NOW(), NOW()),
(2, 500000.00, 'PayPal', 'Completed', 'TXN987654321', '2024-05-21 14:10:00', 
 NOW(), NOW()),
(3, 150000.00, 'Credit Card', 'Completed', 'TXN111111111', '2024-06-01 09:05:00', 
 NOW(), NOW()),
(4, 300000.00, 'Bank Transfer', 'Completed', 'TXN222222222', '2024-06-02 10:05:00', 
 NOW(), NOW()),
(5, 100000.00, 'Cash on Delivery', 'Completed', 'TXN333333333', '2024-06-03 11:05:00', 
 NOW(), NOW()),
(6, 450000.00, 'Credit Card', 'Failed', 'TXN444444444', '2024-06-04 12:05:00', 
 NOW(), NOW()),
(7, 120000.00, 'PayPal', 'Completed', 'TXN555555555', '2024-06-05 13:05:00', 
 NOW(), NOW()),
(8, 250000.00, 'Bank Transfer', 'Completed', 'TXN666666666', '2024-06-06 14:05:00', 
 NOW(), NOW()),
(9, 340000.00, 'Cash on Delivery', 'Completed', 'TXN777777777', '2024-06-07 15:05:00', 
 NOW(), NOW()),
(10, 670000.00, 'Credit Card', 'Completed', 'TXN888888888', '2024-06-08 16:05:00', 
 NOW(), NOW()),
(1, 230000.00, 'Credit Card', 'Completed', 'TXN999999999', '2024-06-09 17:05:00', 
 NOW(), NOW()),
(2, 500000.00, 'PayPal', 'Completed', 'TXN000000001', '2024-06-10 18:05:00', 
 NOW(), NOW()),
(3, 150000.00, 'Credit Card', 'Completed', 'TXN222222222', '2024-06-11 19:05:00', 
 NOW(), NOW()),
(4, 300000.00, 'Bank Transfer', 'Completed', 'TXN333333333', '2024-06-12 20:05:00', 
 NOW(), NOW()),
(5, 100000.00, 'Cash on Delivery', 'Completed', 'TXN444444444', '2024-06-13 21:05:00', 
 NOW(), NOW()),
(6, 450000.00, 'Credit Card', 'Failed', 'TXN555555555', '2024-06-14 22:05:00', 
 NOW(), NOW()),
(7, 120000.00, 'PayPal', 'Completed', 'TXN666666666', '2024-06-15 23:05:00', 
 NOW(), NOW()),
(8, 250000.00, 'Bank Transfer', 'Completed', 'TXN777777777', '2024-06-16 08:05:00', 
 NOW(), NOW()),
(9, 340000.00, 'Cash on Delivery', 'Completed', 'TXN888888888', '2024-06-17 09:05:00', 
 NOW(), NOW()),
(10, 670000.00, 'Credit Card', 'Completed', 'TXN999999999', '2024-06-18 10:05:00', 
 NOW(), NOW());

INSERT INTO Posts (
    user_id, title, content, image_url, 
    createdAt, updatedAt
) VALUES
(1, 'Chia sẻ về thú cưng của tôi', 'Đây là chú chó Buddy của tôi.', 
 'http://example.com/images/buddy.jpg', NOW(), NOW()),

(1, 'Những lưu ý khi chăm sóc mèo', 'Mèo cần được chăm sóc như thế nào?', 
 NULL, NOW(), NOW()),

(1, 'Làm thế nào để chăm sóc chó?', 'Một số mẹo chăm sóc chó.', 
 'http://example.com/images/care_dog.jpg', NOW(), NOW()),

(1, 'Khám sức khỏe thú cưng', 'Lợi ích của việc khám sức khỏe định kỳ.', 
 'http://example.com/images/vet_checkup.jpg', NOW(), NOW()),

(1, 'Thú cưng và tâm lý', 'Cách thú cưng ảnh hưởng đến tâm lý con người.', 
 NULL, NOW(), NOW()),

(1, 'Kinh nghiệm nuôi mèo', 'Những điều cần biết khi nuôi mèo.', 
 'http://example.com/images/cat_raising.jpg', NOW(), NOW()),

(1, 'Thú cưng trong gia đình', 'Thú cưng có thể thay đổi cuộc sống gia đình bạn.', 
 'http://example.com/images/pet_family.jpg', NOW(), NOW()),

(1, 'Thú cưng và trẻ em', 'Lợi ích của việc nuôi thú cưng cho trẻ nhỏ.', 
 NULL, NOW(), NOW()),

(1, 'Làm sao để thú cưng không buồn chán?', 'Một số cách giúp thú cưng vui vẻ.', 
 'http://example.com/images/pet_happiness.jpg', NOW(), NOW()),

(1, 'Cách chọn thức ăn cho thú cưng', 'Lời khuyên về dinh dưỡng cho thú cưng.', 
 NULL, NOW(), NOW()),

(1, 'Tại sao thú cưng là bạn tốt nhất?', 'Những lý do thú cưng là người bạn trung thành.', 
 'http://example.com/images/pet_best_friend.jpg', NOW(), NOW()),

(1, 'Chia sẻ về trải nghiệm thú cưng của tôi', 'Những kỷ niệm đáng nhớ với thú cưng.', 
 NULL, NOW(), NOW()),

(1, 'Thú cưng và sức khỏe', 'Lợi ích sức khỏe khi có thú cưng.', 
 'http://example.com/images/pet_health_benefits.jpg', NOW(), NOW()),

(1, 'Giáo dục thú cưng', 'Các phương pháp giáo dục thú cưng hiệu quả.', 
 NULL, NOW(), NOW()),

(1, 'Dịch vụ chăm sóc thú cưng', 'Giới thiệu các dịch vụ chăm sóc thú cưng.', 
 'http://example.com/images/pet_services.jpg', NOW(), NOW()),

(1, 'Đồ chơi cho thú cưng', 'Những món đồ chơi yêu thích của thú cưng.', 
 'http://example.com/images/pet_toys.jpg', NOW(), NOW()),

(1, 'Mẹo an toàn cho thú cưng', 'Làm thế nào để đảm bảo an toàn cho thú cưng.', 
 NULL, NOW(), NOW()),

(1, 'Hội chứng thú cưng', 'Những bệnh thường gặp ở thú cưng.', 
 'http://example.com/images/pet_syndromes.jpg', NOW(), NOW()),

(1, 'Cuộc sống với thú cưng', 'Chia sẻ về cuộc sống với thú cưng của tôi.', 
 NULL, NOW(), NOW());

INSERT INTO Comments (
    post_id, user_id, content, 
    createdAt, updatedAt
) VALUES
(1, 2, 'Buddy thật đáng yêu!', NOW(), NOW()),
(1, 3, 'Cảm ơn bạn đã chia sẻ.', NOW(), NOW()),
(2, 1, 'Thông tin rất hữu ích!', NOW(), NOW()),
(2, 3, 'Tôi sẽ thử ngay!', NOW(), NOW()),
(3, 2, 'Chó của tôi cũng rất thích!', NOW(), NOW()),
(3, 1, 'Cảm ơn bạn đã chia sẻ!', NOW(), NOW()),
(4, 3, 'Khám sức khỏe thú cưng là rất quan trọng!', NOW(), NOW()),
(4, 2, 'Tôi hoàn toàn đồng ý với bạn.', NOW(), NOW()),
(5, 1, 'Thú cưng thực sự có sức ảnh hưởng lớn.', NOW(), NOW()),
(5, 2, 'Đúng vậy, tôi thấy điều này đúng với mình.', NOW(), NOW()),
(6, 3, 'Mèo cần chăm sóc đặc biệt.', NOW(), NOW()),
(6, 1, 'Cảm ơn vì những mẹo hay!', NOW(), NOW()),
(7, 2, 'Thú cưng làm cho cuộc sống thêm thú vị.', NOW(), NOW()),
(7, 3, 'Tôi không thể sống thiếu thú cưng.', NOW(), NOW()),
(8, 1, 'Thú cưng rất tốt cho trẻ em.', NOW(), NOW()),
(8, 2, 'Cảm ơn bạn đã chia sẻ!', NOW(), NOW()),
(9, 3, 'Mình sẽ thử cách này!', NOW(), NOW()),
(9, 1, 'Những món đồ chơi tuyệt vời!', NOW(), NOW()),
(10, 2, 'Mình cần tìm hiểu thêm!', NOW(), NOW()),
(10, 3, 'Đúng là điều cần thiết!', NOW(), NOW());

INSERT INTO Likes (user_id, post_id, createdAt, updatedAt) VALUES
(2, 1, NOW(), NOW()),
(3, 2, NOW(), NOW()),
(1, 3, NOW(), NOW()),
(2, 4, NOW(), NOW()),
(3, 5, NOW(), NOW()),
(1, 6, NOW(), NOW()),
(2, 7, NOW(), NOW()),
(3, 8, NOW(), NOW()),
(1, 9, NOW(), NOW()),
(2, 10, NOW(), NOW()),
(3, 1, NOW(), NOW()),
(1, 2, NOW(), NOW()),
(2, 3, NOW(), NOW()),
(3, 4, NOW(), NOW()),
(1, 5, NOW(), NOW()),
(2, 6, NOW(), NOW()),
(3, 7, NOW(), NOW()),
(1, 8, NOW(), NOW()),
(2, 9, NOW(), NOW()),
(3, 10, NOW(), NOW()),
(1, 1, NOW(), NOW());

INSERT INTO Reviews (
    reviewer_id, product_id, service_id, 
    rating, title, comment, 
    is_verified_purchase, createdAt, updatedAt
) VALUES
(1, 1, NULL, 5, 'Thức ăn tuyệt vời', 'Buddy thích sản phẩm này rất nhiều!', 
 TRUE, NOW(), NOW()),
(1, NULL, 1, 4, 'Dịch vụ tốt', 'Dịch vụ chải lông rất chuyên nghiệp.', 
 TRUE, NOW(), NOW()),
(1, 2, NULL, 5, 'Cát vệ sinh tốt', 'Mèo của tôi rất thích.', 
 TRUE, NOW(), NOW()),
(1, NULL, 2, 3, 'Dịch vụ vừa đủ', 'Dịch vụ chưa tốt lắm.', 
 TRUE, NOW(), NOW()),
(1, 3, NULL, 4, 'Vòng cổ rất đẹp', 'Chó của tôi rất thích.', 
 TRUE, NOW(), NOW()),
(1, NULL, 1, 5, 'Dịch vụ tuyệt vời', 'Dịch vụ thú y rất tận tình.', 
 TRUE, NOW(), NOW()),
(1, 4, NULL, 3, 'Cát vệ sinh bình thường', 'Cát vệ sinh không có gì đặc biệt.', 
 TRUE, NOW(), NOW()),
(1, NULL, 2, 4, 'Dịch vụ tốt', 'Mèo của tôi rất hài lòng.', 
 TRUE, NOW(), NOW()),
(1, 5, NULL, 5, 'Dịch vụ hoàn hảo', 'Dịch vụ chăm sóc rất tốt.', 
 TRUE, NOW(), NOW()),
(1, NULL, 1, 4, 'Dịch vụ cần cải thiện', 'Dịch vụ tốt nhưng cần cải thiện thêm.', 
 TRUE, NOW(), NOW());

INSERT INTO Coupons (
    code, description, discount_type, discount_value, 
    start_date, end_date, product_id, is_active, 
    createdAt, updatedAt
) VALUES
('SAVE10', 'Giảm 10% cho đơn hàng đầu tiên', 'Percentage', 10.00, 
 '2024-01-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('DOGGROOM50', 'Giảm 50k cho dịch vụ chải lông', 'Fixed Amount', 50000.00, 
 '2024-05-01', '2024-06-30', NULL, TRUE, 
 NOW(), NOW()),

('PETLOVE15', 'Giảm 15% cho đơn hàng trên 500k', 'Percentage', 15.00, 
 '2024-03-01', '2024-09-30', NULL, TRUE, 
 NOW(), NOW()),

('BUDDY100', 'Giảm 100k cho đơn hàng đầu tiên', 'Fixed Amount', 100000.00, 
 '2024-02-01', '2024-10-30', NULL, TRUE, 
 NOW(), NOW()),

('FREESHIP', 'Miễn phí vận chuyển cho đơn hàng trên 300k', 'Fixed Amount', 0.00, 
 '2024-01-15', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('DISCOUNT20', 'Giảm 20% cho tất cả sản phẩm', 'Percentage', 20.00, 
 '2024-06-01', '2024-06-30', NULL, TRUE, 
 NOW(), NOW()),

('SAVEMORE', 'Giảm 30% cho đơn hàng trên 1 triệu', 'Percentage', 30.00, 
 '2024-07-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('BARK50', 'Giảm 50k cho các sản phẩm cho chó', 'Fixed Amount', 50000.00, 
 '2024-04-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('CATLOVE', 'Giảm 20k cho các sản phẩm cho mèo', 'Fixed Amount', 20000.00, 
 '2024-05-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('CLEANPET', 'Giảm 25% cho sản phẩm vệ sinh thú cưng', 'Percentage', 25.00, 
 '2024-08-01', '2024-09-30', NULL, TRUE, 
 NOW(), NOW()),

('HAPPYPET', 'Giảm 30k cho đơn hàng đầu tiên', 'Fixed Amount', 30000.00, 
 '2024-06-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('PETDISCOUNT', 'Giảm 10% cho các dịch vụ', 'Percentage', 10.00, 
 '2024-07-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('FAMILYPET', 'Giảm 50% cho dịch vụ cho gia đình có thú cưng', 'Percentage', 50.00, 
 '2024-09-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('WAGMORE', 'Giảm 15% cho tất cả sản phẩm cho chó', 'Percentage', 15.00, 
 '2024-10-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('PURRING', 'Giảm 10% cho tất cả sản phẩm cho mèo', 'Percentage', 10.00, 
 '2024-11-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('SAVEPET', 'Giảm 50k cho sản phẩm chăm sóc thú cưng', 'Fixed Amount', 50000.00, 
 '2024-08-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('PETSLOVE', 'Giảm 5% cho đơn hàng trên 200k', 'Percentage', 5.00, 
 '2024-12-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW()),

('THUYTHUC', 'Giảm 100k cho đơn hàng trên 500k', 'Fixed Amount', 100000.00, 
 '2024-12-01', '2024-12-31', NULL, TRUE, 
 NOW(), NOW());

INSERT INTO Wishlists (
    user_id, product_id, service_id, 
    createdAt, updatedAt
) VALUES
(1, 1, NULL, NOW(), NOW()),
(1, 2, 1, NOW(), NOW()),
(1, NULL, 2, NOW(), NOW()),
(1, 3, NULL, NOW(), NOW()),
(1, 4, NULL, NOW(), NOW()),
(1, 5, NULL, NOW(), NOW()),
(1, 6, NULL, NOW(), NOW()),
(1, 7, NULL, NOW(), NOW()),
(1, 8, NULL, NOW(), NOW()),
(1, 9, NULL, NOW(), NOW()),
(1, 10, NULL, NOW(), NOW()),
(1, 1, NULL, NOW(), NOW()),
(1, 2, NULL, NOW(), NOW()),
(1, 3, NULL, NOW(), NOW()),
(1, 4, NULL, NOW(), NOW()),
(1, 5, NULL, NOW(), NOW()),
(1, 6, NULL, NOW(), NOW()),
(1, 7, NULL, NOW(), NOW()),
(1, 8, NULL, NOW(), NOW()),
(1, 9, NULL, NOW(), NOW()),
(1, 10, NULL, NOW(), NOW());

