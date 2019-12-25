const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userController.save(res);
});

module.exports = router;
