const logger = require('../config/logger');
const sequelize = require('sequelize');
const AbstractController = require('./abstract_controller');


module.exports = class extends AbstractController{

    constructor(injectedCountryModel) {
        super();
        if(!injectedCountryModel)
            this.userModel = require('../models').Country;
        else
            this.userModel = injectedCountryModel;
    }

    get(req, res){
        return this.userModel.findAll().then(countries =>{
            return res.json(countries)
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    }

    getWithId(req, res){
        return this.userModel.findByPk(req.params.id).then(country =>{
            if(country == null) {
                return res.status(404).json({});
            }
            return res.json(country);
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    }

    getWithName(req, res){
        return this.findOne(res, this.userModel,
            {where:{name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), req.params.name.toLowerCase())}});
    }

    getWithAlpha2(req, res){
        return this.findOne(res, this.userModel,
            {where: { alpha2: sequelize.where(sequelize.fn('LOWER', sequelize.col('alpha2')), req.params.alpha2.toLowerCase())}});
    }
};