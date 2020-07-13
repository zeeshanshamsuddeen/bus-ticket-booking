const express = require('express');

const { resetSeats } = require('../core/admin');

const router = express.Router();

// Reset all the seats to OPEN
router.post('/seats/reset', async (req, res, next) => {
  try {
    // busId and seatId can be passed as query params to reset specific seats in specific buses.
    const resetResult = resetSeats();
    if (!resetResult.success) {
      return res.status(resetResult.code).send();
    }
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
