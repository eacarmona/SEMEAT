FROM node:latest

RUN mkdir -p /opt/app/server
WORKDIR /opt/app/server
COPY ./ ./
RUN npm install && npm build

EXPOSE 5000
CMD ["dotenv -- node", "dist/main.js"]