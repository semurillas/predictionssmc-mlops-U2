# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Build app
RUN npm run build

# Start app
EXPOSE 3000
CMD ["npm", "start"]