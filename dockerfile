# Step 1: Use a Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the container
COPY package.json .

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Install a lightweight web server (serve) to serve the built React app
RUN npm install -g serve

# Step 8: Expose the port the app will run on
EXPOSE 3000

# Step 9: Command to run the app
CMD ["serve", "-s", "build"]

