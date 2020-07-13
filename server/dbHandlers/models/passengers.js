const mongoose = require('mongoose');

const { keywords } = require('../../constants');

const { Schema } = mongoose;

const initSchema = new Schema({
  passengerId: { type: String, required: true },
  name: { type: String, required: true },
  sex: { type: String, enum: [keywords.MALE, keywords.FEMALE] },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('passengers', initSchema);
