const AbstractController = require('./abstract_controller');
const sequelize = require('sequelize');
const logger = require('../config/logger');

const StateController = class extends AbstractController{

    constructor(injectedStateModel) {
        super();
        if(!injectedStateModel)
            this.stateModel = require('../models/index').State;
        else
            this.stateModel = injectedStateModel;
    }

    getById(req, res){
        return this.stateModel.findByPk(req.params.id).then(state=>{
            if(!state)
                return res.status(404).json({});
            return res.json(state);
        }).catch(error => {
            logger.error(error);
            return res.status(500).json({});
        });
    }

    getByCountry(req, res){
        return this.findOne(res, this.stateModel, {where: {CountryId: req.params.country}});
    }

    getByName(req, res){
        return this.findOne(res, this.stateModel,
            {where:{name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), req.params.name.toLowerCase())}});
    }

    getByAbbreviation(req, res){
        return this.findOne(res, this.stateModel,
            {where:{abbreviation: sequelize.where(sequelize.fn('LOWER', sequelize.col('abbreviation')), req.params.abbreviation.toLowerCase())}});
    }
};
module.exports = StateController;