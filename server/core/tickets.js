const { httpStatus, keywords } = require('../constants');
const utils = require('../shared/utils');
const db = require('../dbHandlers/dbModule');

const validationMapper = {
  name: (data) => data,
  sex: (data) => data === keywords.MALE || data === keywords.FEMALE,
  age: (data) => utils.common.isNumber(data),
  email: (data) => utils.validation.validateEmail(data),
  phone: (data) => utils.validation.validatePhoneNumber(data),
};
const requiredFields = ['name', 'sex', 'age', 'email', 'phone'];
const validInputData = (passengerInfo) => requiredFields.every((field) => validationMapper[field](passengerInfo[field]));

const passengerFields = ['name', 'sex', 'age', 'email', 'phone'];
const createPassenger = (passengerInfo, passengerId) => {
  const updateObject = passengerFields.reduce((acc, field) => {
    acc[field] = passengerInfo[field];
    return acc;
  }, {});
  updateObject.passengerId = passengerId;
  db.passengers.addOne(updateObject);
  return updateObject.passengerId;
};

const createTicket = (openSeatForBus, passengerId, ticketId) => {
  const initObject = {
    ticketId,
    busId: '123XYZ', // Can be taken from Input
    seatId: openSeatForBus.seatId,
    passengerId,
    status: keywords.BOOKED,
    dateOfTravel: new Date(),
  };
  db.tickets.addOne(initObject);
};

const bookSeat = (openSeatForBus) => {
  db.seats.findOneAndUpdate({ seatId: openSeatForBus.seatId }, { status: keywords.BOOKED });
};

const bookTicket = async (passengerInfo) => {
  const validationResult = validInputData(passengerInfo);
  if (!validationResult) {
    return { success: false, code: httpStatus.badRequest };
  }
  // busId can be queried here for searching open seat in a bus
  const openSeatForBus = await db.seats.findOneWithLean({ status: [keywords.OPEN] });
  if (!openSeatForBus) {
    return { success: false, code: httpStatus.conflict };
  }
  const passengerId = utils.common.getUUID();
  const ticketId = utils.common.getUUID();
  bookSeat(openSeatForBus);
  createPassenger(passengerInfo, passengerId);
  createTicket(openSeatForBus, passengerId, ticketId);
  return { success: true, ticketId };
};

module.exports = {
  bookTicket,
};
