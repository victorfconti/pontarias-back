const AbstractController = require('./abstract_controller');
const sequelize = require('sequelize');

StateController = class extends AbstractController{

    constructor(injectedStateModel) {
        super();
        if(injectedStateModel == null)
            this.stateModel = require('../models/index').State;
        else
            this.stateModel = injectedStateModel;
    }

    getByCountry = (req, res)=>{
        return findOneUser(res, {})
    };

    getByName = (req, res)=>{
        return res.json('Hey macarena');
    };

    getByAbbreviation = (req, res)=>{
        return res.json(res.json('Hey Macarena'));
    };
};
module.exports = StateController;