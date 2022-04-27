const mongoose = require('mongoose');

const weeklyReportsSchema = new mongoose.Schema(
  {
    averageOccupancy: {
      type: [Number],
      default: [],
    },
    maxOccupancy: {
      type: [Number],
      default: [],
    },
    weeks: {
      type: [String],
      default: [],
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Indicate the related room'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('WeeklyReports', weeklyReportsSchema);
