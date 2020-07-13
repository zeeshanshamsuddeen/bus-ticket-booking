require('../initiateEnv');
require('../dbHandlers/dbConnector');

const db = require('../dbHandlers/dbModule');
const utils = require('../shared/utils');
const { keywords } = require('../constants');

(() => {
  try {
    // buses should be created first and accordingly seats should be created.
    const maxSeatsForBus = 40;
    const seatObject = { busId: utils.common.getUUID(), status: keywords.OPEN };
    for (let i = 0; i < maxSeatsForBus; i += 1) {
      seatObject.seatId = utils.common.getUUID();
      seatObject.seatDisplayId = i + 1;
      db.seats.addOne(seatObject);
    }
  } catch (error) {
    console.log('error: ', error);
  }
  console.log('DONE');
})();
