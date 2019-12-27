const assert = require('assert');
const chai = require('chai');
const app = require('../app');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('User', () => {
    it('true', function () {
        chai.request(app).get('/').end((err, res)=>{
            console.log("Res:" + res);
            chai.expect(res).not.to.be.equal(null);
        });
        assert.equal(3, 3);
    });
});

