const mongoose = require('mongoose');

const weeklyReportsSchema = new mongoose.Schema({
  average_occupancy: {
    type: [Number],
    default: [],
  },
  max_occupancy: {
    type: [Number],
    default: [],
  },
  weeks: {
    type: [String],
    default: [],
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

module.exports = mongoose.model('WeeklyReports', weeklyReportsSchema);
