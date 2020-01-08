const chai = require('chai');
const chaiHttp = require('chai-http');
const country = require('../controllers/country');
const app = require('../app');
const Country = require('../models/index').Country;
const mockResponse = require('./utils').mockResponse;
const sinon = require('sinon');

chai.use(chaiHttp);

describe('Country', ()=>{

    before(()=>{
       if(process.env.NODE_ENV === 'test'){
            return Country.create({country: 'Afghanistan',alpha2: 'AF', alpha3: 'AFG', un: '004'});
        }
    });

    it('Get all',() =>{
        chai.request(app).get('/countries').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(200);
        });
    });

    // var Module = require('module');
    // var originalRequire = Module.prototype.require;
    // Module.prototype.require = function(){
    //     //do your thing here
    //     return originalRequire.apply(this, arguments);
    // };

    it('Get all with error',() =>{
        const mResponse = new mockResponse();
        country.setUserModel('a');
        console.log(country.userModel);
        country.get(null, mResponse);
        chai.expect(mResponse.statusCode).is.eq(500);
        // chai.expect(res.status).is.equal(200);
        country.toCrazyCrap.restore();
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
        const mockCountry = Object.assign({}, country);
        console.log(mockCountry.get); //.findAll();
        // chai.request(app).get('/countries/a').end((err, res)=>{
        //     chai.expect(err).is.null;
        //     chai.expect(res.status).is.equal(500);
        //     chai.expect(res.body).is.empty;
        // });
    });
    it('Get by country',() =>{
        chai.request(app).get('/countries').end((err, res)=>{
            chai.request(app).get('/countries/name/' + res.body[0].country).end((errInner, resInner)=>{
                chai.expect(err).is.null;
                chai.expect(errInner).is.null;
                chai.expect(resInner.status).is.equal(200);
                chai.expect(resInner.body.country).is.equal(res.body[0].country);
            });
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
    it('Get by invalid alpha2 with error',() => {
        chai.request(app).get('/countries/alpha2/999').end((err, res) => {
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(404);
            chai.expect(res.body).is.empty;
        });
    });
});
