const LiveReport = require('../models/liveReportsModel');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require('nodemailer');
const config = require('./../config');
const User = require('../models/userModel');
const Room = require('../models/roomModel');
const Alert = require('../models/alertModel');
const Co2Report = require('../models/co2ReportModel');
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = config;

exports.statsFirst = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.addCo2Report = catchAsync(async (req, res, next) => {
  const { co2 } = req.body;
  const room = req.params.id;
  console.log({ co2, room });
  const co2Report = new Co2Report({ co2, room });
  await co2Report.save(async function (err, co2Report) {
    if (err) {
      return next(err);
    }
    const roomEntity = await Room.findById(room);

    if (co2 < 400 || co2 > 1500) {
      const alertType = 'air';
      const alertValue = 'Bad air quality detected';

      const alert = new Alert({
        room,
        type: alertType,
        value: alertValue,
        account: roomEntity.account,
      });
      await alert.save(async function (err) {
        if (err) {
          return next(err);
        }
      });

      const userId = roomEntity.account;
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
        text: `This is a new ${alertValue} on your Room ${roomEntity.name}!`,
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
      data: co2Report,
    });
  });
});

exports.getRoomCo2ReportLive = catchAsync(async (req, res, next) => {
  const lastRoomCo2Report = await Co2Report.findOne(
    {
      room: req.params.id,
    },
    {},
    { sort: { created_at: -1 } }
  );
  res.status(200).json({
    status: 'success',
    data: lastRoomCo2Report,
  });
});

exports.getRoomsCo2ReportLive = catchAsync(async (req, res, next) => {
  let rooms = await Room.find({ account: res.locals.user._id });

  rooms = rooms.map(async (room) => {
    const co2Report = await Co2Report.findOne(
      {
        room: room._id,
      },
      {},
      { sort: { created_at: -1 } }
    );
    return {
      room: room._id,
      name: room.name,
      co2: co2Report ? co2Report.co2 : null,
      time: co2Report ? co2Report.time : null,
      createdAt: co2Report ? co2Report.createdAt : null,
    };
  });

  rooms = await Promise.all(rooms);

  res.status(200).json({
    status: 'success',
    data: rooms,
  });
});
