const express = require('express');
const router = express.Router();
const {
  tripGet,
  tripUpdate,
  tripDelete,
  tripCreate,
  fetchTrip
} = require('./trips.controls');

router.get('/', tripGet);
router.get('/:tripId', fetchTrip);
router.post('/', tripCreate);
router.delete('/:tripId', tripDelete);
router.put('/:tripId', tripUpdate);

module.exports = router;
