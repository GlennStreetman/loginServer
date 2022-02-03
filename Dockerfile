FROM node:14-alpine AS dev
RUN apk add --no-cache bash
WORKDIR /loginServer
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/
RUN npm ci
EXPOSE 3000