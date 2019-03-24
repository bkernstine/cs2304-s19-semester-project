FROM node
WORKDIR /app
COPY package* ./
RUN npm install
RUN npm install express
RUN npm install body-parser cors
COPY index.js .
EXPOSE 3000
CMD ["node", "index.js"]
