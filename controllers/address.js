const AbstractController = require('./abstract_controller');

module.exports = class extends AbstractController{
    findByName(req, res){
        return res.json('Hey Macarena');
    }
    findByStreet(req, res){
        return res.json('Baila tu corpo');
    }
};
