const express = require('express');

const { bookTicket } = require('../core/tickets');

const router = express.Router();

router.post('/', async (req, res) => {
  // busId and seatId can be passed as query params to book a specific seat.
  const ticketBookingResult = await bookTicket(req.body);
  if (!ticketBookingResult.success) {
    return res.status(ticketBookingResult.code).send();
  }
  return res.json({ success: true, ticketId: ticketBookingResult.ticketId });
});

module.exports = router;
