const express = require('express');
const router = express.Router();
const StateController = require('../controllers/state');
const stateController = new StateController();

router.get('/:id', (req, res)=>{
    stateController.getById(req, res);
});

router.get('/country/:country', (req, res)=>{
    stateController.getByCountry(req, res);
});

router.get('/name/:name', (req, res)=>{
    stateController.getByName(req, res);
});

router.get('/abbreviation/:abbreviation', (req, res)=>{
    stateController.getByAbbreviation(req, res);
});

module.exports = router;