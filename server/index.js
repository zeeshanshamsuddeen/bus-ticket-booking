require('./dbHandlers/dbConnector');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const { httpStatus } = require('./constants');

const app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// User Validation can be added using middlewares
app.use('/api/v1/seats', routes.seats);
app.use('/api/v1/tickets', routes.tickets);

// Admin Validation can be added using middlewares
app.use('/api/v1/admin', routes.admin);

// generate UUID here and log the error along with it.
app.use((error, req, res, next) => res.status(httpStatus.error).send({ message: 'Internal Server Error' }));

module.exports = app;
