create database apet0;
use apet0;
drop database apet0;

INSERT INTO Categories (name, type, is_active, createdAt, updatedAt) VALUES
('Chó', 'Thú cưng', true, NOW(), NOW()),
('Mèo', 'Thú cưng', true, NOW(), NOW()),
('Chích ngừa', 'Dịch vụ', true, NOW(), NOW()),
('Chăm sóc lông', 'Dịch vụ', true, NOW(), NOW()),
('Thức ăn', 'Sản phẩm', true, NOW(), NOW()),
('Đồ chơi', 'Sản phẩm', true, NOW(), NOW()),
('Thực phẩm bổ sung', 'Sản phẩm', true, NOW(), NOW()),
('Chim cảnh', 'Thú cưng', true, NOW(), NOW()),
('Bò sát', 'Thú cưng', true, NOW(), NOW()),
('Phụ kiện', 'Sản phẩm', true, NOW(), NOW());

INSERT INTO Users (
  username, password, email, phone, role, full_name, date_of_birth, address, avatar_url, 
  is_active, is_verified, createdAt, updatedAt
) 
VALUES 
('nguyen_van_a', 'hashedpassword1', 'nguyenvana@example.com', '0909123456', JSON_ARRAY('Doctor'), 'Nguyễn Văn A', 
 '1980-02-15', '123 Đường ABC, Quận 10, TP.HCM', 'http://example.com/avatar_nguyenvana.jpg', true, true, NOW(), NOW()),
('le_thi_b', 'hashedpassword2', 'lethib@example.com', '0918123456', JSON_ARRAY('Seller'), 'Lê Thị B', 
 '1985-06-20', '456 Đường DEF, Quận 1, TP.HCM', 'http://example.com/avatar_lethib.jpg', true, true, NOW(), NOW()),
('tran_huy_c', 'hashedpassword3', 'tranhuyc@example.com', '0987654321', JSON_ARRAY('PetOwner'), 'Trần Huy C', 
 '1993-10-11', '789 Đường GHI, Quận 5, TP.HCM', 'http://example.com/avatar_tranhuyc.jpg', true, false, NOW(), NOW()),
('pham_thu_d', 'hashedpassword4', 'phamthud@example.com', '0901234567', JSON_ARRAY('PetOwner'), 'Phạm Thu D', 
 '1990-12-30', '101 Đường JKL, Quận 3, TP.HCM', 'http://example.com/avatar_phamthud.jpg', true, true, NOW(), NOW()),
('vo_quoc_e', 'hashedpassword5', 'voquoce@example.com', '0978123456', JSON_ARRAY('Doctor'), 'Võ Quốc E', 
 '1982-08-25', '202 Đường MNO, Quận 7, TP.HCM', 'http://example.com/avatar_voquoce.jpg', true, false, NOW(), NOW()),
('nguyen_hoa_f', 'hashedpassword6', 'nguyenhoaf@example.com', '0967543210', JSON_ARRAY('Seller'), 'Nguyễn Hoà F', 
 '1988-09-09', '303 Đường PQR, Quận 4, TP.HCM', 'http://example.com/avatar_nguyenhoaf.jpg', true, true, NOW(), NOW()),
('hoang_an_g', 'hashedpassword7', 'hoangan@example.com', '0934567890', JSON_ARRAY('PetOwner'), 'Hoàng An G', 
 '1991-01-19', '404 Đường STU, Quận 8, TP.HCM', 'http://example.com/avatar_hoangan.jpg', true, false, NOW(), NOW()),
('le_khanh_h', 'hashedpassword8', 'lekhanh@example.com', '0951237894', JSON_ARRAY('Seller'), 'Lê Khánh H', 
 '1984-05-05', '505 Đường VWX, Quận 6, TP.HCM', 'http://example.com/avatar_lekhanh.jpg', true, true, NOW(), NOW()),
('tran_van_i', 'hashedpassword9', 'tranvani@example.com', '0945678901', JSON_ARRAY('Doctor'), 'Trần Văn I', 
 '1979-11-14', '606 Đường YZA, Quận 2, TP.HCM', 'http://example.com/avatar_tranvani.jpg', true, true, NOW(), NOW()),
('pham_thi_j', 'hashedpassword10', 'phamthij@example.com', '0921345678', JSON_ARRAY('PetOwner'), 'Phạm Thị J', 
 '1995-03-03', '707 Đường BCD, Quận 9, TP.HCM', 'http://example.com/avatar_phamthij.jpg', true, false, NOW(), NOW());
 
 
 INSERT INTO Pets (owner_id, category_id, name, breed, age, gender, description, medical_history, is_active, images, createdAt, updatedAt) 
VALUES 
(3, 1, 'Lucky', 'Phốc Sóc', 2, 'Đực', 'Thân thiện và năng động', 'Chích ngừa đầy đủ', true, 'https://example.com/lucky_phoc_soc.jpg', NOW(), NOW()),
(4, 2, 'Miu', 'Mèo Ba Tư', 3, 'Cái', 'Trầm tĩnh, thích yên tĩnh', 'Đã chích ngừa dại', true, 'https://example.com/miu_ba_tu.jpg', NOW(), NOW()),
(7, 1, 'Bông', 'Chihuahua', 1, 'Đực', 'Rất thông minh và đáng yêu', 'Chích ngừa sổ giun', true, 'https://example.com/bong_chihuahua.jpg', NOW(), NOW()),
(10, 2, 'Nhi', 'Mèo Anh Lông Ngắn', 4, 'Cái', 'Thích chơi đùa', 'Đã chích ngừa', true, 'https://example.com/nhi_aln.jpg', NOW(), NOW()),
(3, 8, 'Chích Chòe', 'Chim cảnh', 1, 'Đực', 'Hót rất hay', 'Không có bệnh', true, 'https://example.com/chich_choe.jpg', NOW(), NOW()),
(4, 9, 'Kỳ Nhông', 'Rồng Úc', 2, 'Đực', 'Thân thiện với trẻ em', 'Kiểm tra sức khỏe thường xuyên', true, 'https://example.com/ky_nhong.jpg', NOW(), NOW()),
(7, 1, 'Rex', 'Rottweiler', 3, 'Đực', 'Bảo vệ tốt, trung thành', 'Đã tiêm phòng dại', true, 'https://example.com/rex_rottweiler.jpg', NOW(), NOW()),
(10, 2, 'Mèo Mun', 'Mèo Ta', 2, 'Cái', 'Thích săn bắt chuột', 'Không có bệnh', true, 'https://example.com/meo_mun.jpg', NOW(), NOW()),
(4, 8, 'Vành Khuyên', 'Chim Vành Khuyên', 1, 'Đực', 'Rất nhanh nhẹn', 'Không có bệnh', true, 'https://example.com/vanh_khuyen.jpg', NOW(), NOW()),
(3, 9, 'Bé Tròn', 'Rùa Cạn', 5, 'Cái', 'Rất hiền lành', 'Khám định kỳ hàng năm', true, 'https://example.com/rua_can.jpg', NOW(), NOW());

INSERT INTO Products (sales_center_id, category_id, name, description, price, stock_quantity, sku, images, createdAt, updatedAt) VALUES
(2, 5, 'Thức ăn cao cấp cho chó', 'Dinh dưỡng đầy đủ cho chó mọi lứa tuổi', 300000, 150, 'DOGFOOD_VN001', 'https://example.com/dogfood_vn1.jpg', NOW(), NOW()),
(6, 6, 'Đồ chơi thông minh cho mèo', 'Giúp mèo hoạt động và giảm căng thẳng', 120000, 80, 'CATTOY_VN001', 'https://example.com/cattoy_vn1.jpg', NOW(), NOW()),
(2, 5, 'Thức ăn cho mèo lông dài', 'Bổ sung Omega 3 và 6 cho lông mượt', 250000, 100, 'CATFOOD_VN001', 'https://example.com/catfood_vn1.jpg', NOW(), NOW()),
(6, 7, 'Vitamin tổng hợp cho thú cưng', 'Giúp thú cưng khỏe mạnh hơn', 180000, 200, 'VITAMIN_VN001', 'https://example.com/vitamin_vn1.jpg', NOW(), NOW()),
(2, 6, 'Bóng đồ chơi cho chó', 'Chất liệu cao su bền, an toàn', 70000, 300, 'DOGTOY_VN001', 'https://example.com/dogtoy_vn1.jpg', NOW(), NOW()),
(6, 7, 'Omega 3 cho chó', 'Giúp da và lông khỏe mạnh', 220000, 120, 'OMEGA_VN001', 'https://example.com/omega_vn1.jpg', NOW(), NOW()),
(2, 5, 'Thức ăn hạt cho chim', 'Dinh dưỡng cân đối cho các loại chim', 100000, 50, 'BIRDFOOD_VN001', 'https://example.com/birdfood_vn1.jpg', NOW(), NOW()),
(6, 10, 'Dây dắt chó', 'Chất liệu nylon bền bỉ', 90000, 200, 'LEASH_VN001', 'https://example.com/leash_vn1.jpg', NOW(), NOW()),
(2, 7, 'Bột canxi cho chó mèo', 'Bổ sung canxi giúp xương chắc khỏe', 150000, 90, 'CALCIUM_VN001', 'https://example.com/calcium_vn1.jpg', NOW(), NOW()),
(6, 6, 'Mèo cào', 'Giúp mèo mài móng, giảm căng thẳng', 300000, 60, 'CATSCRATCH_VN001', 'https://example.com/catscratch_vn1.jpg', NOW(), NOW());

INSERT INTO Orders (petOwner_id, total_amount, status, createdAt, updatedAt) VALUES
(3, 300000, 'Đang xử lý', NOW(), NOW()),
(4, 120000, 'Chờ thanh toán', NOW(), NOW()),
(7, 180000, 'Hoàn thành', NOW(), NOW()),
(10, 70000, 'Hủy', NOW(), NOW()),
(3, 220000, 'Đang xử lý', NOW(), NOW()),
(4, 100000, 'Hoàn thành', NOW(), NOW()),
(7, 90000, 'Đã giao', NOW(), NOW()),
(10, 150000, 'Đã giao', NOW(), NOW()),
(3, 300000, 'Đang vận chuyển', NOW(), NOW()),
(4, 250000, 'Chờ thanh toán', NOW(), NOW());

INSERT INTO OrderItems (order_id, product_id, quantity, unit_price, subtotal, createdAt, updatedAt) VALUES
(1, 1, 1, 300000, 300000, NOW(), NOW()),
(2, 2, 1, 120000, 120000, NOW(), NOW()),
(3, 4, 1, 180000, 180000, NOW(), NOW()),
(4, 5, 1, 70000, 70000, NOW(), NOW()),
(5, 6, 1, 220000, 220000, NOW(), NOW()),
(6, 7, 1, 100000, 100000, NOW(), NOW()),
(7, 8, 1, 90000, 90000, NOW(), NOW()),
(8, 9, 1, 150000, 150000, NOW(), NOW()),
(9, 10, 1, 300000, 300000, NOW(), NOW()),
(10, 3, 1, 250000, 250000, NOW(), NOW());

INSERT INTO Payments (order_id, amount, payment_method, status, transaction_id, payment_date, createdAt, updatedAt) VALUES
(1, 300000, 'Thẻ tín dụng', 'Hoàn thành', 'TXVN123456', '2024-10-15 10:30:00', NOW(), NOW()),
(2, 120000, 'Thẻ tín dụng', 'Chờ xử lý', 'TXVN654321', '2024-10-16 11:00:00', NOW(), NOW()),
(3, 180000, 'Thẻ tín dụngt', 'Hoàn thành', 'TXVN789012', '2024-10-17 09:45:00', NOW(), NOW()),
(4, 70000, 'Thẻ tín dụng', 'Hủy', 'TXVN345678', '2024-10-18 13:15:00', NOW(), NOW()),
(5, 220000, 'Thẻ tín dụng', 'Đang xử lý', 'TXVN901234', '2024-10-19 08:20:00', NOW(), NOW()),
(6, 100000, 'Thẻ tín dụng', 'Hoàn thành', 'TXVN567890', '2024-10-20 15:00:00', NOW(), NOW()),
(7, 90000, 'Thẻ tín dụng', 'Chờ xác nhận', 'TXVN234567', '2024-10-21 16:45:00', NOW(), NOW()),
(8, 150000, 'Thẻ tín dụng', 'Đã giao', 'TXVN678901', '2024-10-22 17:30:00', NOW(), NOW()),
(9, 300000, 'Thẻ tín dụng', 'Đang vận chuyển', 'TXVN890123', '2024-10-23 14:10:00', NOW(), NOW()),
(10, 250000, 'Thẻ tín dụng', 'Chờ thanh toán', 'TXVN456789', '2024-10-24 19:00:00', NOW(), NOW());

INSERT INTO Posts (petOwner_Id, title, content, image_url, counterLike, createdAt, updatedAt) VALUES
(3, 'Chia sẻ kinh nghiệm nuôi chó', 'Chó của tôi rất đáng yêu và dễ thương...', 'https://example.com/post1.jpg', 15, NOW(), NOW()),
(4, 'Kinh nghiệm chăm sóc mèo lông dài', 'Mèo cần phải chải lông thường xuyên để giữ sạch sẽ...', 'https://example.com/post2.jpg', 22, NOW(), NOW()),
(7, 'Chơi với cún cưng hàng ngày', 'Mỗi ngày chơi với cún giúp tăng sự gắn kết...', 'https://example.com/post3.jpg', 18, NOW(), NOW()),
(10, 'Chăm sóc chim cảnh', 'Chim cần môi trường sạch và thức ăn phù hợp...', 'https://example.com/post4.jpg', 20, NOW(), NOW()),
(3, 'Lợi ích của thực phẩm bổ sung', 'Thực phẩm bổ sung giúp thú cưng khỏe mạnh hơn...', 'https://example.com/post5.jpg', 10, NOW(), NOW()),
(4, 'Cách chọn đồ chơi cho mèo', 'Đồ chơi phù hợp giúp mèo giảm stress và tăng vận động...', 'https://example.com/post6.jpg', 25, NOW(), NOW()),
(7, 'Bí quyết nuôi Rottweiler', 'Rottweiler rất trung thành và bảo vệ tốt...', 'https://example.com/post7.jpg', 30, NOW(), NOW()),
(10, 'Chăm sóc kỳ nhông', 'Kỳ nhông cần được kiểm tra sức khỏe định kỳ...', 'https://example.com/post8.jpg', 12, NOW(), NOW()),
(3, 'Bí quyết nuôi chim vành khuyên', 'Chim vành khuyên rất năng động và cần môi trường sạch...', 'https://example.com/post9.jpg', 18, NOW(), NOW()),
(4, 'Làm sao để chăm sóc rùa cạn?', 'Rùa cạn cần chế độ ăn đặc biệt và môi trường thích hợp...', 'https://example.com/post10.jpg', 22, NOW(), NOW());

INSERT INTO Comments (post_id, petOwner_Id, content, createdAt, updatedAt) VALUES
(1, 4, 'Cảm ơn bạn đã chia sẻ kinh nghiệm hữu ích!', NOW(), NOW()),
(2, 3, 'Mình cũng nuôi mèo, rất đồng cảm với bạn!', NOW(), NOW()),
(3, 7, 'Thật tuyệt! Chó của bạn rất đáng yêu!', NOW(), NOW()),
(4, 10, 'Chăm sóc chim đúng cách sẽ giúp chúng sống lâu hơn.', NOW(), NOW()),
(5, 4, 'Thực phẩm bổ sung thực sự quan trọng cho sức khỏe thú cưng.', NOW(), NOW()),
(6, 3, 'Mèo của tôi cũng thích đồ chơi này, rất vui nhộn!', NOW(), NOW()),
(7, 10, 'Rottweiler của bạn rất khỏe mạnh và trung thành.', NOW(), NOW()),
(8, 7, 'Cảm ơn đã chia sẻ kinh nghiệm chăm sóc kỳ nhông.', NOW(), NOW()),
(9, 4, 'Chim vành khuyên rất đáng yêu, cảm ơn bạn!', NOW(), NOW()),
(10, 3, 'Rùa cạn cần môi trường sống đặc biệt, cảm ơn bạn đã chia sẻ.', NOW(), NOW());

INSERT INTO Comments (post_id, petOwner_Id, content, createdAt, updatedAt) VALUES
(1, 4, 'Cảm ơn bạn đã chia sẻ kinh nghiệm hữu ích!', NOW(), NOW()),
(2, 3, 'Mình cũng nuôi mèo, rất đồng cảm với bạn!', NOW(), NOW()),
(3, 7, 'Thật tuyệt! Chó của bạn rất đáng yêu!', NOW(), NOW()),
(4, 10, 'Chăm sóc chim đúng cách sẽ giúp chúng sống lâu hơn.', NOW(), NOW()),
(5, 4, 'Thực phẩm bổ sung thực sự quan trọng cho sức khỏe thú cưng.', NOW(), NOW()),
(6, 3, 'Mèo của tôi cũng thích đồ chơi này, rất vui nhộn!', NOW(), NOW()),
(7, 10, 'Rottweiler của bạn rất khỏe mạnh và trung thành.', NOW(), NOW()),
(8, 7, 'Cảm ơn đã chia sẻ kinh nghiệm chăm sóc kỳ nhông.', NOW(), NOW()),
(9, 4, 'Chim vành khuyên rất đáng yêu, cảm ơn bạn!', NOW(), NOW()),
(10, 3, 'Rùa cạn cần môi trường sống đặc biệt, cảm ơn bạn đã chia sẻ.', NOW(), NOW());

INSERT INTO Coupons (code, description, discount_type, discount_value, start_date, end_date, is_active, product_id, createdAt, updatedAt) VALUES
('GIAM10', 'Giảm 10% cho tất cả sản phẩm', 'Percentage', 10.00, '2024-10-01', '2024-12-31', true, 1, NOW(), NOW()),
('GIAM15', 'Giảm 15% cho đơn hàng trên 500.000đ', 'Percentage', 15.00, '2024-11-01', '2024-11-30', true, 2, NOW(), NOW()),
('GIAM20', 'Giảm 20% cho khách hàng mới', 'Percentage', 20.00, '2024-10-15', '2024-12-15', true, 3, NOW(), NOW()),
('FREESHIP', 'Miễn phí vận chuyển cho đơn hàng trên 300.000đ', 'FreeShipping', 0, '2024-11-01', '2024-11-30', true, NULL, NOW(), NOW()),
('SALE50', 'Giảm 50% cho sản phẩm đồ chơi cho mèo', 'Percentage', 50.00, '2024-10-01', '2024-10-31', true, 2, NOW(), NOW()),
('GIAM5', 'Giảm 5% cho tất cả đơn hàng', 'Percentage', 5.00, '2024-10-01', '2024-12-31', true, NULL, NOW(), NOW()),
('MEMBER10', 'Giảm 10% cho thành viên VIP', 'Percentage', 10.00, '2024-11-01', '2024-12-31', true, NULL, NOW(), NOW()),
('BLACKFRI', 'Giảm 30% cho ngày Black Friday', 'Percentage', 30.00, '2024-11-25', '2024-11-25', true, NULL, NOW(), NOW()),
('XMAS25', 'Giảm 25% cho mùa Giáng sinh', 'Percentage', 25.00, '2024-12-01', '2024-12-25', true, NULL, NOW(), NOW()),
('NEWYEAR', 'Giảm 15% cho dịp Năm Mới', 'Percentage', 15.00, '2024-12-30', '2025-01-05', true, NULL, NOW(), NOW());

INSERT INTO Appointments (pet_owner_id, pet_id, doctor_id, appointment_date, appointment_time, status, notes, createdAt, updatedAt) 
VALUES
(3, 1, 1, '2024-11-05', '09:00:00', 'Đã đặt lịch', 'Khám sức khỏe định kỳ cho Lucky', NOW(), NOW()),
(4, 2, 5, '2024-11-06', '14:30:00', 'Đã đặt lịch', 'Kiểm tra sức khỏe cho Miu', NOW(), NOW()),
(7, 3, 1, '2024-11-07', '11:00:00', 'Đã đặt lịch', 'Tiêm phòng cho Bông', NOW(), NOW()),
(10, 4, 9, '2024-11-08', '16:00:00', 'Đã đặt lịch', 'Khám răng cho Nhi', NOW(), NOW()),
(3, 5, 1, '2024-11-09', '10:00:00', 'Đã đặt lịch', 'Kiểm tra sức khỏe cho Chích Chòe', NOW(), NOW()),
(4, 6, 5, '2024-11-10', '13:30:00', 'Đã đặt lịch', 'Khám bệnh cho Kỳ Nhông', NOW(), NOW()),
(7, 7, 1, '2024-11-11', '15:00:00', 'Đã đặt lịch', 'Tiêm phòng cho Rex', NOW(), NOW()),
(10, 8, 9, '2024-11-12', '08:30:00', 'Đã đặt lịch', 'Khám sức khỏe cho Mèo Mun', NOW(), NOW()),
(3, 9, 1, '2024-11-13', '14:00:00', 'Đã đặt lịch', 'Kiểm tra sức khỏe cho Vành Khuyên', NOW(), NOW()),
(4, 10, 5, '2024-11-14', '09:30:00', 'Đã đặt lịch', 'Khám định kỳ cho Bé Tròn', NOW(), NOW());

