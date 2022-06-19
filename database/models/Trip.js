const { model, Schema } = require('mongoose');

const TripSchema = new Schema({
  title: String,
  description: String,
  image: String,
  UserId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Trip', TripSchema);
