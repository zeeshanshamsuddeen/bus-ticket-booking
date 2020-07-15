const mongoose = require('mongoose');

const { keywords } = require('../../constants');

const { Schema } = mongoose;

const initSchema = new Schema({
  seatId: { type: String, default: undefined },
  busId: { type: String, default: undefined },
  status: { type: String, required: true, enum: [keywords.OPEN, keywords.BOOKED] },
  seatDisplayId: { type: String, required: true },
  ticketId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('seats', initSchema);
