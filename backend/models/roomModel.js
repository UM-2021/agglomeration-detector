const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    // required: [true, 'Introduce a max capacity for the room'],
    default: 10,
    required: false,
  },
  // air_data: {
  //   type: Object,
  // },
  user_to_notifiy: {
    type: Number,
    default: 1,
    required: false,
  },
});

module.exports = mongoose.model('Room', roomSchema);
