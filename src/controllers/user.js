const user = require('../models').User;
const { validationResult } = require('express-validator');
const logger = require('../config/logger');

module.exports = {
    save(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        user.create(req.body)
            .then(()=>{res.status(201).json(req.body);})
            .catch(error => {
                logger.error('Error on saving person: ' + error);
                res.status(400).json({errors: error['errors']});
            });
    }
};
