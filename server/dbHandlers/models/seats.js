const mongoose = require('mongoose');

const { keywords } = require('../../constants');

const { Schema } = mongoose;

const initSchema = new Schema({
  seatId: { type: Number, default: undefined },
  busId: { type: Number, default: undefined },
  status: { type: String, required: true, enum: [keywords.OPEN, keywords.BOOKED] },
  seatDisplayId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('seats', initSchema);
