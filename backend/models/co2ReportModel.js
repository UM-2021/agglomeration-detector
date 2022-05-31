const mongoose = require('mongoose');

const co2ReportsSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      default: Date.now().toString(),
    },
    co2: {
      type: Number,
      required: true,
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

module.exports = mongoose.model('co2Reports', co2ReportsSchema);
