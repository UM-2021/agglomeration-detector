const Room = require('../models/roomModel');
const LiveReport = require('../models/liveReportsModel');
const catchAsync = require('../utils/catchAsync');
const luxon = require('luxon');
const { parseMongooseDate } = require('../utils/helpers');
const { DateTime } = luxon;

exports.addRoom = catchAsync(async (req, res, next) => {
  const room = new Room({ ...req.body, account: res.locals.user._id });
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

exports.getRoomLiveOccupancy = catchAsync(async (req, res, next) => {
  const liveReport = await LiveReport.findOne(
    {
      room: req.params.id,
    },
    {},
    { sort: { created_at: -1 } }
  );

  res.status(200).json({
    status: 'success',
    data: {
      averageOccupancy: liveReport.averageOccupancy,
      maxOccupancy: liveReport.maxOccupancy,
    },
  });
});

exports.getRoomsLiveOccupancy = catchAsync(async (req, res, next) => {
  let rooms = await Room.find({ account: res.locals.user._id });
  rooms = rooms.map(async (room) => {
    const liveReport = await LiveReport.findOne(
      {
        room: room._id,
      },
      {},
      { sort: { created_at: -1 } }
    );

    return {
      room: room._id,
      name: room.name,
      averageOccupancy: liveReport.averageOccupancy,
      maxOccupancy: liveReport.maxOccupancy,
    };
  });

  rooms = await Promise.all(rooms);

  res.status(200).json({
    status: 'success',
    data: rooms,
  });
});

exports.getRoomMonthlyOccupancy = catchAsync(async (req, res, next) => {
  // number from 1 to 12
  const month = req.body.month;

  const liveReports = await LiveReport.find({
    room: req.params.id,
  });
  let averageOccupancy = 0;
  let maxOccupancy = 0;
  let monthLiveReports = 0;

  liveReports.map((rep) => {
    const dt_createdAt = parseMongooseDate(rep.createdAt);
    if (dt_createdAt.month === month) {
      averageOccupancy += rep.averageOccupancy;
      maxOccupancy += rep.maxOccupancy;
      monthLiveReports += 1;
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      month,
      averageOccupancy: monthLiveReports
        ? averageOccupancy / monthLiveReports
        : 0,
      maxOccupancy: monthLiveReports ? maxOccupancy / monthLiveReports : 0,
    },
  });
});

exports.getRoomDailyOccupancy = catchAsync(async (req, res, next) => {
  const day = DateTime.fromFormat(req.body.day, 'yyyy-MM-dd');

  const liveReports = await LiveReport.find({
    room: req.params.id,
  });
  let averageOccupancy = 0;
  let maxOccupancy = 0;
  let dayLiveReports = 0;

  liveReports.map((rep) => {
    const dt_createdAt = parseMongooseDate(rep.createdAt);
    if (day.toISODate() === dt_createdAt.toISODate()) {
      averageOccupancy += rep.averageOccupancy;
      maxOccupancy += rep.maxOccupancy;
      dayLiveReports += 1;
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      averageOccupancy: dayLiveReports ? averageOccupancy / dayLiveReports : 0,
      maxOccupancy: dayLiveReports ? maxOccupancy / dayLiveReports : 0,
    },
  });
});

exports.getRoomsMonthlyOccupancy = catchAsync(async (req, res, next) => {
  let rooms = await Room.find({ account: res.locals.user._id });
  const month = req.body.month;
  rooms = rooms.map(async (room) => {
    let averageOccupancy = 0;
    let maxOccupancy = 0;
    let dayLiveReports = 0;
    const liveReports = await LiveReport.find({ room: room._id });
    liveReports.map((rep) => {
      const dt_createdAt = parseMongooseDate(rep.createdAt);
      if (dt_createdAt.month === month) {
        averageOccupancy += rep.averageOccupancy;
        maxOccupancy += rep.maxOccupancy;
        dayLiveReports += 1;
      }
    });

    return {
      room: room._id,
      name: room.name,
      averageOccupancy:
        dayLiveReports > 0 ? averageOccupancy / dayLiveReports : 0,
      maxOccupancy: dayLiveReports > 0 ? maxOccupancy / dayLiveReports : 0,
    };
  });

  rooms = await Promise.all(rooms);

  res.status(200).json({
    status: 'success',
    data: rooms,
  });
});

exports.getRoomsDailyOccupancy = catchAsync(async (req, res, next) => {
  let rooms = await Room.find({ account: res.locals.user._id });
  const day = DateTime.fromFormat(req.body.day, 'yyyy-MM-dd');
  rooms = rooms.map(async (room) => {
    let averageOccupancy = 0;
    let maxOccupancy = 0;
    let dayLiveReports = 0;
    const liveReports = await LiveReport.find({ room: room._id });
    liveReports.map((rep) => {
      const dt_createdAt = parseMongooseDate(rep.createdAt);
      if (day.toISODate() === dt_createdAt.toISODate()) {
        averageOccupancy += rep.averageOccupancy;
        maxOccupancy += rep.maxOccupancy;
        dayLiveReports += 1;
      }
    });

    return {
      room: room._id,
      name: room.name,
      averageOccupancy:
        dayLiveReports > 0 ? averageOccupancy / dayLiveReports : 0,
      maxOccupancy: dayLiveReports > 0 ? maxOccupancy / dayLiveReports : 0,
    };
  });

  rooms = await Promise.all(rooms);

  res.status(200).json({
    status: 'success',
    data: rooms,
  });
});
