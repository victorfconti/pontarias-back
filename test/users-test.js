const assert = require('assert');
const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

function generateValidUser(){
    return {
        firstName: 'Daffy',
        lastName: 'Duff',
        username: 'TheMage',
        password: 'm4g40D4P@rr4',
        email: 'a@a.com.br',
        age: 83
    };
}

function generateValidUserWrongNoNumberNeitherSpecialChar(){
    return {
        firstName: 'Daffy',
        lastName: 'Duff',
        username: 'TheMage',
        password: 'magaoDaPorra',
        email: 'a@a.com.br',
        age: 83
    };
}

describe('User', () => {
    it('Correct User', function () {
        chai.request(app).post('/users').send(generateValidUser()).end((err, res)=>{
            console.log(res);
            chai.expect(res.status).to.be.equal(201);
            chai.expect(err).to.be.equal(null);
        });
    });
    it('Wrong Password', function(){
        chai.request(app).post('/users').send(generateValidUserWrongNoNumberNeitherSpecialChar()).end((err, res)=>{
            console.log(res.status);
            chai.expect(res.status).to.be.equal(400);
            chai.expect(err).to.be.equal(null);
        });
    });
});
