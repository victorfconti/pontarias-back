const express = require('express');
const path = require('path');
const models = require('./src/models/index');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const countryRouter = require('./src/routes/country');
const stateRouter = require('./src/routes/state');
const addressRouter = require('./src/routes/address');

const app = express();

app.models = models;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/countries', countryRouter);
app.use('/states', stateRouter);
app.use('/address', addressRouter);

module.exports = app;


