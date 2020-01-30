const express = require('express');
const router = express.Router();
const CountryController = require('../controllers/country');
const countryController = new CountryController();

router.get('/', countryController.get);
router.get('/:id', countryController.getWithId);
router.get('/name/:name', countryController.getWithName);
router.get('/alpha2/:alpha2', countryController.getWithAlpha2);

module.exports = router;