const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const getUUID = () => uuidv4();

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const checkPassword = (password, passwordDigest) => bcrypt.compareSync(password, passwordDigest);

const checkObjectHasKey = (object, key) => object.hasOwnProperty(key);

module.exports = {
  getUUID,
  hashPassword,
  checkPassword,
  checkObjectHasKey,
};
