const Trip = require('../../database/models/Trip');
const { trip } = require('./trips.routes');

exports.tripCreate = async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.tripDelete = async (req, res, next) => {
  const { tripId } = req.params;
  try {
    await Trip.findByIdAndDelete(tripId);
    res.status(204).end();
  } catch (error) {
    next(error);
    //res.status(500).json({ message: error.message });
  }
};

exports.tripUpdate = async (req, res) => {
  try {
    const { tripId } = req.params;
    await Trip.findByIdAndUpdate(tripId, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const foundTrip = await Trip.findById(tripId);
    res.status(201).json(foundTrip);
  } catch (error) {
    return error;
  }
};

//when fetching trips, we get the user object with each trip
exports.tripGet = async (req, res) => {
  try {
    const trips = await Trip.find();
    console.log(
      '🚀 ~ file: trips.controls.js ~ line 70 ~ exports.tripGet= ~ trips',
      trips
    );
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
