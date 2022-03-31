const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: [true, 'Introduce a max capacity for the room'],
    default: 10,
  },
  air_data: {
    type: Object,
    required: false,
  },
  user_to_notifiy: {
    type: Number,
    ref: 'User',
    required: false,
  },
});

module.exports = mongoose.model('Room', roomSchema);
