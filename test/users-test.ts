import chai from 'chai';
import app from '../app';
import chaiHttp = require('chai-http')

chai.use(chaiHttp);

function generateValidUser(){
    return {
        firstName: 'Daffy',
        lastName: 'Duck',
        username: 'TheMage',
        password: 'm4g40D4P@rr4',
        email: 'a@a.com.br',
        age: 83
    };
}

function generateValidUserWrongNoNumberNeitherSpecialChar(){
    return {
        firstName: 'Daffy',
        lastName: 'Duck',
        username: 'TheMage',
        password: 'magaoDaPorra',
        email: 'a@a.com.br',
        age: 83
    };
}

describe('User', () => {
    it('Correct User', function () {
        chai.request(app).post('/users').send(generateValidUser()).end((err, res)=>{
            chai.expect(res.status).to.be.equal(201);
            chai.expect(err).to.be.null;
        });
    });
    it('Wrong Password', function(){
        chai.request(app).post('/users').send(generateValidUserWrongNoNumberNeitherSpecialChar()).end((err, res)=>{
            chai.expect(res.status).to.be.equal(400);
            chai.expect(err).to.be.null;
        });
    });
    it('Double user error', function () {
        chai.request(app).post('/users').send(generateValidUser()).end((err, res)=>{
            chai.expect(res.status).to.be.equal(400);
            chai.expect(err).to.be.null;
        });
        chai.request(app).post('/users').send(generateValidUser()).end((err, res)=>{
            chai.expect(res.status).to.be.equal(400);
            chai.expect(err).to.be.null;
        });
    });
});
