const { httpStatus, keywords } = require('../constants');
const utils = require('../shared/utils');
const db = require('../dbHandlers/dbModule');

const validStatus = {
  [keywords.BOOKED]: true,
  [keywords.CANCELLED]: true,
};

// more validation can be added here for query params
const validateParams = ({ status }) => validStatus[status];

// Get Tickets List using status
const getTickets = async (params) => {
  const validationResult = validateParams(params);
  if (!validationResult) {
    return { success: false, code: httpStatus.badRequest };
  }
  const { status } = params;
  const ticketDocs = await db.tickets.findWithLean({ status });
  return { success: true, tickets: ticketDocs };
};

// Get ticket info using Ticket ID
const getTicket = async (ticketId) => {
  const ticketDoc = await db.tickets.findOneWithLean({ ticketId });
  if (!ticketDoc) {
    return { success: false, code: httpStatus.notfound };
  }
  return { success: true, ticket: ticketDoc };
};

// Get Passenger info using Ticket ID
const getTicketPassenger = async (ticketId) => {
  const ticketDoc = await db.tickets.findOneWithLean({ ticketId });
  if (!ticketDoc) {
    return { success: false, code: httpStatus.notfound };
  }
  const passengerDoc = await db.passengers.findOneWithLean({ passengerId: ticketDoc.passengerId });
  if (!passengerDoc) {
    return { success: false, code: httpStatus.notfound };
  }
  return { success: true, passenger: passengerDoc };
};

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

const createPassenger = (ticketId, passengerId, passengerInfo) => {
  const updateObject = passengerFields.reduce((acc, field) => {
    acc[field] = passengerInfo[field];
    return acc;
  }, {});
  updateObject.ticketId = ticketId;
  updateObject.passengerId = passengerId;
  db.passengers.addOne(updateObject);
  return updateObject.passengerId;
};

const updatePassenger = (passengerId, passengerInfo) => {
  const updateObject = passengerFields.reduce((acc, field) => {
    if (passengerInfo[field]) {
      acc[field] = passengerInfo[field];
    }
    return acc;
  }, {});
  db.passengers.findOneAndUpdate({ passengerId }, updateObject);
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

const bookSeat = async (ticketId, openSeatForBus) => {
  // since we are updating the document using status OPEN, parallel bookings are handled
  await db.seats.findOneAndUpdate({ seatId: openSeatForBus.seatId, status: keywords.OPEN }, { status: keywords.BOOKED, ticketId });
};

// Book a ticket with passenger info
const bookTicket = async (passengerInfo) => {
  const validationResult = validInputData(passengerInfo);
  if (!validationResult) {
    return { success: false, code: httpStatus.badRequest };
  }
  // Bus ID can be queried here for searching open seat in a bus
  const openSeatForBus = await db.seats.findOneWithLean({ status: [keywords.OPEN] });
  if (!openSeatForBus) {
    return { success: false, code: httpStatus.conflict };
  }
  const passengerId = utils.common.getUUID();
  const ticketId = utils.common.getUUID();
  await bookSeat(ticketId, openSeatForBus);
  // Make sure that the seat was booked using ticketId. If so, continue booking process
  const seatForTicket = await db.seats.findOneWithLean({ ticketId });
  if (!seatForTicket) {
    return { success: false, code: httpStatus.conflict };
    // Can be improved: Try to book the next available ticket
  }
  createPassenger(ticketId, passengerId, passengerInfo);
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
  // Only passenger information update as of now
  updatePassenger(ticketDoc.passengerId, passengerInfo);
  return { success: true };
};

// Cancel a ticket using Ticket ID
const deleteTicket = async (ticketId) => {
  const ticketDoc = await db.tickets.findOneWithLean({ ticketId, status: keywords.BOOKED });
  if (!ticketDoc) {
    return { success: false, code: httpStatus.notfound };
  }
  db.tickets.findOneAndUpdate({ ticketId }, { status: keywords.CANCELLED });
  db.seats.findOneAndUpdate({ seatId: ticketDoc.seatId }, { status: keywords.OPEN, ticketId: '' });
  db.passengers.removeOne({ passengerId: ticketDoc.passengerId });
  // for history, passenger info can also be maintained if needed.
  return { success: true };
};

module.exports = {
  getTickets,
  getTicket,
  getTicketPassenger,
  bookTicket,
  updateTicket,
  deleteTicket,
};
