import chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../app';
const CountryModel = require('../models/index').Country;
const MockResponse = require('./utils').MockResponse;
const Country = require('../controllers/country');

chai.use(chaiHttp);

describe('Country', ()=>{

    before(()=>{
       if(process.env.NODE_ENV === 'test'){
            return CountryModel.create({name: 'Afghanistan',alpha2: 'AF', alpha3: 'AFG', un: '004'});
        }
    });

    it('Get all',() =>{
        chai.request(app).get('/countries').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(200);
        });
    });

    it('Get all with error',() =>{
        const mResponse = new MockResponse();
        const country = new Country({
            findAll: ()=>{
                return new Promise(((resolve, reject) => reject()));
            }
        });
        country.get(null, mResponse).then(
            ()=>{
                chai.expect(mResponse.statusCode).is.eq(500);
                chai.expect(mResponse.jsonObject).is.empty;
            }
        ).catch(()=>{
            chai.AssertionError;
        });
    });

    it('Get by id',() =>{
        chai.request(app).get('/countries').end((err, res)=>{
            chai.request(app).get('/countries/' + res.body[0].id).end((errInner, resInner)=>{
                chai.expect(err).is.null;
                chai.expect(errInner).is.null;
                chai.expect(resInner.status).is.equal(200);
                chai.expect(resInner.body.id).is.equal(res.body[0].id);
            });
        });
    });
    it('Get by invalid id with error',() =>{
        chai.request(app).get('/countries/null').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(404);
            chai.expect(res.body).is.empty;
        });
    });
    it('Get by id constraint error',() =>{
        const mResponse = new MockResponse();
        const country = new Country({
            findByPk: ()=>{
                return new Promise(((resolve, reject) => reject()));
            }
        });
        country.getWithId({params: {id: 1}}, mResponse).then(
            ()=>{
                chai.expect(mResponse.statusCode).is.eq(500);
                chai.expect(mResponse.jsonObject).is.empty;
            }
        ).catch(()=>{
            chai.AssertionError;
        });

    });
    it('Get by country',() =>{
        chai.request(app).get('/countries').end((err, res)=>{
            chai.request(app).get('/countries/name/' + res.body[0].name).end((errInner, resInner)=>{
                chai.expect(err).is.null;
                chai.expect(errInner).is.null;
                chai.expect(resInner.status).is.equal(200);
                chai.expect(resInner.body.name).is.equal(res.body[0].name);
            });
        });
    });
    it('Get by country constraint error',() =>{
        const mResponse = new MockResponse();
        const country = new Country({
            findOne: ()=>{
                return new Promise(((resolve, reject) => reject()));
            }
        });
        country.getWithName({params: {name: 'a'}}, mResponse).then(
            ()=>{
                chai.expect(mResponse.statusCode).is.eq(500);
                chai.expect(mResponse.jsonObject).is.empty;
            }
        ).catch(()=>{
            chai.AssertionError;
        });

    });
    it('Get by invalid country with error',() =>{
        chai.request(app).get('/countries/name/9999').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(404);
            chai.expect(res.body).is.empty;
        });
    });
    it('Get by alpha2',() =>{
        chai.request(app).get('/countries').end((err, res)=>{
            chai.request(app).get('/countries/alpha2/' + res.body[0].alpha2).end((errInner, resInner)=>{
                chai.expect(err).is.null;
                chai.expect(errInner).is.null;
                chai.expect(resInner.status).is.equal(200);
                chai.expect(resInner.body.alpha2).is.equal(res.body[0].alpha2);
            });
        });
    });
    it('Get by alpha2 constraint error',() =>{
        const mResponse = new MockResponse();
        const country = new Country({
            findOne: ()=>{
                return new Promise(((resolve, reject) => reject()));
            }
        });
        country.getWithAlpha2({params: {alpha2: 'a'}}, mResponse).then(
            ()=>{
                chai.expect(mResponse.statusCode).is.eq(500);
                chai.expect(mResponse.jsonObject).is.empty;
            }
        ).catch(()=>{
            chai.AssertionError;
        });

    });
    it('Get by invalid alpha2 with error',() => {
        chai.request(app).get('/countries/alpha2/999').end((err, res) => {
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(404);
            chai.expect(res.body).is.empty;
        });
    });
});
