const user = require('../models/index').User;
const { validationResult } = require('express-validator');
const logger = require('/config/logger');

module.exports = {
    save(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        user.create(req.body)
            .then(()=>{res.json(req.body).status(201);})
            .catch(error => {
                logger.error('Error on saving person:' + error);
                res.json({errors: error['errors']}).status(422);
            });
    }
};
