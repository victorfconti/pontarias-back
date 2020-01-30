const express = require('express');
const router = express.Router();
const StateController = require('../controllers/state');
const stateController = new StateController();

router.get('/:id', stateController.getById);
router.get('/country/:country', stateController.getByCountry);
router.get('/name/:name', stateController.getByName);
router.get('/abbreviation/:abbreviation', stateController.getByAbbreviation);

module.exports = router;