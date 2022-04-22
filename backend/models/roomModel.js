const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Introduce the name of the room']
  },
  capacity: {
    type: Number,
    required: [true, 'Introduce a max capacity for the room'],
    default: 10,
  },
  user_to_notify: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: '624d899fc8a03325e89cf851',
    required: [true, 'Indicate the owner of the room'],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Room', roomSchema);
