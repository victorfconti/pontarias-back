const userModel = require('../models/index').Country;
const logger = require('../config/logger');
const { validationResult } = require('express-validator');
const sequelize = require('sequelize');

module.exports = {

    get(req, res){
        userModel.findAll().then(countries =>{
            return res.json(countries)
        }).catch(error =>{
            logger.error(error);
            return res.json(error).status(500);
        });
    },

    getWithId(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        userModel.findByPk(req.params.id).then(country =>{
            return res.json(country);
        }).catch(error=>{
            logger.error(error);
            return res.status(500).json({errors: error['errors']});
        });
    },

    getWithName(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return this.findOneUser(res,
            {where:{country: sequelize.where(sequelize.fn('LOWER', sequelize.col('country')), req.params.name.toLowerCase())}});
    },

    getWithAlpha2(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return this.findOneUser(res,
            {where: { alpha2: sequelize.where(sequelize.fn('LOWER', sequelize.col('alpha2')), req.params.alpha2.toLowerCase())}});
    },

    findOneUser(res, customJsonQuery){
        userModel.findOne(customJsonQuery).then(country => {
            return res.json(country == null?{}:country);
        }).catch(error => {
            logger.error(error);
            return res.status(500).json({errors: error['errors']});
        });
    }
};