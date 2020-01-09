'use strict';

module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', {
        country: {type: DataTypes.STRING, allowNull: false, trim: true},
        alpha2: {type: DataTypes.STRING, allowNull: false, trim: true},
        alpha3: {type: DataTypes.STRING, allowNull: false, trim: true},
        un: {type: DataTypes.STRING, allowNull: false, trim: true}
    }, {indexes:[{unique: true, fields: ['country']}, {unique:true, fields: ['alpha2']}]});
    Country.associate = function(models) {
        // associations can be defined here
    };
    return Country;
};

