FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Nhận URL Backend tại thời điểm build
ARG VITE_API_URL

# Truyền biến cho Vite
ENV VITE_API_URL=${VITE_API_URL}

# Build React với URL Backend Cloud

EXPOSE 5173

CMD ["npm", "start"]