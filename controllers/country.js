const logger = require('../config/logger');
const sequelize = require('sequelize');

module.exports = function(injectedUserModel){

    if(injectedUserModel == null)
        this.userModel = require('../models/index').Country;
    else
        this.userModel = injectedUserModel;

    this.get = (req, res)=>{
        this.userModel.findAll().then(countries =>{
            return res.json(countries)
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    };

    this.getWithId = (req, res)=>{
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

    this.getWithName = (req, res)=>{
        return findOneUser(res,
            {where:{country: sequelize.where(sequelize.fn('LOWER', sequelize.col('country')), req.params.name.toLowerCase())}});
    };

    this.getWithAlpha2 = (req, res)=>{
        return findOneUser(res,
            {where: { alpha2: sequelize.where(sequelize.fn('LOWER', sequelize.col('alpha2')), req.params.alpha2.toLowerCase())}});
    };

    let findOneUser = (res, customJsonQuery)=>{
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