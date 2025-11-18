# Base image
FROM node:24-alpine3.21

# Set working directory
WORKDIR /app

# Upgrade npm to avoid CVE-2025-5889
RUN npm install -g npm@latest

# Copy package files first for better layer caching
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install -f

# Install production dependencies (clean, reproducible)
# RUN npm ci --omit=dev && npm cache clean --force

# Copy application source code (after dependency install for layer caching)
COPY --chown=node:node . .

# Create /app/build directory and ensure correct permissions
RUN mkdir -p /app/build && chown -R node:node /app/build

# Switch to non-root user for better security
USER node

# Set environment variable for port
ENV PORT=5001

# Expose the app port
EXPOSE 5001

# Optional: Add healthcheck (adjust the path as needed)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5001/api/check/randomNumber || exit 1

# Optional: Copy environment config
# COPY .fintech-qa.env .env

# Start the app
CMD ["npm", "run", "dev"]
