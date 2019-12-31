FROM node:12-alpine

COPY ./src/* /opt/pontarias/
RUN cd /opt/pontarias && npm install

CMD cd /opt/pontarias && npm start
