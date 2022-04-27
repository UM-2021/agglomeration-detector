const Room = require('../models/roomModel');
const catchAsync = require('../utils/catchAsync');

exports.addRoom = catchAsync(async (req, res, next) => {
  const room = new Room({...req.body, account: res.locals.user._id });
  await room.save(function (err, room) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      status: 'success',
      data: room,
    });
  });
});

exports.getRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find({ account: res.locals.user._id });
  res.status(200).json({
    status: 'success',
    results: rooms.length,
    data: rooms,
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: room,
  });
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedRoom = req.body;
  const options = { new: true };

  const result = await Room.findByIdAndUpdate(id, updatedRoom, options);
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: room,
  });
});
