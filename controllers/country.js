const logger = require('../config/logger');
const sequelize = require('sequelize');

module.exports = function(injectedUserModel){

    if(injectedUserModel == null)
        this.userModel = require('../models/index').Country;
    else
        this.userModel = injectedUserModel;

    this.get = (req, res)=>{
        return this.userModel.findAll().then(countries =>{
            return res.json(countries)
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    };

    this.getWithId = (req, res)=>{
        return this.userModel.findByPk(req.params.id).then(country =>{
            if(country == null) {
                return res.status(404).json({});
            }
            return res.json(country);
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    };

    this.getWithName = (req, res)=>{
        return findOneUser(res,
            {where:{name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), req.params.name.toLowerCase())}});
    };

    this.getWithAlpha2 = (req, res)=>{
        return findOneUser(res,
            {where: { alpha2: sequelize.where(sequelize.fn('LOWER', sequelize.col('alpha2')), req.params.alpha2.toLowerCase())}});
    };

    let findOneUser = (res, customJsonQuery)=>{
        return this.userModel.findOne(customJsonQuery).then(country => {
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