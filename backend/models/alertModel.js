const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  exceded_capacity: {
    type: Number,
    required: true,
    default: 1,
  },
  // air_data: {
  //   type: Object,
  // },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Indicate the related room'],
  },
  handled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Room', alertSchema);
