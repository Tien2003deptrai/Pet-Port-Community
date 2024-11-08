    create database pet_1;
    use pet_1;
    DESCRIBE Reviews;

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

    INSERT INTO Users (username, password, email, phone, role, full_name, date_of_birth, address, location_id, avatar_url, is_active, is_verified, last_login, reset_password_token, reset_password_expires_at, verification_token, verification_token_expires_at, cccd, clinic_address, practice_certificate, experience_years, opening_time, closing_time, cccd_front_image, cccd_back_image, certificate_image, createdAt, updatedAt) 
    VALUES 
    ('john_doe', 'hashedpassword1', 'john.doe@example.com', '123456789', JSON_ARRAY('PetOwner'), 'John Doe', '1985-03-25 00:00:00', '123 Elm St', 1, 'http://example.com/avatar1.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL, '048999111111', '101 Main St', 'Cert-101', 5, '08:00:00', '18:00:00', 'http://example.com/cccd_front1.jpg', 'http://example.com/cccd_back1.jpg', 'http://example.com/certificate1.jpg', NOW(), NOW()),
    ('jane_smith', 'hashedpassword2', 'jane.smith@example.com', '987654321', JSON_ARRAY('PetOwner'), 'Jane Smith', '1990-07-12 00:00:00', '456 Oak St', 2, 'http://example.com/avatar2.jpg', 1, 1, NULL, NULL, NULL, NULL, NULL, '048999222222', '202 Elm St', 'Cert-102', 7, '09:00:00', '17:00:00', 'http://example.com/cccd_front2.jpg', 'http://example.com/cccd_back2.jpg', 'http://example.com/certificate2.jpg', NOW(), NOW()),
    ('sam_nguyen', 'hashedpassword3', 'sam.nguyen@example.com', '111111111', JSON_ARRAY('PetOwner', 'Doctor'), 'Sam Nguyen', '1982-12-15 00:00:00', '789 Pine St', 3, 'http://example.com/avatar3.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL, '048999333333', '303 Elm St', 'Cert-103', 10, '10:00:00', '18:00:00', 'http://example.com/cccd_front3.jpg', 'http://example.com/cccd_back3.jpg', 'http://example.com/certificate3.jpg', NOW(), NOW()),
    ('lucy_liu', 'hashedpassword4', 'lucy.liu@example.com', '222222222', JSON_ARRAY('PetOwner'), 'Lucy Liu', '1992-10-30 00:00:00', '123 Maple St', 4, 'http://example.com/avatar4.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL, '048999444444', '404 Oak St', 'Cert-104', 3, '09:00:00', '17:00:00', 'http://example.com/cccd_front4.jpg', 'http://example.com/cccd_back4.jpg', 'http://example.com/certificate4.jpg', NOW(), NOW()),
    ('peter_parker', 'hashedpassword5', 'peter.parker@example.com', '333333333', JSON_ARRAY('PetOwner', 'Doctor'), 'Peter Parker', '1980-05-20 00:00:00', '456 Cedar St', 5, 'http://example.com/avatar5.jpg', 1, 1, NULL, NULL, NULL, NULL, NULL, '048999555555', '505 Birch St', 'Cert-105', 15, '08:00:00', '18:00:00', 'http://example.com/cccd_front5.jpg', 'http://example.com/cccd_back5.jpg', 'http://example.com/certificate5.jpg', NOW(), NOW()),
    ('tony_stark', 'hashedpassword6', 'tony.stark@example.com', '444444444', JSON_ARRAY('PetOwner', 'Doctor'), 'Tony Stark', '1975-06-01 00:00:00', '789 Walnut St', 6, 'http://example.com/avatar6.jpg', 1, 1, NULL, NULL, NULL, NULL, NULL, '048999666666', '606 Willow St', 'Cert-106', 20, '08:00:00', '19:00:00', 'http://example.com/cccd_front6.jpg', 'http://example.com/cccd_back6.jpg', 'http://example.com/certificate6.jpg', NOW(), NOW()),
    ('bruce_wayne', 'hashedpassword7', 'bruce.wayne@example.com', '555555555', JSON_ARRAY('PetOwner'), 'Bruce Wayne', '1985-04-15 00:00:00', '101 Ash St', 7, 'http://example.com/avatar7.jpg', 0, 0, NULL, NULL, NULL, NULL, NULL, '048999777777', '707 Palm St', 'Cert-107', 8, '07:00:00', '17:00:00', 'http://example.com/cccd_front7.jpg', 'http://example.com/cccd_back7.jpg', 'http://example.com/certificate7.jpg', NOW(), NOW()),
    ('clark_kent', 'hashedpassword8', 'clark.kent@example.com', '666666666', JSON_ARRAY('PetOwner'), 'Clark Kent', '1988-08-18 00:00:00', '303 Oak St', 8, 'http://example.com/avatar8.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL, '048999888888', '808 Maple St', 'Cert-108', 12, '08:00:00', '17:00:00', 'http://example.com/cccd_front8.jpg', 'http://example.com/cccd_back8.jpg', 'http://example.com/certificate8.jpg', NOW(), NOW()),
    ('diana_prince', 'hashedpassword9', 'diana.prince@example.com', '777777777', JSON_ARRAY('PetOwner', 'Doctor'), 'Diana Prince', '1983-03-10 00:00:00', '909 Cherry St', 9, 'http://example.com/avatar9.jpg', 1, 1, NULL, NULL, NULL, NULL, NULL, '048999999999', '909 Birch St', 'Cert-109', 14, '10:00:00', '18:00:00', 'http://example.com/cccd_front9.jpg', 'http://example.com/cccd_back9.jpg', 'http://example.com/certificate9.jpg', NOW(), NOW()),
    ('natasha_romanoff', 'hashedpassword10', 'natasha.romanoff@example.com', '888888888', JSON_ARRAY('PetOwner'), 'Natasha Romanoff', '1990-12-25 00:00:00', '505 Spruce St', 10, 'http://example.com/avatar10.jpg', 1, 0, NULL, NULL, NULL, NULL, NULL, '048991010101', '1010 Cedar St', 'Cert-110', 9, '08:30:00', '17:30:00', 'http://example.com/cccd_front10.jpg', 'http://example.com/cccd_back10.jpg', 'http://example.com/certificate10.jpg', NOW(), NOW());

    SHOW COLUMNS FROM Users;


    -- Dữ liệu cho bảng Pets
    INSERT INTO Pets (owner_id, category_id, name, breed, age, gender, description, medical_history, is_active, images, createdAt, updatedAt) 
    VALUES 
    (1, 1, 'Buddy', 'Golden Retriever', 3, 'Male', 'Friendly and playful', 'Vaccinated', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (2, 2, 'Whiskers', 'Persian', 2, 'Female', 'Calm and independent', 'None', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (6, 3, 'Tweety', 'Canary', 1, 'Female', 'Loves to sing', 'None', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (1, 1, 'Rocky', 'Bulldog', 4, 'Male', 'Strong and quiet', 'Hip dysplasia', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (2, 2, 'Shadow', 'Siamese', 5, 'Male', 'Curious and adventurous', 'Neutered', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (1, 1, 'Bella', 'Beagle', 2, 'Female', 'Energetic and playful', 'None', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (6, 4, 'Speedy', 'Turtle', 10, 'Unknown', 'Slow and steady', 'None', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (1, 1, 'Max', 'Labrador', 3, 'Male', 'Obedient and friendly', 'Vaccinated', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (2, 2, 'Luna', 'Sphynx', 1, 'Female', 'Affectionate and curious', 'None', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW()),
    (6, 3, 'Sunny', 'Parrot', 2, 'Male', 'Talkative and friendly', 'None', true, 'https://cdn.pixabay.com/photo/2023/08/18/15/01/cat-8198717_640.jpg', NOW(), NOW());

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
    -- Dữ liệu cho bảng Services
    INSERT INTO Services (doctor_id, category_id, name, description, price, is_active, images, createdAt, updatedAt) 
    VALUES 
    (3, 3, 'Vaccination Package', 'Full vaccination package for pets', 99.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (8, 4, 'Grooming Service', 'Complete grooming for pets', 49.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (3, 7, 'Pet Surgery', 'Expert surgery for pets', 299.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (9, 3, 'Annual Checkup', 'Comprehensive checkup for pets', 79.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (9, 4, 'Dental Cleaning', 'Teeth cleaning service for pets', 59.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (3, 7, 'Emergency Surgery', '24/7 emergency surgery for pets', 399.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (8, 3, 'Neutering Service', 'Neutering for male pets', 99.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (9, 4, 'Pet Daycare', 'Daycare service for pets', 29.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (8, 4, 'Pet Sitting', 'Pet sitting service at your home', 19.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW()),
    (9, 3, 'Ultrasound Service', 'Ultrasound diagnostics for pets', 89.99, true, 'https://vietnamcleanroom.com/vcr-media/22/8/24/bao-che-thuoc.jpg', NOW(), NOW());


    -- Dữ liệu cho bảng Appointments
    INSERT INTO Appointments (pet_owner_id, pet_id, doctor_id, service_id, appointment_date, appointment_time, status, notes, createdAt, updatedAt) 
    VALUES
    (2, 2, 8, 2, '2024-10-15', '14:00:00', 'Scheduled', 'Grooming appointment', NOW(), NOW()),
    (6, 3, 9, 4, '2024-10-18', '09:00:00', 'Scheduled', 'Annual checkup for canary', NOW(), NOW()),
    (1, 4, 3, 7, '2024-10-20', '16:00:00', 'Completed', 'Hip dysplasia surgery', NOW(), NOW()),
    (2, 5, 9, 3, '2024-10-21', '11:00:00', 'Scheduled', 'Vaccination for Siamese cat', NOW(), NOW()),
    (6, 6, 8, 7, '2024-10-22', '13:00:00', 'Scheduled', 'Neutering turtle', NOW(), NOW()),
    (1, 7, 3, 1, '2024-10-25', '12:00:00', 'Scheduled', 'Vaccination booster for Beagle', NOW(), NOW()),
    (2, 8, 9, 4, '2024-10-27', '14:00:00', 'Scheduled', 'Grooming for Sphynx', NOW(), NOW()),
    (6, 9, 8, 3, '2024-10-30', '10:00:00', 'Cancelled', 'Ultrasound check for parrot', NOW(), NOW()),
    (1, 10, 3, 1, '2024-11-01', '09:00:00', 'Scheduled', 'Routine vaccination for Labrador', NOW(), NOW());


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
