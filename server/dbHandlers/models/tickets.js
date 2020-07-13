const mongoose = require('mongoose');

const { keywords } = require('../../constants');

const { Schema } = mongoose;

const initSchema = new Schema({
  ticketId: { type: String, required: true },
  busId: { type: String, required: true },
  seatId: { type: String, required: true },
  passengerId: { type: String, required: true },
  status: { type: String, required: true, enum: [keywords.BOOKED, keywords.CANCELLED] },
  dateOfTravel: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('tickets', initSchema);
