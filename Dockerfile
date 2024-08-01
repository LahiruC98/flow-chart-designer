FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Install a lightweight web server
RUN npm install -g serve

ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 4008

# Command to run the web server and serve the built application
CMD ["serve", "-s", "build", "-l", "3000"]
