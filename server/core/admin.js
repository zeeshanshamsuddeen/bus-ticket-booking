const { keywords } = require('../constants');
const db = require('../dbHandlers/dbModule');

const resetSeats = () => {
  // queries can be updated to target specific bus or seats
  db.seats.findAndUpdate({}, { status: keywords.OPEN });
  db.tickets.remove({});
  db.passengers.remove({});
  return { success: true };
};

module.exports = {
  resetSeats,
};
