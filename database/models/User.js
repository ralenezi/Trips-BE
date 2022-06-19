const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip'
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
