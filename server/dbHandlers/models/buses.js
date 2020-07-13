const mongoose = require('mongoose');

const { Schema } = mongoose;

const initSchema = new Schema({
  busId: { type: String, default: undefined },
  busDisplayId: { type: String, required: true },
  seats: { type: Number, default: undefined },
}, { timestamps: true });

module.exports = mongoose.model('buses', initSchema);
