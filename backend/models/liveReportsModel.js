const mongoose = require('mongoose');

const liveReportsSchema = new mongoose.Schema(
  {
    averageOccupancy: {
      type: Number,
      default: 0,
    },
    maxOccupancy: {
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
    date: {
      type: Date,
      default: Date.now(),
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
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('LiveReports', liveReportsSchema);
