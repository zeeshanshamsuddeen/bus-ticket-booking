const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const getUUID = () => uuidv4();

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const checkPassword = (password, passwordDigest) => bcrypt.compareSync(password, passwordDigest);

const checkObjectHasKey = (object, key) => object.hasOwnProperty(key);

const isNumber = (value) => !isNaN(Number(value));

module.exports = {
  getUUID,
  hashPassword,
  checkPassword,
  checkObjectHasKey,
  isNumber,
};
