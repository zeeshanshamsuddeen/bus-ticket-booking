const { httpStatus } = require('../constants');

const authenticateUser = async (req, res, next) => {
  try {
    // validate token in header and extract User ID
    // validate User ID and attach User ID in request
    next();
  } catch (error) {
    console.log('error: ', error);
    res.status(httpStatus.unauthorized).send();
  }
};

module.exports = authenticateUser;
