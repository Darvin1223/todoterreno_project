FROM node:18

COPY ["package.json","package-lock.json","/usr/src/"]


RUN npm install

COPY [".", "/usr/src"]

EXPOSE 3000

CMD ["node","server.js"]

