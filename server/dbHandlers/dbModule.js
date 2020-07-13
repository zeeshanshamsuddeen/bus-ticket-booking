const busesModel = require('./models/buses');
const seatsModel = require('./models/seats');
const ticketsModel = require('./models/tickets');
const passengersModel = require('./models/passengers');
const dbFunctions = require('./dbFunctions');

const requiredDbFunctions = [
  'findOneAndUpdate',
  'addOne',
  'add',
  'findOne',
  'findOneWithLean',
  'find',
  'findWithSkipLimitLean',
  'count',
  'findWithLean',
  'remove',
  'findAndUpdate',
  'aggregate',
];

const busesDbFunctions = {};
const seatsDbFunctions = {};
const ticketsDbFunctions = {};
const passengersDbFunctions = {};

const createDbFunctions = () => {
  requiredDbFunctions.forEach((requiredFunc) => {
    busesDbFunctions[requiredFunc] = (...args) => dbFunctions[requiredFunc](busesModel, ...args);
    seatsDbFunctions[requiredFunc] = (...args) => dbFunctions[requiredFunc](seatsModel, ...args);
    ticketsDbFunctions[requiredFunc] = (...args) => dbFunctions[requiredFunc](ticketsModel, ...args);
    passengersDbFunctions[requiredFunc] = (...args) => dbFunctions[requiredFunc](passengersModel, ...args);
  });
};

createDbFunctions();

const db = {
  buses: busesDbFunctions,
  seats: seatsDbFunctions,
  tickets: ticketsDbFunctions,
  passengers: passengersDbFunctions,
};

module.exports = db;
