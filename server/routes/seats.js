const express = require('express');

const { getSeats } = require('../core/seats');

const router = express.Router();

router.get('/', async (req, res) => {
  const { status } = req.query;
  const params = { status };
  const seatsResult = await getSeats(params);
  if (!seatsResult.success) {
    return res.status(seatsResult.code).send();
  }
  return res.json({ success: true, seats: seatsResult.seats });
});

module.exports = router;
