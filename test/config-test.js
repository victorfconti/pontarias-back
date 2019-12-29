const chai = require('chai');
const fs = require('fs');

describe('Config', function () {
    it('No develop variable', function () {
        delete process.env['NODE_ENV'];
        delete require.cache[require.resolve('../config/logger')];
        const logger = require("../config/logger");
        console.log('Heyyyy macarena: ' + logger.environment);
        chai.expect(logger.env === 'development').be.true;
    });
    it('Develop value production', function () {
        process.env['NODE_ENV'] = 'production';
        delete require.cache[require.resolve('../config/logger')];
        const logger = require("../config/logger");
        chai.expect(logger.level === 'info').be.true;
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
