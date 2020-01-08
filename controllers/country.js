const logger = require('../config/logger');
const sequelize = require('sequelize');

module.exports = function(userModel){

    if(userModel == null)
        this.userModel = require('../models/index').Country;
    else
        this.userModel = userModel;

    this.get = function(req, res){
        console.log((userModel));
        this.userModel.findAll().then(countries =>{
            return res.json(countries)
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    };

    this.getWithId = function(req, res){
        this.userModel.findByPk(req.params.id).then(country =>{
            if(country == null) {
                return res.status(404).json({});
            }
            return res.json(country);
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    };

    this.getWithName = function(req, res){
        return this.findOneUser(res,
            {where:{country: sequelize.where(sequelize.fn('LOWER', sequelize.col('country')), req.params.name.toLowerCase())}});
    };

    this.getWithAlpha2 = function(req, res){
        return this.findOneUser(res,
            {where: { alpha2: sequelize.where(sequelize.fn('LOWER', sequelize.col('alpha2')), req.params.alpha2.toLowerCase())}});
    };

    this.findOneUser = function(res, customJsonQuery){
        this.userModel.findOne(customJsonQuery).then(country => {
            if(country == null){
                return res.status(404).json({});
            }
            return res.json(country);
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    }
};