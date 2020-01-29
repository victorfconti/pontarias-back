'use strict';

module.exports = (sequelize, datatype) => {
    return sequelize.define('State', {
        name: {type: datatype.STRING, allowNull: false, trim: true},
        abbreviation: {type: datatype.STRING, allowNull: false, trim: true}
    }, {indexes: [{unique: true, fields:['name']}, {unique: true, fields: ['abbreviation']}]});
};
