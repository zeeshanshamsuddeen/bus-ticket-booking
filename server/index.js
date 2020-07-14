require('./dbHandlers/dbConnector');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const middlewares = require('./middlewares');
const { httpStatus } = require('./constants');

const app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/v1/seats', middlewares.authenticateUser, routes.seats);
app.use('/api/v1/tickets', middlewares.authenticateUser, routes.tickets);

app.use('/api/v1/admin', middlewares.authenticateAdmin, routes.admin);

app.use('*', (req, res) => res.status(httpStatus.badRequest).send());

app.use(middlewares.errorHandler);

module.exports = app;
