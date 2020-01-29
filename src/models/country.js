'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Country', {
        name: {type: DataTypes.STRING, allowNull: false, trim: true},
        alpha2: {type: DataTypes.STRING, allowNull: false, trim: true},
        alpha3: {type: DataTypes.STRING, allowNull: false, trim: true},
        un: {type: DataTypes.STRING, allowNull: false, trim: true}
    }, {indexes:[{unique: true, fields: ['name']}, {unique:true, fields: ['alpha2']}]});
};

