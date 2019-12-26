const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { check } = require('express-validator');

router.post('/', [
  check('firstName').exists().isString(),
  check('lastName').exists().isString(),
  check('username').exists().isString().isLength({min: 5, max: 15}),
  check('password').exists().matches(/^.*(?=.{8,15})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'g').
    withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'),
  check('email').exists().isEmail(),
  check('age').exists().isNumeric(),
  check('active').not().exists(),
  check('id').not().exists()
], (req, res) => {
  userController.save(req, res);
});

module.exports = router;