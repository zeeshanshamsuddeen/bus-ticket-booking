const seats = require('./seats');
const tickets = require('./tickets');
const admin = require('./admin');

const routes = {
  seats,
  tickets,
  admin,
};

module.exports = routes;
