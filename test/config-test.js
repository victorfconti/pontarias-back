const chai = require('chai');
const fs = require('fs');

function cleanEnvironmentVariableAndConfCache(fileCache){
    delete process.env['NODE_ENV'];
    delete require.cache[require.resolve(fileCache)];
}

function setEnvironmentVariableAndGeneratedTestCache(fileCache){
    process.env['NODE_ENV'] = 'test';
    delete require.cache[require.resolve(fileCache)];
}

describe('Config', function () {
    it('No develop variable', function () {
        cleanEnvironmentVariableAndConfCache('../config/logger');
        const logger = require('../config/logger');
        chai.expect(logger.env === 'development').be.true;
        setEnvironmentVariableAndGeneratedTestCache('../config/logger');
    });
    it('Develop value production', function () {
        process.env['NODE_ENV'] = 'production';
        delete require.cache[require.resolve('../config/logger')];
        const logger = require("../config/logger");
        chai.expect(logger.level === 'info').be.true;
        setEnvironmentVariableAndGeneratedTestCache('../config/logger');
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
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        try {
            model = require('../models/index');
        }finally {
            chai.expect(model.env).be.equal('development');
            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
    it('Environment variable on database', ()=>{
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        process.env['USERNAME'] = 'pontarias';
        process.env['PASSWORD'] = '123';
        process.env['DIALECT'] = 'sqlite';
        try {
            model = require('../models/index').sequelize.options;
        }finally {
            chai.expect(model.username).be.equal('pontarias');
            chai.expect(model.dialect).be.equal('sqlite');
            chai.expect(model.database).be.undefined;

            delete process.env['USERNAME'];
            delete process.env['PASSWORD'];
            delete process.env['DIALECT'] ;
            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
    it('Environment variable on database with database', ()=>{
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        process.env['USERNAME'] = 'pontarias';
        process.env['PASSWORD'] = '123';
        process.env['DIALECT'] = 'sqlite';
        process.env['DATABASE'] = 'pontarias';
        try {
            model = require('../models/index').sequelize.options;
        }finally {
            chai.expect(model.database).be.equal('pontarias');
            delete process.env['USERNAME'];
            delete process.env['PASSWORD'];
            delete process.env['DIALECT'] ;
            delete process.env['DATABASE'];
            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
    it('Environment variable on database with logging', ()=>{
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        process.env['USERNAME'] = 'pontarias';
        process.env['PASSWORD'] = '123';
        process.env['DIALECT'] = 'sqlite';
        process.env['LOGGING'] = false;
        try {
            model = require('../models/index').sequelize.options;
        }finally {
            chai.expect(model.logging).be.equal('false');
            delete process.env['USERNAME'];
            delete process.env['PASSWORD'];
            delete process.env['DIALECT'] ;
            delete process.env['LOGGING'];

            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
});
