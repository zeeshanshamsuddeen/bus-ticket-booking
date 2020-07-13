const mongoose = require('mongoose');

const { keywords } = require('../../constants');

const { Schema } = mongoose;

const initSchema = new Schema({
  ticketId: { type: String, required: true },
  status: { type: String, required: true, enum: [keywords.OPEN, keywords.CLOSE] },
  dateOfTravel: { type: Date, required: true },
  seatId: { type: Number, required: true },
  seatDisplayId: { type: String, required: true },
  passengerId: { type: String, required: true },
  bookedBy: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('tickets', initSchema);
