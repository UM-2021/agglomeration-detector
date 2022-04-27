const mongoose = require('mongoose');

const dailyReportsSchema = new mongoose.Schema(
  {
    averageOccupancy: {
      type: [Number],
      default: [],
    },
    maxOccupancy: {
      type: [Number],
      default: [],
    },
    dates: {
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

module.exports = mongoose.model('DailyReports', dailyReportsSchema);
