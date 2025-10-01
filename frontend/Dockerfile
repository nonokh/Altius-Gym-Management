# Frontend Dockerfile (Optional - for Docker deployment)
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# For production build, use:
# RUN npm run build
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
