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
const validInputData = (passengerInfo, fields = requiredFields) => fields.every((field) => validationMapper[field] ? validationMapper[field](passengerInfo[field]) : true);

const passengerFields = ['name', 'sex', 'age', 'email', 'phone'];

const createPassenger = (passengerId, passengerInfo) => {
  const updateObject = passengerFields.reduce((acc, field) => {
    acc[field] = passengerInfo[field];
    return acc;
  }, {});
  updateObject.passengerId = passengerId;
  db.passengers.addOne(updateObject);
  return updateObject.passengerId;
};

const updatePassenger = async (passengerId, passengerInfo) => {
  const updateObject = passengerFields.reduce((acc, field) => {
    if (passengerInfo[field]) {
      acc[field] = passengerInfo[field];
    }
    return acc;
  }, {});
  await db.passengers.findOneAndUpdate({ passengerId }, updateObject);
  return updateObject.passengerId;
};

const createTicket = (passengerId, ticketId, openSeatForBus) => {
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

// Book a ticket with passenger info
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
  createPassenger(passengerId, passengerInfo);
  createTicket(passengerId, ticketId, openSeatForBus);
  return { success: true, ticketId };
};

// Update a ticket using Ticket ID
const updateTicket = async (ticketId, passengerInfo) => {
  const fields = Object.keys(passengerInfo);
  const validationResult = validInputData(passengerInfo, fields);
  if (!validationResult) {
    return { success: false, code: httpStatus.badRequest };
  }
  const ticketDoc = await db.tickets.findOneWithLean({ ticketId, status: keywords.BOOKED });
  if (!ticketDoc) {
    return { success: false, code: httpStatus.notfound };
  }
  updatePassenger(ticketDoc.passengerId, passengerInfo);
  return { success: true };
};

module.exports = {
  bookTicket,
  updateTicket,
};
