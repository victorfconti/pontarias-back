import chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../app';

chai.use(chaiHttp);

describe('Index', ()=>{
    it('Get Index', ()=>{
        chai.request(app).get('/').end((err, res)=>{
            chai.expect(err).is.null;
            chai.expect(res.status).is.ok;
        });
    });
});