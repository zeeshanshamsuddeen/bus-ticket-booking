const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

const { database } = config.appDefaults;
const { url, name } = database;

const mongoOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
};
mongoose.connect(`mongodb://${url}/${name}`, mongoOptions);

module.exports = mongoose;
