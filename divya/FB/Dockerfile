FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port that your app runs on (typically 8080 or your server port)
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]