const { httpStatus, keywords } = require('../constants');
const db = require('../dbHandlers/dbModule');

const validStatus = {
  [keywords.OPEN]: true,
  [keywords.BOOKED]: true,
};

// more validation can be added here for query params
const validateParams = ({ status }) => validStatus[status];

const getSeats = async (params) => {
  const validationResult = validateParams(params);
  if (!validationResult) {
    return { success: false, code: httpStatus.badRequest };
  }
  const { status } = params;
  const seatsFromDb = await db.seats.findWithLean({ status });
  return { success: true, seats: seatsFromDb };
};

module.exports = {
  getSeats,
};
