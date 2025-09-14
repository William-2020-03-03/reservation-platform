FROM node:22.19.0-bullseye as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build