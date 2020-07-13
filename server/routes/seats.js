const express = require('express');

const { getSeats } = require('../core/seats');

const router = express.Router();

// Get Seats List using status
router.get('/', async (req, res, next) => {
  try {
    const seatsResult = await getSeats(req.query);
    if (!seatsResult.success) {
      return res.status(seatsResult.code).send();
    }
    return res.json({ success: true, seats: seatsResult.seats });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
