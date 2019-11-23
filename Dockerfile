FROM node:10-alpine
WORKDIR /src
ARG SERVICE
ENV NODE_ENV=development
COPY $SERVICE/package.json ./$SERVICE/package.json
COPY $SERVICE/package-lock.json ./$SERVICE/package-lock.json
RUN npm install --prefix $SERVICE
COPY common ./$SERVICE/common
COPY $SERVICE/ ./$SERVICE/
WORKDIR /src/$SERVICE
CMD [ "npm", "run" ,"start:dev" ]
EXPOSE 3000
EXPOSE 50050
