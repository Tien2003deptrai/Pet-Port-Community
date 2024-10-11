# Sử dụng Node.js phiên bản 20
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file package.json và package-lock.json
COPY package*.json /app/

# Cài đặt các package phụ thuộc
RUN npm install

# Copy script wait-for-it.sh để chờ MySQL sẵn sàng
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 5000 cho ứng dụng Node.js
EXPOSE 5000

# Sử dụng wait-for-it để đảm bảo MySQL sẵn sàng trước khi khởi động Node.js
CMD ["wait-for-it.sh", "mysql_db:3306", "--", "npm", "start"]
