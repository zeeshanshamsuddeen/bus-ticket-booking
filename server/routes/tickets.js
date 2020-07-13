const express = require('express');

const {
  getTickets, getTicket, getTicketPassenger,
  bookTicket, updateTicket, deleteTicket,
} = require('../core/tickets');

const router = express.Router();

// Get Tickets List using status
router.get('/', async (req, res) => {
  const ticketsResult = await getTickets(req.query);
  if (!ticketsResult.success) {
    return res.status(ticketsResult.code).send();
  }
  return res.json({ success: true, tickets: ticketsResult.tickets });
});

// Get ticket info using Ticket ID
router.get('/:id', async (req, res) => {
  const { id: ticketId } = req.params;
  const ticketResult = await getTicket(ticketId);
  if (!ticketResult.success) {
    return res.status(ticketResult.code).send();
  }
  return res.json({ success: true, ticket: ticketResult.ticket });
});

// Get Passenger info using Ticket ID
router.get('/:id/passenger', async (req, res) => {
  const { id: ticketId } = req.params;
  const passengerResult = await getTicketPassenger(ticketId);
  if (!passengerResult.success) {
    return res.status(passengerResult.code).send();
  }
  return res.json({ success: true, passenger: passengerResult.passenger });
});

// Book a ticket with passenger info
router.post('/', async (req, res) => {
  // busId and seatId can be passed as query params to book a specific seat.
  const ticketBookingResult = await bookTicket(req.body);
  if (!ticketBookingResult.success) {
    return res.status(ticketBookingResult.code).send();
  }
  return res.json({ success: true, ticketId: ticketBookingResult.ticketId });
});

// Update a ticket using Ticket ID
router.put('/:id', async (req, res) => {
  const { id: ticketId } = req.params;
  const ticketBookingResult = await updateTicket(ticketId, req.body);
  if (!ticketBookingResult.success) {
    return res.status(ticketBookingResult.code).send();
  }
  return res.json({ success: true });
});

// Cancel a ticket using Ticket ID
router.delete('/:id', async (req, res) => {
  const { id: ticketId } = req.params;
  const ticketBookingResult = await deleteTicket(ticketId);
  if (!ticketBookingResult.success) {
    return res.status(ticketBookingResult.code).send();
  }
  return res.json({ success: true });
});

module.exports = router;
