const { httpStatus } = require('../constants');

const authenticateAdmin = async (req, res, next) => {
  try {
    // validate token in header
    next();
  } catch (error) {
    console.log('error: ', error);
    res.status(httpStatus.unauthorized).send();
  }
};

module.exports = authenticateAdmin;
