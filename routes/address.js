const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address');
const addressController = new AddressController();

router.get('/user/:id', addressController.findByName);
router.get('/street/:id', addressController.findByStreet);

module.exports = router;
