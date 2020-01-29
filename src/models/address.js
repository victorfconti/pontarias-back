'use strict';

module.exports = (sequelize, datatype)=>{
    return sequelize.define('Address', {
        street: {type: datatype.STRING, allowNull: false, trim: true},
        number: {type: datatype.STRING, allowNull: false, trim: true},
        complement: {type: datatype.STRING, allowNull: true, trim: true},
        zip_code: {type: datatype.STRING, allowNull: false, trim: true},
        observation: {type: datatype.STRING, allowNull: false, trim: true},
        coordinates: {type: datatype.STRING, allowNull: true, trim: true}
    }, {indexes: [{unique: false, fields: ['street']}]});
};
