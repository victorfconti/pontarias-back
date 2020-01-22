const AbstractController = require('./abstract_controller');
const sequelize = require('sequelize');

const StateController = class extends AbstractController{

    constructor(injectedStateModel) {
        super();
        if(injectedStateModel == null)
            this.stateModel = require('../models/index').State;
        else
            this.stateModel = injectedStateModel;
    }

    getByCountry = (req, res)=>{
        return this.findOne(res, this.stateModel, {where: {CountryId: req.params.country}});
    };

    getByName = (req, res)=>{
        return this.findOne(res, this.stateModel,
            {where:{name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), req.params.name.toLowerCase())}});
    };

    getByAbbreviation = (req, res)=>{
        return this.findOne(res, this.stateModel,
            {where:{abbreviation: sequelize.where(sequelize.fn('LOWER', sequelize.col('abbreviation')), req.params.abbreviation.toLowerCase())}});
    };
};
module.exports = StateController;