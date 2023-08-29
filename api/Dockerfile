FROM node:17-alpine

# RUN npm install -g nodemon

WORKDIR /app   

COPY package.json .

# At the build time
RUN npm install

# copy the files from source(local) to dest(on docker)
COPY . .

EXPOSE 4000

# After the container is up and runnning 
CMD ["npm", "start"]
