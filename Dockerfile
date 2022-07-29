FROM node:16-alpine AS dev
RUN apk add --no-cache bash
RUN apk add --no-cache libc6-compat
WORKDIR /loginServer
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/
# RUN npm install
# COPY . ./
# RUN npm run build
# RUN npx prisma generate
EXPOSE 3001
CMD ['npm', 'run', 'dev']