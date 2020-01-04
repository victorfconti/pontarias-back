const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Country', ()=>{
    it('Get all',() =>{
        chai.request(app).get('/countries').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.equal(200);
            chai.expect(res.body.length).is.equal(247);
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
});
