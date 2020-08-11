import chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../app';
const StateModel = require('../models/index').State;
const CountryModel = require('../models/index').Country;
const MockResponse = require('./utils').MockResponse;
const State = require('../controllers/state');

chai.use(chaiHttp);

describe('State', ()=>{
    before(()=>{
       if(process.env.NODE_ENV === 'test'){
           return CountryModel.create({name: 'Brazil',alpha2: 'BR', alpha3: 'BRZ', un: '004'}).
           then((c: { [x: string]: any; }) => {
               const id = c['id'];
               return StateModel.create({name: 'Pernambuco', abbreviation: 'PE', CountryId: id});
           });
        }
    });

    it ('Get by country',() =>{
        CountryModel.findOne({where: {name: 'Brazil'}}).then((c: { [x: string]: any; })=>{
            const countryId = c['id'];
            chai.request(app).get('/states/country/'+countryId).end((err, res)=>{
                chai.expect(err).is.null;
                chai.expect(res.status).is.equal(200);
            });
        });
    });

    it('Get all with error',() =>{
        const mResponse = new MockResponse();
        const country = new State({
            findOne: ()=>{
                return new Promise(((resolve, reject) => reject()));
            }
        });
        country.getByName({params: {name: 'a'}}, mResponse).then(
            ()=>{
                chai.expect(mResponse.statusCode).is.eq(500);
                chai.expect(mResponse.jsonObject).is.empty;
            }
        ).catch(()=>{
            chai.AssertionError;
        });
    });
    it('Get by name',() =>{
        chai.request(app).get('/states/name/Pernambuco').end((err, res)=>{
            console.log(res);
            chai.expect(res.status).is.equal(200);
            chai.expect(res.body.name).is.equal('Pernambuco');
        });
    });
    function getState(){
        return new State({
            findOne: ()=>{
                return new Promise(((resolve, reject) => reject()));
            }
        });
    }
    it('Get by country constraint error',() =>{
        const mResponse = new MockResponse();
        const state = getState();
        state.getByName({params: {name: 'a'}}, mResponse).then(
            ()=>{
                chai.expect(mResponse.statusCode).is.eq(500);
                chai.expect(mResponse.jsonObject).is.empty;
            }
        ).catch(()=>{
            chai.AssertionError;
        });

    });
    it('Get by invalid country with error',() =>{
        chai.request(app).get('/states/name/9999').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(404);
            chai.expect(res.body).is.empty;
        });
    });
    it('Get by ',() =>{
        chai.request(app).get('/states/abbreviation/PE').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(200);
            chai.expect(res.body.abbreviation).is.equal('PE');
        });
    });
    it('Get by alpha2 abbreviation error',() =>{
        const mResponse = new MockResponse();
        const state = getState();
        state.getByAbbreviation({params: {abbreviation: 'a'}}, mResponse).then(
            ()=>{
                chai.expect(mResponse.statusCode).is.eq(500);
                chai.expect(mResponse.jsonObject).is.empty;
            }
        ).catch(()=>{
            chai.AssertionError;
        });

    });
    it('Get by invalid abbreviation with error',() => {
        chai.request(app).get('/states/abbreviation/999').end((err, res) => {
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(404);
            chai.expect(res.body).is.empty;
        });
    });
});
