const Room = require('../models/roomModel');
const catchAsync = require('../utils/catchAsync');

exports.addRoom = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const room = new Room({
    capacity: 5,
  });
  await room.save(function (err, room) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      status: 'success',
      data: {
        data: room,
      },
    });
  });
});

exports.getRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find({});
  res.status(200).json({
    status: 'success',
    results: rooms.length,
    data: {
      data: rooms,
    },
  });
});
