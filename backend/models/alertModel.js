const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please select a alert type'],
      enum: {
        values: ['capacity', 'air'],
        message: 'Invalid option (capacity, air)'
      }
    },
    value: {
      type: String,
      required: [true, 'The alert must have a value.']
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Indicate the related room'],
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Indicate the owner of the room'],
    },
    handled: {
      type: Boolean,
      default: false,
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

alertSchema.pre(/^find/, function(next) {
  this.populate({
      path: 'room',
      select: 'name capacity _id'
  });
  next();
});

module.exports = mongoose.model('Alert', alertSchema);
