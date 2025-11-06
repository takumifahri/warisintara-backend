# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Create storage directories with proper permissions
RUN mkdir -p src/code/storage/uploads/profile \
    src/code/storage/uploads/peminjaman/item \
    src/code/storage/uploads/peminjaman/ruangan \
    src/code/storage/uploads/barang \
    src/code/storage/uploads/ruangan \
    src/code/storage/uploads/documents \
    src/code/storage/uploads/temp

# Generate Prisma client
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R nextjs:nodejs /usr/src/app

# Make sure storage directories are writable
RUN chmod -R 755 /usr/src/app/src/code/storage

USER nextjs

# Expose the application port
EXPOSE 3333

# Command to run the application
CMD ["npm", "run", "dev"]