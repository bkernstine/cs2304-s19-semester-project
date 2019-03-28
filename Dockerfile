FROM node
WORKDIR /app
COPY package* ./
RUN npm install
COPY index.js .
EXPOSE 3000
CMD ["npm", "run", "dev"]
