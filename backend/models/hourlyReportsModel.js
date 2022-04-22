const mongoose = require('mongoose');

const dailyReportsSchema = new mongoose.Schema({
  average_occupancy: {
    type: [Number],
    default: [],
  },
  max_occupancy: {
    type: [Number],
    default: [],
  },
  dates: {
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

module.exports = mongoose.model('DailyReports', dailyReportsSchema);
