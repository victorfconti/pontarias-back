const logger = require('../config/logger');

module.exports = class AbstractController{

    findOne (res, model, customJsonQuery){
        return model.findOne(customJsonQuery).then(response => {
            if(response == null){
                return res.status(404).json({});
            }
            return res.json(response);
        }).catch(err=>{
            logger.error(err);
            return res.status(500).json({})
        });
    }

};
