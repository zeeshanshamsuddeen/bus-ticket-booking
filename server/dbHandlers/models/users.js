const mongoose = require('mongoose');

const { keywords } = require('../../constants');

const { Schema } = mongoose;

const initSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  userRole: { type: String, required: true, enum: [keywords.ADMIN, keywords.USER] },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  passwordDigest: { type: String, default: undefined },
}, { timestamps: true });

module.exports = mongoose.model('users', initSchema);
