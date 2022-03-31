const { promisify } = require('util');
const roomModel = require('../models/roomModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addRoom = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const room = new roomModel(req.body);
  await room.save();
  res.send(room);
});

exports.getRooms = catchAsync(async (req, res, next) => {
  const rooms = await roomModel.find({});
  res.send(rooms);
});
