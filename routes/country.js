const express = require('express');
const router = express.Router();
const CountryController = require('../controllers/country');
const countryController = new CountryController();

router.get('/', (req, res)=>{
    countryController.get(req, res);
});

router.get('/:id', ((req, res) => {
    countryController.getWithId(req, res);
}));

router.get('/name/:name', (req, res) => {
    countryController.getWithName(req, res);
});

router.get('/alpha2/:alpha2', ((req, res) => {
    countryController.getWithAlpha2(req, res);
}));

module.exports = router;