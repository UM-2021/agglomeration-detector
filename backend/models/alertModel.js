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
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Alert', alertSchema);
