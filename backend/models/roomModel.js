const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: [true, 'Introduce a max capacity for the room'],
    default: 10,
    required: false,
  },
  // air_data: {
  //   type: Object,
  // },
  user_to_notifiy: {
    type: String,
    default: '1',
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Room', roomSchema);
