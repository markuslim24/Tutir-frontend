FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY ./public ./public/
COPY --chown=nextjs:nodejs ./.next ./.next/

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]