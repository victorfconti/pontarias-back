const userModel = require('../models/index').Country;
const logger = require('../config/logger');
const sequelize = require('sequelize');

module.exports = {

    get(req, res){
        userModel.findAll().then(countries =>{
            return res.json(countries)
        }).catch(err=>{
            logger.error(err);
            res.status(500).json({})
        });
    },

    getWithId(req, res){
        userModel.findByPk(req.params.id).then(country =>{
            if(country == null) {
                return res.status(404).json({});
            }
            return res.json(country);
        }).catch(err=>{
            logger.error(err);
            res.status(500).json({})
        });
    },

    getWithName(req, res){
        return this.findOneUser(res,
            {where:{country: sequelize.where(sequelize.fn('LOWER', sequelize.col('country')), req.params.name.toLowerCase())}});
    },

    getWithAlpha2(req, res){
        return this.findOneUser(res,
            {where: { alpha2: sequelize.where(sequelize.fn('LOWER', sequelize.col('alpha2')), req.params.alpha2.toLowerCase())}});
    },

    findOneUser(res, customJsonQuery){
        userModel.findOne(customJsonQuery).then(country => {
            if(country == null){
                return res.status(404).json({});
            }
            return res.json(country);
        }).catch(err=>{
            logger.error(err);
            res.status(500).json({})
        });
    }
};