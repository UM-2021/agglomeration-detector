const LiveReport = require('../models/liveReportsModel');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');
const config = require('./../config');
const User = require('../models/userModel');
const Room = require('../models/roomModel');
const Alert = require('../models/alertModel');
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = config;

exports.addLiveReport = catchAsync(async (req, res, next) => {
  const liveReports = new LiveReport(req.body);
  await liveReports.save(async function (err, liveReports) {
    if (err) {
      return next(err);
    }
    const roomId = req.body.room;
    const room = await Room.findById(roomId);

    if (req.body.maxOccupancy > room.capacity + req.body.occupancy_threshold) {
      const alertType = 'capacity';
      const alertValue = 'Room overpopulation detected';

      const alert = new Alert({
        room: roomId,
        type: alertType,
        value: alertValue,
        account: room.account,
      });
      await alert.save(async function (err) {
        if (err) {
          return next(err);
        }
      });

      const userId = room.account;
      console.log(userId);
      const user = await User.findById(userId);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_ADDRESS,
          pass: EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: EMAIL_ADDRESS,
        to: user.email,
        subject: 'Agglomeration Detector',
        text: `This is a new ${alertValue} on your Room ${room.name}!`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }

    res.status(201).json({
      status: 'success',
      data: liveReports,
    });
  });
});

exports.getLiveReports = catchAsync(async (req, res, next) => {
  const liveReports = await LiveReport.find({ room: req.body.room });
  res.status(200).json({
    status: 'success',
    results: liveReports.length,
    data: liveReports,
  });
});

exports.getLiveReport = catchAsync(async (req, res, next) => {
  const liveReport = await LiveReport.find({
    _id: req.params.id,
    room: req.body.room,
  });
  res.status(200).json({
    status: 'success',
    data: liveReport,
  });
});

exports.updateLiveReport = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedLiveReport = req.body;
  const options = { new: true };

  const result = await LiveReport.findByIdAndUpdate(
    id,
    updatedLiveReport,
    options
  );
  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteLiveReport = catchAsync(async (req, res, next) => {
  const liveReports = await LiveReport.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: liveReports,
  });
});

exports.getLiveRoomData = catchAsync(async (req, res, next) => {
  const lastLiveReport = await LiveReport.findOne(
    {
      room: req.params.room,
    },
    {},
    { sort: { created_at: -1 } }
  );
  res.status(200).json({
    status: 'success',
    data: lastLiveReport,
  });
});
