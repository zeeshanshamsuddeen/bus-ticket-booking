const { httpStatus } = require('../constants');

// generate UUID here and log the error along with it.
const errorHandler = (err, req, res, next) => res.status(httpStatus.error).send({ message: 'Internal Server Error' });

module.exports = errorHandler;
