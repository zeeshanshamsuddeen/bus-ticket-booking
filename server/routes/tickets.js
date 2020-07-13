const express = require('express');

const {
  getTicket, bookTicket, updateTicket, deleteTicket,
} = require('../core/tickets');

const router = express.Router();

// Get ticket info using Ticket ID
router.get('/:id', async (req, res) => {
  const { id: ticketId } = req.params;
  const ticketBookingResult = await getTicket(ticketId);
  if (!ticketBookingResult.success) {
    return res.status(ticketBookingResult.code).send();
  }
  return res.json({ success: true, ticket: ticketBookingResult.ticket });
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
