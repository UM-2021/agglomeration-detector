const mongoose = require('mongoose');

const liveReportsSchema = new mongoose.Schema({
  average_occupancy: {
    type: Number,
    default: 0,
  },
  max_occupancy: {
    type: Number,
    default: 0,
  },
  occupancy_threshold: {
    type: Number,
    default: 1,
    required: true,
  },
  time: {
    type: String,
    default: Date.now().toString(),
  },
  airData: {
    type: Object,
    required: false,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Indicate the related room'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('LiveReports', liveReportsSchema);
