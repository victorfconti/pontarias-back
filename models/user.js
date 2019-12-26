'use strict';
const { check } = require('express-validator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {type: DataTypes.STRING, allowNull: false, trim: true},
    lastName: {type: DataTypes.STRING, allowNull: false, trim: true},
    username: {type: DataTypes.STRING(15), allowNull: false, trim: true},
    password: {type: DataTypes.STRING, allowNull: false, trim: true},
    email: {type: DataTypes.STRING(50), allowNull: false, trim: true},
    age: {type: DataTypes.INTEGER, allowNull: false, trim: true},
    active: {type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: true}
  }, {indexes: [{unique: true, fields: ['username']}, {unique: true, fields:['email']}]});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
