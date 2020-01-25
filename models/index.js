'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const logger = require('../config/logger');
const db = {};
db.env = env;
let config;

if(process.env.DB_USERNAME && process.env.DB_PASSWORD){
  config = {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  };
  config.logging = process.env.DB_DATABASE?process.env.DB_DATABASE:false;
  config.operatorsAliases = 0;
  config.dialect = process.env.DB_DIALECT;
  config.logging = process.env.DB_LOGGING?process.env.DB_LOGGING:false;
  if(process.env.DB_PORT){
    config.port = process.env.DB_PORT;
  }
  if(process.env.DB_HOST){
    config.host = process.env.DB_HOST;
  }
}else{
  config = require(__dirname + '/../config/config.json')[env];
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Country = sequelize.import(__dirname + '/country.js');
db.State = sequelize.import(__dirname + '/state.js');
db.User = sequelize.import(__dirname + '/user.js');
db.Address = sequelize.import(__dirname + '/address.js');

// Add dependencies
db.Country.hasMany(db.State);
db.State.belongsTo(db.Country);
db.Address.hasOne(db.State);
db.State.belongsTo(db.Address);
db.Address.hasOne(db.User);
db.User.belongsTo(db.Address);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync().then(()=>{logger.info('Created database tables')});

module.exports = db;