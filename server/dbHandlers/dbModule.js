const usersModel = require('./models/users');
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

const usersDbFunctions = {};
const ticketsDbFunctions = {};
const passengersDbFunctions = {};

const createDbFunctions = () => {
  requiredDbFunctions.forEach((requiredFunc) => {
    usersDbFunctions[requiredFunc] = (...args) => dbFunctions[requiredFunc](usersModel, ...args);
    ticketsDbFunctions[requiredFunc] = (...args) => dbFunctions[requiredFunc](ticketsModel, ...args);
    passengersDbFunctions[requiredFunc] = (...args) => dbFunctions[requiredFunc](passengersModel, ...args);
  });
};

createDbFunctions();

const db = {
  users: usersDbFunctions,
  tickets: ticketsDbFunctions,
  passengers: passengersDbFunctions,
};

module.exports = db;
