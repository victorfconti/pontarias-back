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
        process.env['DB_USERNAME'] = 'pontarias';
        process.env['DB_PASSWORD'] = '123';
        process.env['DB_DIALECT'] = 'sqlite';
        try {
            model = require('../models/index').sequelize.options;
        }finally {
            chai.expect(model.username).be.equal('pontarias');
            chai.expect(model.dialect).be.equal('sqlite');
            chai.expect(model.database).be.undefined;

            delete process.env['DB_USERNAME'];
            delete process.env['DB_PASSWORD'];
            delete process.env['DB_DIALECT'] ;
            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
    it('Environment variable on database with database', ()=>{
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        process.env['DB_USERNAME'] = 'pontarias';
        process.env['DB_PASSWORD'] = '123';
        process.env['DB_DIALECT'] = 'sqlite';
        process.env['DB_DATABASE'] = 'pontarias';
        try {
            model = require('../models/index').sequelize.options;
        }finally {
            chai.expect(model.database).be.equal('pontarias');
            delete process.env['DB_USERNAME'];
            delete process.env['DB_PASSWORD'];
            delete process.env['DB_DIALECT'] ;
            delete process.env['DB_DATABASE'];
            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
    it('Environment variable on database with logging', ()=>{
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        process.env['DB_USERNAME'] = 'pontarias';
        process.env['DB_PASSWORD'] = '123';
        process.env['DB_DIALECT'] = 'sqlite';
        process.env['DB_LOGGING'] = false;
        try {
            model = require('../models/index').sequelize.options;
        }finally {
            chai.expect(model.logging).be.equal('false');
            delete process.env['DB_USERNAME'];
            delete process.env['DB_PASSWORD'];
            delete process.env['DB_DIALECT'] ;
            delete process.env['DB_LOGGING'];

            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
    it('Environment variable on database with port', ()=>{
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        process.env['DB_USERNAME'] = 'pontarias';
        process.env['DB_PASSWORD'] = '123';
        process.env['DB_DIALECT'] = 'sqlite';
        process.env['DB_PORT'] = 5432;
        try {
            model = require('../models/index').sequelize.options;
        }finally {
            chai.expect(model.port).be.equal('5432');
            delete process.env['DB_USERNAME'];
            delete process.env['DB_PASSWORD'];
            delete process.env['DB_DIALECT'] ;
            delete process.env['DB_PORT'];

            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
    it('Environment variable on database with DB_HOST', ()=>{
        cleanEnvironmentVariableAndConfCache('../models/index');
        let model;
        process.env['DB_USERNAME'] = 'pontarias';
        process.env['DB_PASSWORD'] = '123';
        process.env['DB_DIALECT'] = 'sqlite';
        process.env['DB_HOST'] = 'localhost';
        try {
            model = require('../models/index').sequelize.config;
        }finally {
            chai.expect(model.host).be.equal('localhost');
            delete process.env['DB_USERNAME'];
            delete process.env['DB_PASSWORD'];
            delete process.env['DB_DIALECT'] ;
            delete process.env['DB_HOST'];

            setEnvironmentVariableAndGeneratedTestCache('../models/index');
        }
    });
});
