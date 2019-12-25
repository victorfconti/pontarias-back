const sequelize = require('../models/index').sequelize;
const user = require('../models/index').User;

module.exports = {
    save(res){
        console.log(user);
        person.create();
        res.json({'Method': 'Post'});
    }
};