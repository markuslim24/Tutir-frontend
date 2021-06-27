FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN groupadd -g 1001 --system nodejs
RUN useradd --system -u 1001 nextjs

COPY ./next.config.js ./
COPY ./public ./public/
COPY --chown=nextjs:nodejs ./.next ./.next/

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]