# Use a Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json before other files to leverage Docker caching
COPY package*.json ./

# Fix permissions for the files
RUN chown -R node:node /home/node/app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Change user to "node" for running the application
USER node

# Expose the application port (adjust according to your app)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
