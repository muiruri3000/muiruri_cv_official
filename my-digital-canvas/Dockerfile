# =========================
# 1. Build stage
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies (better caching)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build Vite app
RUN npm run build


# =========================
# 2. Production stage (Nginx)
# =========================
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx config (SPA routing enabled)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Vite build output
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]