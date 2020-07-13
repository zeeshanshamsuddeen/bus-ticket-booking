const validator = require('validator');

const validateEmail = (email = '') => validator.isEmail(email);

const validatePhoneNumber = (phone = '') => validator.isMobilePhone(phone);

module.exports = {
  validateEmail,
  validatePhoneNumber,
};
