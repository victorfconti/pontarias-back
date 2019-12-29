const chai = require('chai');
const fs = require('fs');

describe('Config', function () {
    it('No develop variable', function () {
        require("../config/logger");
    });
    it('Create log variable', function () {
        if (fs.existsSync('log')) {
            fs.rmdirSync('log', { recursive: true });
        }
        chai.expect(fs.existsSync('log')).be.false;
        delete require.cache[require.resolve('../config/logger')];
        require("../config/logger");
        chai.expect(fs.existsSync('log')).be.true;
    });
});
