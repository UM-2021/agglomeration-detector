const mongoose = require('mongoose');

const hourlyReportsSchema = new mongoose.Schema(
  {
    averageOccupancy: {
      type: [Number],
      default: [],
    },
    hours: {
      type: [Number],
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
    }
  },
  {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('HourlyReports', hourlyReportsSchema);
