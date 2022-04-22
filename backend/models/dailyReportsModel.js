const mongoose = require('mongoose');

const hourlyReportsSchema = new mongoose.Schema({
  average_occupancy: {
    type: [Number],
    default: [],
  },
  hours: {
    type: [Number],
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

module.exports = mongoose.model('HourlyReports', hourlyReportsSchema);
