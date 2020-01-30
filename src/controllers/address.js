const AbstractController = require('./abstract_controller');
const logger = require('../config/logger');
const sequelize = require('sequelize');

module.exports = class extends AbstractController{

    constructor(injectAddress) {
        super();
        if(!injectAddress)
            this.address = require('../models').Address;
        else
            this.address = injectAddress;
    }

    findById = (req, res)=>{
        return address.findByPk(req.params.id).then(adr => {
            if(!adr)
                return res.status(404).json({});
            return res.json(adr);
        }).catch(error => {
            logger.error(error);
            res.status(500).json({});
        });
    };
    findByUser = (req, res)=>{
        return super.findOne(res, address,
            {where:{UserId: req.params.UserId}});
    };
    findByStreet = (req, res)=>{
        return super.findOne(res, address,
            {where:{street: { [sequelize.Op.iLike]: '%' + req.params.street.toLowerCase() + '%'}}});
    }
};
