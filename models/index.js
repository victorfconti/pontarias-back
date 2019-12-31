'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const logger = require('../config/logger');
const db = {};
db.env = env;
let config;

if(process.env.USERNAME && process.env.PASSWORD){
  config = {
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  };
  config.logging = process.env.DATABASE?process.env.DATABASE:false;
  config.operatorsAliases = 0;
  config.dialect = process.env.DIALECT;
  config.logging = process.env.LOGGING?process.env.LOGGING:false;
}else{
  config = require(__dirname + '/../config/config.json')[env];
}

delete config['password'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = sequelize.import(__dirname + '/user.js');

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync().then(()=>{logger.info('Created database tables')});

module.exports = db;