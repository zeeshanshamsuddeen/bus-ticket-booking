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


const createDbFunctions = () => {
  requiredDbFunctions.forEach((requiredFunc) => {
  });
};

createDbFunctions();

const db = {
};

module.exports = db;
