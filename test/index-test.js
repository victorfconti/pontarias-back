const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);

describe('Index', ()=>{
    it('Get Index', ()=>{
        chai.request(app).get('/').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.ok;
        });
    });
});