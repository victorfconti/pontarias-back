const express = require('express');
const path = require('path');
const models = require('./models/index');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countryRouter = require('./routes/country');
const stateRouter = require('./routes/state');
const addressRouter = require('./routes/address');

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


