FROM node:20

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
COPY . .

EXPOSE 5000

# Use wait-for-it to ensure MySQL is ready before starting the app
CMD ["node", "src/server.js"]
