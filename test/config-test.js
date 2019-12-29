const chai = require('chai');
const fs = require('fs');

function cleanEnvironmentVariableAndConfCache(fileCache){
    delete process.env['NODE_ENV'];
    delete require.cache[require.resolve(fileCache)];
}

function setEnvironmentVariableAndGeneratedTestCache(){
    delete require.cache[require.resolve('../config/logger')];
    process.env['NODE_ENV'] = 'test';
}

describe('Config', function () {
    it('No develop variable', function () {
        cleanEnvironmentVariableAndConfCache('../config/logger');
        const logger = require("../config/logger");
        chai.expect(logger.env === 'development').be.true;
        setEnvironmentVariableAndGeneratedTestCache();
    });
    it('Develop value production', function () {
        process.env['NODE_ENV'] = 'production';
        delete require.cache[require.resolve('../config/logger')];
        const logger = require("../config/logger");
        chai.expect(logger.level === 'info').be.true;
        setEnvironmentVariableAndGeneratedTestCache();
    });
    it('Create log variable', function () {
        if (fs.existsSync('log')) {
            fs.rmdirSync('log', { recursive: true });
        }
        chai.expect(fs.existsSync('log')).be.false;
        delete require.cache[require.resolve('../config/logger')];
        require("../config/logger");
        delete require.cache[require.resolve('../config/logger')];
        chai.expect(fs.existsSync('log')).be.true;
    });
    it('Database test default configuration', function(){
        cleanEnvironmentVariableAndConfCache('../models/index.js');
        let model;
        try {
            model = require('../models/index');
        }finally {
            setEnvironmentVariableAndGeneratedTestCache();
            chai.expect(model.env).be.equal('development');
        }
    });
});
