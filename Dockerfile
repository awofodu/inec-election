
#Creating a new image based on the node:16 image.
FROM node:16


# Creating a directory called `app` in the `usr/src` directory.
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Telling the Docker daemon that the container will listen on port 8080.
EXPOSE 8080
CMD [ "node", "index.js" ]