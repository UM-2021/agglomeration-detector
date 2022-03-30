const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: [true, 'Introduce a max capacity for the room'],
  },
  air_data: {
    type: JSON,
    required: false,
  },
  user_to_notifiy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Room', roomSchema);
