const assert = require('assert');
const chai = require('chai');
const app = require('../app');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('User', () => {
    it('true', function () {
        chai.request(app);
        assert.equal(3, 3);
    });
});

