const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address');
const addressController = new AddressController();

router.get('/:id', addressController.findById);
router.get('/user/:userId', addressController.findByUser);
router.get('/street/:street', addressController.findByStreet);

module.exports = router;
