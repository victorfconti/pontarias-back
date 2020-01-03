const userModel = require('../models/index').Country;
const logger = require('../config/logger');
const { validationResult } = require('express-validator');

module.exports = {

    get(req, res){
        userModel.findAll().then((countries)=>{
            return res.json(countries)
        }).catch((error)=>{
            logger.error(error);
            return res.json(error).status(500);
        });
    },

    getWithId(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        userModel.findByPk(req.params.id).then((country)=>{
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
        res.json({hello: 'world'});
    },

    getWithAlpha2(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.json({hello: 'world'});
    }

};