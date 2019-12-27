'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const logger = require('../config/logger');
const db = {};


let sequelize = new Sequelize(config.database, config.username, config.password, config);

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
